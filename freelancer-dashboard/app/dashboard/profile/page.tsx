"use client"

import { Button } from "@/components/ui/button"
import { Save, User } from "lucide-react"
import { ProfileOverview } from "@/components/profile/profile-overview"
import { PersonalInformation } from "@/components/profile/personal-information"
import { PreferencesSettings } from "@/components/profile/preferences-settings"
import { NotificationSettingsCard } from "@/components/profile/notification-settings"
import { SecuritySettings } from "@/components/profile/security-settings"
import { useProfile } from "@/contexts/profile-context"
import { useToast } from "@/hooks/use-toast"
import { useState } from "react"

export default function Profile() {
  const { profile, updateProfile, isEditing, setIsEditing } = useProfile()
  const { toast } = useToast()
  const [darkMode, setDarkMode] = useState(false)

  const [notifications, setNotifications] = useState({
    email: true,
    push: false,
    marketing: true,
  })

  const handleSave = () => {
    setIsEditing(false)
    toast({
      title: "Profile Updated",
      description: "Your profile has been successfully updated.",
    })
  }

  const handleInputChange = (field: string, value: string | number) => {
    updateProfile({ [field]: value })
  }

  const handleAvatarChange = (file: File) => {
    const url = URL.createObjectURL(file)
    updateProfile({ avatarUrl: url })
    toast({
      title: "Avatar Updated",
      description: "Your profile picture has been updated.",
    })
  }

  return (
    <div className="space-y-6">
      {/* Page Header */}
      <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
        <div>
          <h1 className="text-3xl font-bold bg-gradient-to-r from-purple-600 to-blue-600 bg-clip-text text-transparent">
            Profile Settings
          </h1>
          <p className="text-gray-600 dark:text-gray-400 mt-2">Manage your account settings and preferences</p>
        </div>
        <Button
          onClick={isEditing ? handleSave : () => setIsEditing(true)}
          className="bg-gradient-to-r from-purple-500 to-blue-500 hover:from-purple-600 hover:to-blue-600"
        >
          {isEditing ? (
            <>
              <Save className="w-4 h-4 mr-2" />
              Save Changes
            </>
          ) : (
            <>
              <User className="w-4 h-4 mr-2" />
              Edit Profile
            </>
          )}
        </Button>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Profile Overview */}
        <div className="lg:col-span-1">
          <ProfileOverview profile={profile} isEditing={isEditing} onAvatarChange={handleAvatarChange} />
        </div>

        {/* Profile Details */}
        <div className="lg:col-span-2 space-y-6">
          <PersonalInformation profile={profile} isEditing={isEditing} onInputChange={handleInputChange} />

          <PreferencesSettings darkMode={darkMode} setDarkMode={setDarkMode} />

          <NotificationSettingsCard notifications={notifications} setNotifications={setNotifications} />

          <SecuritySettings isEditing={isEditing} />
        </div>
      </div>
    </div>
  )
}
