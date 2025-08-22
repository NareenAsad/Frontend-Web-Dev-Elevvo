"use client"

import type React from "react"

import { useState } from "react"
import { Sidebar } from "@/components/layout/sidebar"
import { Header } from "@/components/layout/header"
import { AnimatedBackground } from "@/components/layout/animated-background"
import { Toaster } from "@/components/ui/toaster"
import { ProfileProvider } from "@/contexts/profile-context"

export default function DashboardLayout({
  children,
}: {
  children: React.ReactNode
}) {
  const [sidebarOpen, setSidebarOpen] = useState(false)

  return (
    <ProfileProvider>
      <div className="min-h-screen bg-gradient-to-br from-purple-50 via-blue-50 to-pink-50 dark:from-gray-900 dark:via-purple-900 dark:to-blue-900">
        <AnimatedBackground />

        <div className="relative flex h-screen">
          <Sidebar sidebarOpen={sidebarOpen} setSidebarOpen={setSidebarOpen} />

          <div className="flex-1 flex flex-col overflow-hidden">
            <Header setSidebarOpen={setSidebarOpen} />

            <main className="flex-1 overflow-auto p-6">{children}</main>
            <Toaster />
          </div>
        </div>
      </div>
    </ProfileProvider>
  )
}
