"use client"

import { useEffect, useState } from "react"
import { useRouter } from "next/navigation"
import Link from "next/link"
import { ArrowLeft, Edit, Save, Trash2, X } from "lucide-react"
import { useJobs } from "@/contexts/job-context"
import { useJobForm } from "@/hooks/use-job-form"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { JobFormFields } from "@/components/job-form-fields"
import { JobDetailsDisplay } from "@/components/job-details-display"
import type { JobApplication } from "@/contexts/job-context"

interface JobDetailsProps {
  params: { id: string }
}

export default function JobDetails({ params }: JobDetailsProps) {
  const router = useRouter()
  const { state, updateJob, deleteJob } = useJobs()
  const [isEditing, setIsEditing] = useState(false)
  const [job, setJob] = useState<JobApplication | null>(null)

  const {
    formData: editData,
    setFormData: setEditData,
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
  } = useJobForm()

  useEffect(() => {
    const found = state.jobs.find((j) => j.id === params.id)
    if (found) {
      setJob(found)
      setEditData(found)
    }
  }, [params.id, state.jobs, setEditData])

  const handleSave = async () => {
    if (!editData || !validateForm()) return

    setIsSubmitting(true)
    try {
      const updated = { ...editData, id: job!.id, createdAt: job!.createdAt }
      updateJob(updated)
      setJob(updated)
      setIsEditing(false)
    } catch (error) {
      console.error("Error updating job:", error)
    } finally {
      setIsSubmitting(false)
    }
  }

  const handleDelete = () => {
    if (window.confirm("Are you sure you want to delete this job application?")) {
      deleteJob(job!.id)
      router.push("/dashboard")
    }
  }

  const handleCancel = () => {
    setEditData(job!)
    setIsEditing(false)
    setErrors({})
  }

  if (!job) {
    return (
      <div className="max-w-2xl mx-auto pt-10">
        <Card className="bg-gradient-to-r from-gray-800 to-slate-900 text-white border border-emerald-500">
          <CardContent className="p-8 text-center">
            <h3 className="text-lg font-semibold mb-2">Job not found</h3>
            <p className="mb-4">The job you're looking for doesn't exist.</p>
            <Link href="/dashboard">
              <Button variant="outline" className="border-emerald-500 text-emerald-400 hover:bg-emerald-600 hover:text-white">
                <ArrowLeft className="h-4 w-4 mr-2" />
                Back to Dashboard
              </Button>
            </Link>
          </CardContent>
        </Card>
      </div>
    )
  }

  return (
    <div className="max-w-2xl mx-auto space-y-6 animate-fade-in pt-6">
      <div className="flex items-center justify-between">
        <div className="flex items-center gap-4">
          <Link href="/dashboard">
            <Button
              variant="outline"
              size="sm"
              className="border-emerald-500 text-emerald-400 hover:bg-emerald-600 hover:text-white"
            >
              <ArrowLeft className="h-4 w-4 mr-2" />
              Back to Dashboard
            </Button>
          </Link>
          <div>
            <h1 className="text-3xl font-bold bg-gradient-to-r from-amber-400 to-orange-400 bg-clip-text text-transparent hover:underline">
              Job Details
            </h1>
            <p className="text-gray-300 mt-1">View and manage your job application</p>
          </div>
        </div>

        {!isEditing && (
          <div className="flex gap-3.5">
            <Button
              variant="outline"
              onClick={() => setIsEditing(true)}
              className="bg-white/10 border border-gray-400 text-white hover:bg-emerald-500 hover:text-white hover:border-emerald-600 transition-all"
            >
              <Edit className="h-4 w-4 mr-2" />
              Edit
            </Button>
            <Button
              variant="destructive"
              onClick={handleDelete}
              className="bg-gradient-to-r from-rose-500 to-red-600 hover:from-red-600 hover:to-red-700 text-white"
            >
              <Trash2 className="h-4 w-4 mr-2" />
              Delete
            </Button>
          </div>
        )}
      </div>

      <Card className="border border-emerald-800 bg-white/10 backdrop-blur-md text-white hover:shadow-lg hover:shadow-emerald-400/40 transition duration-300">
        <CardHeader>
          <div className="flex items-center justify-between">
            <CardTitle className="text-emerald-300 tracking-wide">
              {isEditing ? "Edit Job Application" : "Job Application Details"}
            </CardTitle>
            {isEditing && (
              <div className="flex gap-2">
                <Button
                  size="sm"
                  onClick={handleSave}
                  disabled={isSubmitting}
                  className="bg-gradient-to-r from-emerald-500 to-green-600 hover:from-emerald-600 hover:to-green-700 border-0 text-white"
                >
                  <Save className="h-4 w-4 mr-2" />
                  {isSubmitting ? "Saving..." : "Save"}
                </Button>
                <Button
                  size="sm"
                  variant="outline"
                  onClick={handleCancel}
                  className="border border-gray-400 text-gray-200 hover:bg-gray-700"
                >
                  <X className="h-4 w-4 mr-2" />
                  Cancel
                </Button>
              </div>
            )}
          </div>
        </CardHeader>

        <CardContent className="space-y-6">
          {isEditing ? (
            <JobFormFields
              formData={editData}
              handleInputChange={handleInputChange}
              errors={errors}
              handleDetectLocation={handleDetectLocation}
              handleFetchWeather={handleFetchWeather}
              isDetectingLocation={isDetectingLocation}
              isFetchingWeather={isFetchingWeather}
              locationError={locationError}
              weatherError={weatherError}
            />
          ) : (
            <JobDetailsDisplay job={job} />
          )}
        </CardContent>
      </Card>
    </div>
  )
}
