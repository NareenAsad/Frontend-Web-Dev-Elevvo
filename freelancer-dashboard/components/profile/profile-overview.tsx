"use client"

import { Card, CardContent, CardHeader } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Separator } from "@/components/ui/separator"
import { MapPin, Globe, Phone } from "lucide-react"
import { ProfileAvatar } from "./profile-avatar"

interface ProfileData {
  name: string
  email: string
  phone: string
  location: string
  website: string
  bio: string
  skills: string[]
  hourlyRate: number
  availability: string
  avatarUrl?: string
}

interface ProfileOverviewProps {
  profile: ProfileData
  isEditing: boolean
  onAvatarChange?: (file: File) => void
}

export function ProfileOverview({ profile, isEditing, onAvatarChange }: ProfileOverviewProps) {
  return (
    <Card className="bg-white/80 dark:bg-gray-800/80 backdrop-blur-sm border-gray-200/50 dark:border-gray-700/50">
      <CardHeader className="text-center">
        <ProfileAvatar
          isEditing={isEditing}
          name={profile.name}
          avatarUrl={profile.avatarUrl}
          onAvatarChange={onAvatarChange}
        />
        <div className="space-y-2">
          <h3 className="text-xl font-semibold">{profile.name}</h3>
          <p className="text-gray-600 dark:text-gray-400">{profile.email}</p>
          <Badge
            className={
              profile.availability === "Available"
                ? "bg-green-100 text-green-800 dark:bg-green-900 dark:text-green-300"
                : "bg-red-100 text-red-800 dark:bg-red-900 dark:text-red-300"
            }
          >
            {profile.availability}
          </Badge>
        </div>
      </CardHeader>
      <CardContent className="space-y-4">
        <div className="flex items-center space-x-3 text-sm">
          <MapPin className="w-4 h-4 text-gray-500" />
          <span>{profile.location}</span>
        </div>
        <div className="flex items-center space-x-3 text-sm">
          <Globe className="w-4 h-4 text-gray-500" />
          <span>{profile.website}</span>
        </div>
        <div className="flex items-center space-x-3 text-sm">
          <Phone className="w-4 h-4 text-gray-500" />
          <span>{profile.phone}</span>
        </div>

        <Separator />

        <div>
          <h4 className="font-medium mb-2">Skills</h4>
          <div className="flex flex-wrap gap-2">
            {profile.skills.map((skill, index) => (
              <Badge key={index} variant="secondary">
                {skill}
              </Badge>
            ))}
          </div>
        </div>

        <div>
          <h4 className="font-medium mb-1">Hourly Rate</h4>
          <p className="text-2xl font-bold text-green-600">${profile.hourlyRate}/hr</p>
        </div>
      </CardContent>
    </Card>
  )
}
