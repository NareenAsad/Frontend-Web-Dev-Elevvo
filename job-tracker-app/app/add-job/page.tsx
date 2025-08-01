"use client"

import type React from "react"

import { useState } from "react"
import { useRouter } from "next/navigation"
import { useJobs } from "@/contexts/job-context"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Textarea } from "@/components/ui/textarea"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { ArrowLeft, Save } from "lucide-react"
import Link from "next/link"

export default function AddJob() {
  const router = useRouter()
  const { addJob } = useJobs()
  const [isSubmitting, setIsSubmitting] = useState(false)

  const [formData, setFormData] = useState({
    companyName: "",
    jobTitle: "",
    status: "Applied" as const,
    applicationDate: new Date().toISOString().split("T")[0],
    notes: "",
  })

  const [errors, setErrors] = useState<Record<string, string>>({})

  const validateForm = () => {
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
  }

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

  const handleInputChange = (field: string, value: string) => {
    setFormData((prev) => ({ ...prev, [field]: value }))
    // Clear error when user starts typing
    if (errors[field]) {
      setErrors((prev) => ({ ...prev, [field]: "" }))
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
            className="bg-white/10 border-emerald-500/30 text-white hover:bg-white/20 hover:border-emerald-400"
          >
            <ArrowLeft className="h-4 w-4 mr-2" />
            Back to Dashboard
          </Button>
        </Link>
        <div>
          <h1 className="text-3xl font-bold bg-gradient-to-r from-amber-400 to-orange-400 bg-clip-text text-transparent">
            Add New Job Application
          </h1>
          <p className="text-gray-300 mt-1">Fill in the details of your job application</p>
        </div>
      </div>

      {/* Form */}
      <Card className="hover:shadow-lg hover:shadow-orange-500/25 transition-shadow duration-300 border-0 bg-gradient-to-br from-white/10 to-white/5 backdrop-blur-md">
        <CardHeader>
          <CardTitle className="text-white">Job Application Details</CardTitle>
        </CardHeader>
        <CardContent>
          <form onSubmit={handleSubmit} className="space-y-6">
            {/* Company Name */}
            <div className="space-y-2">
              <Label htmlFor="companyName" className="text-gray-300">
                Company Name *
              </Label>
              <Input
                id="companyName"
                value={formData.companyName}
                onChange={(e) => handleInputChange("companyName", e.target.value)}
                placeholder="e.g., Google, Microsoft, Startup Inc."
                className={`bg-white/10 border-emerald-500/30 text-white placeholder-gray-400 focus:border-amber-400 focus:ring-amber-400/20 ${errors.companyName ? "border-red-500" : ""}`}
              />
              {errors.companyName && <p className="text-sm text-red-400">{errors.companyName}</p>}
            </div>

            {/* Job Title */}
            <div className="space-y-2">
              <Label htmlFor="jobTitle" className="text-gray-300">
                Job Title *
              </Label>
              <Input
                id="jobTitle"
                value={formData.jobTitle}
                onChange={(e) => handleInputChange("jobTitle", e.target.value)}
                placeholder="e.g., Frontend Developer, Product Manager"
                className={`bg-white/10 border-emerald-500/30 text-white placeholder-gray-400 focus:border-amber-400 focus:ring-amber-400/20 ${errors.jobTitle ? "border-red-500" : ""}`}
              />
              {errors.jobTitle && <p className="text-sm text-red-400">{errors.jobTitle}</p>}
            </div>

            {/* Status */}
            <div className="space-y-2">
              <Label htmlFor="status" className="text-gray-300">
                Application Status
              </Label>
              <Select value={formData.status} onValueChange={(value: any) => handleInputChange("status", value)}>
                <SelectTrigger className="bg-white/10 border-emerald-500/30 text-white focus:border-amber-400">
                  <SelectValue placeholder="Select status" />
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

            {/* Application Date */}
            <div className="space-y-2">
              <Label htmlFor="applicationDate" className="text-gray-300">
                Application Date *
              </Label>
              <Input
                id="applicationDate"
                type="date"
                value={formData.applicationDate}
                onChange={(e) => handleInputChange("applicationDate", e.target.value)}
                className={`bg-white/10 border-emerald-500/30 text-white focus:border-amber-400 focus:ring-amber-400/20 ${errors.applicationDate ? "border-red-500" : ""}`}
              />
              {errors.applicationDate && <p className="text-sm text-red-400">{errors.applicationDate}</p>}
            </div>

            {/* Notes */}
            <div className="space-y-2">
              <Label htmlFor="notes" className="text-gray-300">
                Notes
              </Label>
              <Textarea
                id="notes"
                value={formData.notes}
                onChange={(e) => handleInputChange("notes", e.target.value)}
                placeholder="Add any additional notes about this application..."
                rows={4}
                className="bg-white/10 border-emerald-500/30 text-white placeholder-gray-400 focus:border-amber-400 focus:ring-amber-400/20"
              />
              <p className="text-sm text-gray-400">
                Optional: Add details about the role, interview process, or any other relevant information.
              </p>
            </div>

            {/* Submit Button */}
            <div className="flex gap-4 pt-4">
              <Button
                type="submit"
                disabled={isSubmitting}
                className="flex-1 sm:flex-none bg-gradient-to-r from-orange-500 to-red-600 hover:from-orange-600 hover:to-red-700 border-0 transform hover:scale-105 transition-all duration-200 disabled:transform-none shadow-lg hover:shadow-orange-500/25"
              >
                <Save className="h-4 w-4 mr-2" />
                {isSubmitting ? "Adding..." : "Add Job Application"}
              </Button>
              <Link href="/dashboard">
                <Button
                  type="button"
                  variant="outline"
                  className="bg-white/10 border-emerald-500/30 text-white hover:bg-white/20 hover:border-emerald-400"
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
