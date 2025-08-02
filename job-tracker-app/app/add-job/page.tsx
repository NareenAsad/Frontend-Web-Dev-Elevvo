"use client"

import type React from "react"
import { useRouter } from "next/navigation"
import { useJobs } from "@/contexts/job-context"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { ArrowLeft, Save } from "lucide-react"
import Link from "next/link"
import { useJobForm } from "@/hooks/use-job-form"
import { JobFormFields } from "@/components/job-form-fields"

export default function AddJob() {
  const router = useRouter()
  const { addJob } = useJobs()
  const {
    formData,
    handleInputChange,
    errors,
    isSubmitting,
    setIsSubmitting,
    validateForm,
    handleDetectLocation,
    handleFetchWeather,
    isDetectingLocation,
    isFetchingWeather,
    locationError,
    weatherError,
  } = useJobForm()

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()

    if (!validateForm()) {
      return
    }

    setIsSubmitting(true)

    try {
      addJob(formData)
      router.push("/dashboard")
    } catch (error) {
      console.error("Error adding job:", error)
    } finally {
      setIsSubmitting(false)
    }
  }

  return (
    <div className="max-w-2xl mx-auto space-y-6 animate-fade-in">
      {/* Header */}
      <div className="flex items-center gap-4">
        <Link href="/dashboard">
          <Button
            variant="outline"
            size="sm"
            className="border-emerald-500 text-emerald-500 hover:bg-emerald-600 hover:text-white"
          >
            <ArrowLeft className="h-4 w-4 mr-2" />
            Back to Dashboard
          </Button>
        </Link>
        <div>
          <h1 className="text-3xl font-bold bg-gradient-to-r from-amber-400 to-orange-400 bg-clip-text text-transparent hover:underline">
            Add New Job Application
          </h1>
          <p className="text-gray-300 mt-1">Fill in the details of your job application</p>
        </div>
      </div>

      {/* Form */}
      <Card className="hover:shadow-lg hover:shadow-emerald-500/25 transition-all duration-300 hover:-translate-y-1 border border-emerald-800 bg-white/10 backdrop-blur-md text-white">
        <CardHeader>
          <CardTitle className="text-emerald-100">Job Application Details</CardTitle>
        </CardHeader>
        <CardContent>
          <form onSubmit={handleSubmit} className="space-y-6">
            <JobFormFields
              formData={formData}
              handleInputChange={handleInputChange}
              errors={errors}
              handleDetectLocation={handleDetectLocation}
              handleFetchWeather={handleFetchWeather}
              isDetectingLocation={isDetectingLocation}
              isFetchingWeather={isFetchingWeather}
              locationError={locationError}
              weatherError={weatherError}
            />

            {/* Submit Button */}
            <div className="flex gap-4 pt-4">
              <Button
                type="submit"
                disabled={isSubmitting}
                className="flex-1 sm:flex-none bg-gradient-to-r from-emerald-500 to-teal-600 hover:from-emerald-600 hover:to-teal-700 border-0 transform hover:scale-105 transition-all duration-200 disabled:transform-none shadow-lg hover:shadow-emerald-500/25"
              >
                <Save className="h-4 w-4 mr-2" />
                {isSubmitting ? "Adding..." : "Add Job Application"}
              </Button>
              <Link href="/dashboard">
                <Button
                  type="button"
                  variant="outline"
                  className="border-emerald-500 text-emerald-500 hover:bg-emerald-600 hover:text-white"
                >
                  Cancel
                </Button>
              </Link>
            </div>
          </form>
        </CardContent>
      </Card>
    </div>
  )
}
