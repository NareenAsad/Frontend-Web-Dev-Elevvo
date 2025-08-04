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
    ...(initialJob && {
      companyName: initialJob.companyName,
      jobTitle: initialJob.jobTitle,
      status: initialJob.status,
      applicationDate: initialJob.applicationDate,
      notes: initialJob.notes,
    }),
  })

  const [errors, setErrors] = useState<Record<string, string>>({})
  const [isSubmitting, setIsSubmitting] = useState(false)

  useEffect(() => {
    if (initialJob) {
      setFormData({
        companyName: initialJob.companyName,
        jobTitle: initialJob.jobTitle,
        status: initialJob.status,
        applicationDate: initialJob.applicationDate,
        notes: initialJob.notes,
      })
    }
  }, [initialJob])

  const handleInputChange = useCallback(
    (field: keyof Omit<JobApplication, "id" | "createdAt">, value: string) => {
      setFormData((prev) => ({ ...prev, [field]: value }))
      if (errors[field]) {
        setErrors((prev) => ({ ...prev, [field]: "" }))
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

  return {
    formData,
    setFormData,
    handleInputChange,
    errors,
    setErrors,
    isSubmitting,
    setIsSubmitting,
    validateForm,
  }
}
