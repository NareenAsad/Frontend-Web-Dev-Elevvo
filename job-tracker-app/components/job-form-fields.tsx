"use client"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Textarea } from "@/components/ui/textarea"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import type { JobApplication } from "@/contexts/job-context"

interface JobFormFieldsProps {
  formData: Omit<JobApplication, "id" | "createdAt">
  handleInputChange: (field: keyof Omit<JobApplication, "id" | "createdAt">, value: string) => void
  errors: Record<string, string>
}

export function JobFormFields({
  formData,
  handleInputChange,
  errors,
}: JobFormFieldsProps) {
  return (
    <>
      {/* Company Name */}
      <div className="space-y-2">
        <Label htmlFor="companyName" className="text-white">
          Company Name *
        </Label>
        <Input
          id="companyName"
          value={formData.companyName}
          onChange={(e) => handleInputChange("companyName", e.target.value)}
          placeholder="e.g., Google, Microsoft, Startup Inc."
          className={`bg-white border border-gray-300 text-gray-800 placeholder-gray-500 focus:border-amber-400 focus:ring-amber-400/20 ${errors.companyName ? "border-red-500" : ""}`}
        />
        {errors.companyName && <p className="text-sm text-red-600">{errors.companyName}</p>}
      </div>

      {/* Job Title */}
      <div className="space-y-2">
        <Label htmlFor="jobTitle" className="text-white">
          Job Title *
        </Label>
        <Input
          id="jobTitle"
          value={formData.jobTitle}
          onChange={(e) => handleInputChange("jobTitle", e.target.value)}
          placeholder="e.g., Frontend Developer, Product Manager"
          className={`bg-white border border-gray-300 text-gray-800 placeholder-gray-500 focus:border-amber-400 focus:ring-amber-400/20 ${errors.jobTitle ? "border-red-500" : ""}`}
        />
        {errors.jobTitle && <p className="text-sm text-red-600">{errors.jobTitle}</p>}
      </div>

      {/* Status */}
      <div className="space-y-2">
        <Label htmlFor="status" className="text-white">
          Application Status
        </Label>
        <Select value={formData.status} onValueChange={(value: any) => handleInputChange("status", value)}>
          <SelectTrigger className="bg-white border border-gray-300 text-gray-800 focus:border-amber-400">
            <SelectValue placeholder="Select status" />
          </SelectTrigger>
          <SelectContent className="bg-white border border-gray-300">
            <SelectItem value="Applied" className="text-gray-800 hover:bg-gray-100">
              Applied
            </SelectItem>
            <SelectItem value="Interviewing" className="text-gray-800 hover:bg-gray-100">
              Interviewing
            </SelectItem>
            <SelectItem value="Offer" className="text-gray-800 hover:bg-gray-100">
              Offer
            </SelectItem>
            <SelectItem value="Rejected" className="text-gray-800 hover:bg-gray-100">
              Rejected
            </SelectItem>
          </SelectContent>
        </Select>
      </div>

      {/* Application Date */}
      <div className="space-y-2">
        <Label htmlFor="applicationDate" className="text-white">
          Application Date *
        </Label>
        <Input
          id="applicationDate"
          type="date"
          value={formData.applicationDate}
          onChange={(e) => handleInputChange("applicationDate", e.target.value)}
          className={`bg-white border border-gray-300 text-gray-800 focus:border-amber-400 focus:ring-amber-400/20 ${errors.applicationDate ? "border-red-500" : ""}`}
        />
        {errors.applicationDate && <p className="text-sm text-red-600">{errors.applicationDate}</p>}
      </div>

      {/* Notes */}
      <div className="space-y-2">
        <Label htmlFor="notes" className="text-white">
          Notes
        </Label>
        <Textarea
          id="notes"
          value={formData.notes}
          onChange={(e) => handleInputChange("notes", e.target.value)}
          placeholder="Add any additional notes about this application..."
          rows={4}
          className="bg-white border border-gray-300 text-gray-800 placeholder-gray-500 focus:border-amber-400 focus:ring-amber-400/20"
        />
        <p className="text-sm text-white">
          Optional: Add details about the role, interview process, or any other relevant information.
        </p>
      </div>
    </>
  )
}
