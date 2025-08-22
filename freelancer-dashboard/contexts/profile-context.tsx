"use client"

import { createContext, useContext, useState, type ReactNode } from "react"
import { useLocalStorage } from "@/hooks/use-local-storage"

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

interface ProfileContextType {
  profile: ProfileData
  updateProfile: (updates: Partial<ProfileData>) => void
  isEditing: boolean
  setIsEditing: (editing: boolean) => void
}

const defaultProfile: ProfileData = {
  name: "Ali Asad",
  email: "ali.asad@example.com",
  phone: "+1 (555) 123-4567",
  location: "San Francisco, CA",
  website: "www.aliasad.dev",
  bio: "Full-stack developer and UI/UX designer with 5+ years of experience creating digital solutions for startups and enterprises.",
  skills: ["React", "Node.js", "TypeScript", "Figma", "Python"],
  hourlyRate: 85,
  availability: "Available",
  avatarUrl: undefined,
}

const ProfileContext = createContext<ProfileContextType | undefined>(undefined)

export function ProfileProvider({ children }: { children: ReactNode }) {
  const [profile, setProfile] = useLocalStorage("freelance-profile", defaultProfile)
  const [isEditing, setIsEditing] = useState(false)

  const updateProfile = (updates: Partial<ProfileData>) => {
    setProfile((prev) => ({ ...prev, ...updates }))
  }

  return (
    <ProfileContext.Provider
      value={{
        profile,
        updateProfile,
        isEditing,
        setIsEditing,
      }}
    >
      {children}
    </ProfileContext.Provider>
  )
}

export function useProfile() {
  const context = useContext(ProfileContext)
  if (context === undefined) {
    throw new Error("useProfile must be used within a ProfileProvider")
  }
  return context
}
