"use client"

import { useState, useEffect } from "react"
import { useRouter } from "next/navigation"
import { useJobs } from "@/contexts/job-context"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Textarea } from "@/components/ui/textarea"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Badge } from "@/components/ui/badge"
import { ArrowLeft, Edit, Save, Trash2, X, Calendar, Building2 } from "lucide-react"
import Link from "next/link"
import type { JobApplication } from "@/contexts/job-context"

const statusColors = {
  Applied: "bg-blue-100 text-blue-800",
  Interviewing: "bg-yellow-100 text-yellow-800",
  Offer: "bg-green-100 text-green-800",
  Rejected: "bg-red-100 text-red-800",
}

export default function JobDetails({ params }: { params: { id: string } }) {
  const router = useRouter()
  const { state, updateJob, deleteJob } = useJobs()
  const [isEditing, setIsEditing] = useState(false)
  const [isSubmitting, setIsSubmitting] = useState(false)
  const [job, setJob] = useState<JobApplication | null>(null)
  const [editData, setEditData] = useState<JobApplication | null>(null)
  const [errors, setErrors] = useState<Record<string, string>>({})

  useEffect(() => {
    const foundJob = state.jobs.find((j) => j.id === params.id)
    if (foundJob) {
      setJob(foundJob)
      setEditData(foundJob)
    }
  }, [state.jobs, params.id])

  if (!job) {
    return (
      <div className="max-w-2xl mx-auto">
        <Card>
          <CardContent className="p-8 text-center">
            <h3 className="text-lg font-medium text-gray-900 mb-2">Job not found</h3>
            <p className="text-gray-600 mb-4">The job application you're looking for doesn't exist.</p>
            <Link href="/dashboard">
              <Button>
                <ArrowLeft className="h-4 w-4 mr-2" />
                Back to Dashboard
              </Button>
            </Link>
          </CardContent>
        </Card>
      </div>
    )
  }

  const validateForm = () => {
    if (!editData) return false

    const newErrors: Record<string, string> = {}

    if (!editData.companyName.trim()) {
      newErrors.companyName = "Company name is required"
    }

    if (!editData.jobTitle.trim()) {
      newErrors.jobTitle = "Job title is required"
    }

    if (!editData.applicationDate) {
      newErrors.applicationDate = "Application date is required"
    }

    setErrors(newErrors)
    return Object.keys(newErrors).length === 0
  }

  const handleSave = async () => {
    if (!editData || !validateForm()) return

    setIsSubmitting(true)
    try {
      updateJob(editData)
      setJob(editData)
      setIsEditing(false)
    } catch (error) {
      console.error("Error updating job:", error)
    } finally {
      setIsSubmitting(false)
    }
  }

  const handleDelete = () => {
    if (window.confirm("Are you sure you want to delete this job application? This action cannot be undone.")) {
      deleteJob(job.id)
      router.push("/dashboard")
    }
  }

  const handleCancel = () => {
    setEditData(job)
    setIsEditing(false)
    setErrors({})
  }

  const handleInputChange = (field: keyof JobApplication, value: string) => {
    if (!editData) return

    setEditData((prev) => (prev ? { ...prev, [field]: value } : null))
    // Clear error when user starts typing
    if (errors[field]) {
      setErrors((prev) => ({ ...prev, [field]: "" }))
    }
  }

  return (
    <div className="max-w-2xl mx-auto space-y-6 animate-fade-in">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div className="flex items-center gap-4">
          <Link href="/dashboard">
            <Button
              variant="outline"
              size="sm"
              className="bg-white/10 border-emerald-500/30 text-white hover:bg-white/20 hover:border-emerald-400"
            >
              <ArrowLeft className="h-4 w-4 mr-2" />
              Back to Dashboard
            </Button>
          </Link>
          <div>
            <h1 className="text-3xl font-bold bg-gradient-to-r from-amber-400 to-orange-400 bg-clip-text text-transparent">
              Job Details
            </h1>
            <p className="text-gray-300 mt-1">View and manage your job application</p>
          </div>
        </div>

        {!isEditing && (
          <div className="flex gap-2">
            <Button
              variant="outline"
              onClick={() => setIsEditing(true)}
              className="bg-white/10 border-emerald-500/30 text-white hover:bg-white/20 hover:border-emerald-400 transform hover:scale-105 transition-all duration-200"
            >
              <Edit className="h-4 w-4 mr-2" />
              Edit
            </Button>
            <Button
              variant="destructive"
              onClick={handleDelete}
              className="bg-gradient-to-r from-red-500 to-rose-600 hover:from-red-600 hover:to-rose-700 border-0 transform hover:scale-105 transition-all duration-200"
            >
              <Trash2 className="h-4 w-4 mr-2" />
              Delete
            </Button>
          </div>
        )}
      </div>

      {/* Job Details Card */}
      <Card className="hover:shadow-lg hover:shadow-orange-500/25 transition-shadow duration-300 border-0 bg-gradient-to-br from-white/10 to-white/5 backdrop-blur-md">
        <CardHeader>
          <div className="flex items-center justify-between">
            <CardTitle className="text-white">
              {isEditing ? "Edit Job Application" : "Job Application Details"}
            </CardTitle>
            {isEditing && (
              <div className="flex gap-2">
                <Button
                  size="sm"
                  onClick={handleSave}
                  disabled={isSubmitting}
                  className="bg-gradient-to-r from-emerald-500 to-green-600 hover:from-emerald-600 hover:to-green-700 border-0"
                >
                  <Save className="h-4 w-4 mr-2" />
                  {isSubmitting ? "Saving..." : "Save"}
                </Button>
                <Button
                  size="sm"
                  variant="outline"
                  onClick={handleCancel}
                  className="bg-white/10 border-emerald-500/30 text-white hover:bg-white/20 hover:border-emerald-400"
                >
                  <X className="h-4 w-4 mr-2" />
                  Cancel
                </Button>
              </div>
            )}
          </div>
        </CardHeader>
        <CardContent className="space-y-6">
          {isEditing && editData ? (
            // Edit Mode with gradient inputs
            <>
              <div className="space-y-2">
                <Label htmlFor="companyName" className="text-gray-300">
                  Company Name *
                </Label>
                <Input
                  id="companyName"
                  value={editData.companyName}
                  onChange={(e) => handleInputChange("companyName", e.target.value)}
                  className={`bg-white/10 border-emerald-500/30 text-white focus:border-amber-400 focus:ring-amber-400/20 ${errors.companyName ? "border-red-500" : ""}`}
                />
                {errors.companyName && <p className="text-sm text-red-400">{errors.companyName}</p>}
              </div>

              <div className="space-y-2">
                <Label htmlFor="jobTitle" className="text-gray-300">
                  Job Title *
                </Label>
                <Input
                  id="jobTitle"
                  value={editData.jobTitle}
                  onChange={(e) => handleInputChange("jobTitle", e.target.value)}
                  className={`bg-white/10 border-emerald-500/30 text-white focus:border-amber-400 focus:ring-amber-400/20 ${errors.jobTitle ? "border-red-500" : ""}`}
                />
                {errors.jobTitle && <p className="text-sm text-red-400">{errors.jobTitle}</p>}
              </div>

              <div className="space-y-2">
                <Label htmlFor="status" className="text-gray-300">
                  Application Status
                </Label>
                <Select value={editData.status} onValueChange={(value: any) => handleInputChange("status", value)}>
                  <SelectTrigger className="bg-white/10 border-emerald-500/30 text-white focus:border-amber-400">
                    <SelectValue />
                  </SelectTrigger>
                  <SelectContent className="bg-gray-900 border-emerald-500/30">
                    <SelectItem value="Applied" className="text-white hover:bg-emerald-500/20">
                      Applied
                    </SelectItem>
                    <SelectItem value="Interviewing" className="text-white hover:bg-emerald-500/20">
                      Interviewing
                    </SelectItem>
                    <SelectItem value="Offer" className="text-white hover:bg-emerald-500/20">
                      Offer
                    </SelectItem>
                    <SelectItem value="Rejected" className="text-white hover:bg-emerald-500/20">
                      Rejected
                    </SelectItem>
                  </SelectContent>
                </Select>
              </div>

              <div className="space-y-2">
                <Label htmlFor="applicationDate" className="text-gray-300">
                  Application Date *
                </Label>
                <Input
                  id="applicationDate"
                  type="date"
                  value={editData.applicationDate}
                  onChange={(e) => handleInputChange("applicationDate", e.target.value)}
                  className={`bg-white/10 border-emerald-500/30 text-white focus:border-amber-400 focus:ring-amber-400/20 ${errors.applicationDate ? "border-red-500" : ""}`}
                />
                {errors.applicationDate && <p className="text-sm text-red-400">{errors.applicationDate}</p>}
              </div>

              <div className="space-y-2">
                <Label htmlFor="notes" className="text-gray-300">
                  Notes
                </Label>
                <Textarea
                  id="notes"
                  value={editData.notes}
                  onChange={(e) => handleInputChange("notes", e.target.value)}
                  rows={4}
                  className="bg-white/10 border-emerald-500/30 text-white focus:border-amber-400 focus:ring-amber-400/20"
                />
              </div>
            </>
          ) : (
            // View Mode
            <>
              <div className="flex items-start gap-4">
                <Building2 className="h-6 w-6 text-gray-400 mt-1" />
                <div className="flex-1">
                  <h2 className="text-2xl font-bold text-white">{job.jobTitle}</h2>
                  <p className="text-xl text-gray-300 mt-1">{job.companyName}</p>
                </div>
                <Badge className={statusColors[job.status]}>{job.status}</Badge>
              </div>

              <div className="flex items-center gap-2 text-gray-300">
                <Calendar className="h-5 w-5" />
                <span>
                  Applied on{" "}
                  {new Date(job.applicationDate).toLocaleDateString("en-US", {
                    weekday: "long",
                    year: "numeric",
                    month: "long",
                    day: "numeric",
                  })}
                </span>
              </div>

              {job.notes && (
                <div className="space-y-2">
                  <h3 className="text-lg font-semibold text-white">Notes</h3>
                  <div className="bg-white/5 rounded-lg p-4 border border-emerald-500/20">
                    <p className="text-gray-300 whitespace-pre-wrap">{job.notes}</p>
                  </div>
                </div>
              )}

              <div className="pt-4 border-t border-emerald-500/20">
                <p className="text-sm text-gray-400">
                  Created on{" "}
                  {new Date(job.createdAt).toLocaleDateString("en-US", {
                    year: "numeric",
                    month: "long",
                    day: "numeric",
                    hour: "2-digit",
                    minute: "2-digit",
                  })}
                </p>
              </div>
            </>
          )}
        </CardContent>
      </Card>
    </div>
  )
}
