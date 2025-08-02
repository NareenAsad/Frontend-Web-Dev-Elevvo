"use client"
import { Badge } from "@/components/ui/badge"
import { Calendar, Building2, MapPin, CloudSun } from "lucide-react"
import type { JobApplication } from "@/contexts/job-context"

const statusColors = {
  Applied: "bg-blue-100 text-blue-800",
  Interviewing: "bg-yellow-100 text-yellow-800",
  Offer: "bg-green-100 text-green-800",
  Rejected: "bg-red-100 text-red-800",
}

interface JobDetailsDisplayProps {
  job: JobApplication
}

export function JobDetailsDisplay({ job }: JobDetailsDisplayProps) {
  return (
    <>
      <div className="flex items-start gap-4">
        <Building2 className="h-6 w-6 text-gray-500 mt-1" />
        <div className="flex-1">
          <h2 className="text-2xl font-bold text-white">{job.jobTitle}</h2>
          <p className="text-xl text-emerald-200 truncate mt-1">{job.companyName}</p>
        </div>
        <Badge className={statusColors[job.status]}>{job.status}</Badge>
      </div>

      <div className="flex items-center gap-2">
        <Calendar className="h-5 w-5 text-gray-400" />
        <span className="text-sm text-gray-300">
          Applied on{" "}
          {new Date(job.applicationDate).toLocaleDateString("en-US", {
            weekday: "long",
            year: "numeric",
            month: "long",
            day: "numeric",
          })}
        </span>
      </div>

      {/* Display Location */}
      {job.location && (
        <div className="flex items-center gap-2 ">
          <MapPin className="h-5 w-5 text-gray-400" />
          <span className="text-sm text-white">Location: {job.location}</span>
        </div>
      )}

      {/* Display Weather */}
      {job.weather && (
        <div className="flex items-center gap-2">
          <CloudSun className="h-5 w-5 text-gray-400" />
          <span className="text-sm text-white">Weather: {job.weather}</span>
        </div>
      )}

      {job.notes && (
        <div className="space-y-2">
          <h3 className="text-lg font-semibold text-gray-900">Notes</h3>
          <div className="bg-gray-50 rounded-lg p-4 border border-gray-200">
            <p className="text-gray-700 whitespace-pre-wrap">{job.notes}</p>
          </div>
        </div>
      )}

      <div className="pt-4 border-t border-gray-200">
        <p className="text-sm text-white">
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
  )
}
