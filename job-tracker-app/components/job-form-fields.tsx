"use client"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Textarea } from "@/components/ui/textarea"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Button } from "@/components/ui/button"
import { MapPin, CloudSun, Loader2 } from "lucide-react"
import type { JobApplication } from "@/contexts/job-context"

interface JobFormFieldsProps {
  formData: Omit<JobApplication, "id" | "createdAt">
  handleInputChange: (field: keyof Omit<JobApplication, "id" | "createdAt">, value: string) => void
  errors: Record<string, string>
  handleDetectLocation: () => void
  handleFetchWeather: () => Promise<void>
  isDetectingLocation: boolean
  isFetchingWeather: boolean
  locationError: string | null
  weatherError: string | null
}

export function JobFormFields({
  formData,
  handleInputChange,
  errors,
  handleDetectLocation,
  handleFetchWeather,
  isDetectingLocation,
  isFetchingWeather,
  locationError,
  weatherError,
}: JobFormFieldsProps) {
  return (
    <>
      {/* Company Name */}
      <div className="space-y-2">
        <Label htmlFor="companyName" className="text-black">
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
        <Label htmlFor="jobTitle" className="text-black">
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
        <Label htmlFor="status" className="text-black">
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
        <Label htmlFor="applicationDate" className="text-black">
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

      {/* Location */}
      <div className="space-y-2">
        <Label htmlFor="location" className="text-black">
          Location (City, Country)
        </Label>
        <div className="flex gap-2">
          <Input
            id="location"
            value={formData.location}
            onChange={(e) => handleInputChange("location", e.target.value)}
            placeholder="e.g., San Francisco, USA"
            className={`flex-1 bg-white border border-gray-300 text-gray-800 placeholder-gray-500 focus:border-amber-400 focus:ring-amber-400/20 ${errors.location ? "border-red-500" : ""}`}
          />
          <Button
            type="button"
            variant="outline"
            onClick={handleDetectLocation}
            disabled={isDetectingLocation}
            className="bg-gray-100 border-gray-300 text-gray-700 hover:bg-gray-200 hover:border-gray-400"
          >
            {isDetectingLocation ? (
              <Loader2 className="h-4 w-4 mr-2 animate-spin" />
            ) : (
              <MapPin className="h-4 w-4 mr-2" />
            )}
            Detect
          </Button>
        </div>
        {locationError && <p className="text-sm text-red-600">{locationError}</p>}
        {errors.location && <p className="text-sm text-red-600">{errors.location}</p>}
      </div>

      {/* Weather */}
      <div className="space-y-2">
        <Label htmlFor="weather" className="text-black">
          Weather at Location
        </Label>
        <div className="flex gap-2">
          <Input
            id="weather"
            value={formData.weather}
            onChange={(e) => handleInputChange("weather", e.target.value)}
            placeholder="Click 'Get Weather' or 'Detect' location"
            className="flex-1 bg-white border border-gray-300 text-gray-800 placeholder-gray-500 focus:border-amber-400 focus:ring-amber-400/20"
            readOnly
          />
          <Button
            type="button"
            variant="outline"
            onClick={handleFetchWeather}
            disabled={isFetchingWeather || !formData.location?.trim()}
            className="bg-gray-100 border-gray-300 text-gray-700 hover:bg-gray-200 hover:border-gray-400"
          >
            {isFetchingWeather ? (
              <Loader2 className="h-4 w-4 mr-2 animate-spin" />
            ) : (
              <CloudSun className="h-4 w-4 mr-2" />
            )}
            Get Weather
          </Button>
        </div>
        {weatherError && <p className="text-sm text-red-600">{weatherError}</p>}
        <p className="text-sm text-white">Click "Get Weather" to fetch current weather for the entered location.</p>
      </div>

      {/* Notes */}
      <div className="space-y-2">
        <Label htmlFor="notes" className="text-black">
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
