"use client"

import type React from "react"

import { useState } from "react"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { Button } from "@/components/ui/button"
import { Camera } from "lucide-react"

interface ProfileAvatarProps {
  isEditing: boolean
  name: string
  avatarUrl?: string
  onAvatarChange?: (file: File) => void
}

export function ProfileAvatar({ isEditing, name, avatarUrl, onAvatarChange }: ProfileAvatarProps) {
  const [previewUrl, setPreviewUrl] = useState<string | null>(null)

  const handleFileChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0]
    if (file) {
      const url = URL.createObjectURL(file)
      setPreviewUrl(url)
      onAvatarChange?.(file)
    }
  }

  const getInitials = (fullName: string) => {
    return fullName
      .split(" ")
      .map((name) => name.charAt(0))
      .join("")
      .toUpperCase()
      .slice(0, 2)
  }

  return (
    <div className="relative mx-auto">
      <Avatar className="w-24 h-24 mx-auto">
        <AvatarImage
          src={previewUrl || avatarUrl || "/placeholder.svg?height=96&width=96"}
          alt={`${name}'s profile picture`}
        />
        <AvatarFallback className="text-2xl bg-gradient-to-r from-purple-500 to-blue-500 text-white">
          {getInitials(name)}
        </AvatarFallback>
      </Avatar>
      {isEditing && (
        <>
          <input type="file" accept="image/*" onChange={handleFileChange} className="hidden" id="avatar-upload" />
          <label htmlFor="avatar-upload">
            <Button
              type="button"
              size="icon"
              variant="outline"
              className="absolute -bottom-2 -right-2 rounded-full w-8 h-8 cursor-pointer bg-transparent"
              asChild
            >
              <span>
                <Camera className="w-4 h-4" />
              </span>
            </Button>
          </label>
        </>
      )}
    </div>
  )
}
