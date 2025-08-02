"use client"

import { useState, useEffect, useCallback } from "react"
import type { JobApplication } from "@/contexts/job-context"

interface UseJobFormOptions {
  initialJob?: JobApplication
}

export function useJobForm({ initialJob }: UseJobFormOptions = {}) {
  const [formData, setFormData] = useState<Omit<JobApplication, "id" | "createdAt">>({
    companyName: "",
    jobTitle: "",
    status: "Applied",
    applicationDate: new Date().toISOString().split("T")[0],
    notes: "",
    location: "",
    weather: "",
    ...(initialJob && {
      companyName: initialJob.companyName,
      jobTitle: initialJob.jobTitle,
      status: initialJob.status,
      applicationDate: initialJob.applicationDate,
      notes: initialJob.notes,
      location: initialJob.location || "",
      weather: initialJob.weather || "",
    }),
  })

  const [errors, setErrors] = useState<Record<string, string>>({})
  const [isSubmitting, setIsSubmitting] = useState(false)
  const [isDetectingLocation, setIsDetectingLocation] = useState(false)
  const [isFetchingWeather, setIsFetchingWeather] = useState(false)
  const [locationError, setLocationError] = useState<string | null>(null)
  const [weatherError, setWeatherError] = useState<string | null>(null)

  useEffect(() => {
    if (initialJob) {
      setFormData({
        companyName: initialJob.companyName,
        jobTitle: initialJob.jobTitle,
        status: initialJob.status,
        applicationDate: initialJob.applicationDate,
        notes: initialJob.notes,
        location: initialJob.location || "",
        weather: initialJob.weather || "",
      })
    }
  }, [initialJob])

  const handleInputChange = useCallback(
    (field: keyof Omit<JobApplication, "id" | "createdAt">, value: string) => {
      setFormData((prev) => ({ ...prev, [field]: value }))
      if (errors[field]) {
        setErrors((prev) => ({ ...prev, [field]: "" }))
      }
      // Clear weather and weather error if location changes
      if (field === "location") {
        setWeatherError(null)
        setFormData((prev) => ({ ...prev, weather: "" }))
      }
    },
    [errors],
  )

  const validateForm = useCallback(() => {
    const newErrors: Record<string, string> = {}

    if (!formData.companyName.trim()) {
      newErrors.companyName = "Company name is required"
    }
    if (!formData.jobTitle.trim()) {
      newErrors.jobTitle = "Job title is required"
    }
    if (!formData.applicationDate) {
      newErrors.applicationDate = "Application date is required"
    }

    setErrors(newErrors)
    return Object.keys(newErrors).length === 0
  }, [formData])

  const handleFetchWeather = useCallback(
    async (queryOverride?: string, isAutoDetect = false) => {
      const targetQuery = queryOverride || formData.location || "";
      if (!targetQuery.trim()) {
        setWeatherError("Please enter a location first.")
        return
      }

      setIsFetchingWeather(true)
      setWeatherError(null)

      try {
        const response = await fetch(`/api/weather?query=${encodeURIComponent(targetQuery)}`)
        const data = await response.json()

        if (response.ok) {
          setFormData((prev) => ({
            ...prev,
            location: data.location,
            weather: data.weather,
          }))
        } else {
          setWeatherError(data.error || "Failed to fetch weather data.")
          setFormData((prev) => ({ ...prev, weather: "" }))
          if (isAutoDetect) {
            setFormData((prev) => ({ ...prev, location: "" }))
          }
        }
      } catch (error) {
        console.error("Error fetching weather:", error)
        setWeatherError("An unexpected error occurred while fetching weather.")
        setFormData((prev) => ({ ...prev, weather: "" }))
      } finally {
        setIsFetchingWeather(false)
      }
    },
    [formData.location],
  )

  const handleDetectLocation = useCallback(() => {
    if (navigator.geolocation) {
      setIsDetectingLocation(true)
      setLocationError(null)
      navigator.geolocation.getCurrentPosition(
        async (position) => {
          const latitude = position.coords.latitude
          const longitude = position.coords.longitude
          const query = `${latitude},${longitude}`

          await handleFetchWeather(query, true)
          setIsDetectingLocation(false)
        },
        (error) => {
          console.error("Error detecting location:", error)
          setLocationError("Unable to detect location. Please enter manually.")
          setIsDetectingLocation(false)
        },
        { enableHighAccuracy: true, timeout: 10000, maximumAge: 0 },
      )
    } else {
      setLocationError("Geolocation is not supported by your browser.")
    }
  }, [handleFetchWeather])

  return {
    formData,
    setFormData,
    handleInputChange,
    errors,
    setErrors,
    isSubmitting,
    setIsSubmitting,
    validateForm,
    handleDetectLocation,
    handleFetchWeather,
    isDetectingLocation,
    isFetchingWeather,
    locationError,
    weatherError,
  }
}
