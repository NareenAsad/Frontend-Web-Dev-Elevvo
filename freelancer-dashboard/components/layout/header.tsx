"use client"

import { Bell, Search, Menu, ChevronDown } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Badge } from "@/components/ui/badge"
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuTrigger } from "@/components/ui/dropdown-menu"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import Link from "next/link"
import { useRouter } from "next/navigation"
import { useLocalStorage } from "@/hooks/use-local-storage"
import { projects as initialProjects } from "@/data/projects"
import { useProfile } from "@/contexts/profile-context"
import { useMemo } from "react"

interface HeaderProps {
  setSidebarOpen: (open: boolean) => void
}

export function Header({ setSidebarOpen }: HeaderProps) {
  const router = useRouter()
  const [projects] = useLocalStorage("freelance-projects", initialProjects)
  const { profile } = useProfile()

  // Generate dynamic notifications based on actual project data
  const recentActivities = useMemo(() => {
    const activities = []

    // Add notifications for recently added projects (last 3 projects)
    const recentProjects = projects.sort((a, b) => b.id - a.id).slice(0, 2)

    recentProjects.forEach((project, index) => {
      activities.push({
        id: `project-${project.id}`,
        message: `New project '${project.name}' added`,
        time: index === 0 ? "2 hours ago" : "1 day ago",
        type: "project",
      })
    })

    // Add notifications for completed projects
    const completedProjects = projects.filter((p) => p.status === "Completed")
    completedProjects.forEach((project, index) => {
      if (index < 2) {
        // Show max 2 completed project notifications
        activities.push({
          id: `completed-${project.id}`,
          message: `Payment received for '${project.name}'`,
          time: index === 0 ? "4 hours ago" : "2 days ago",
          type: "payment",
        })
      }
    })

    // Add notifications for projects nearing deadline
    const now = new Date()
    const nearDeadline = projects.filter((project) => {
      if (project.status === "Completed") return false
      const deadline = new Date(project.deadline)
      const daysUntilDeadline = Math.ceil((deadline - now) / (1000 * 60 * 60 * 24))
      return daysUntilDeadline <= 7 && daysUntilDeadline > 0
    })

    nearDeadline.forEach((project, index) => {
      if (index < 1) {
        // Show max 1 deadline notification
        const deadline = new Date(project.deadline)
        const daysUntilDeadline = Math.ceil((deadline - now) / (1000 * 60 * 60 * 24))
        activities.push({
          id: `deadline-${project.id}`,
          message: `Project '${project.name}' due in ${daysUntilDeadline} day${daysUntilDeadline > 1 ? "s" : ""}`,
          time: "Today",
          type: "deadline",
        })
      }
    })

    // If no activities, show default message
    if (activities.length === 0) {
      activities.push({
        id: "welcome",
        message: "Welcome to FreelancePro! Add your first project to get started.",
        time: "Now",
        type: "welcome",
      })
    }

    return activities.slice(0, 5) // Show max 5 notifications
  }, [projects])

  const handleLogout = () => {
    // Clear any stored data and redirect to home
    localStorage.clear()
    router.push("/")
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
    <header className="h-16 bg-white/80 dark:bg-gray-800/80 backdrop-blur-xl border-b border-gray-200/50 dark:border-gray-700/50 flex items-center justify-between px-6">
      <div className="flex items-center space-x-4">
        <Button variant="ghost" size="icon" className="lg:hidden" onClick={() => setSidebarOpen(true)}>
          <Menu className="h-5 w-5" />
        </Button>

        <div className="relative hidden md:block">
          <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 h-4 w-4" />
          <Input
            placeholder="Search..."
            className="pl-10 w-64 bg-gray-50/50 dark:bg-gray-700/50 border-gray-200/50 dark:border-gray-600/50"
          />
        </div>
      </div>

      <div className="flex items-center space-x-4">
        {/* Notifications Dropdown */}
        <DropdownMenu>
          <DropdownMenuTrigger asChild>
            <Button variant="ghost" size="icon" className="relative">
              <Bell className="h-5 w-5" />
              <Badge className="absolute -top-1 -right-1 h-5 w-5 flex items-center justify-center p-0 bg-red-500 text-white text-xs">
                {recentActivities.length}
              </Badge>
            </Button>
          </DropdownMenuTrigger>
          <DropdownMenuContent align="end" className="w-80">
            <div className="p-3 border-b">
              <h3 className="font-semibold">Recent Activities</h3>
            </div>
            {recentActivities.map((activity) => (
              <DropdownMenuItem key={activity.id} className="p-3 cursor-pointer">
                <div className="flex items-start space-x-3">
                  <div
                    className={`w-2 h-2 rounded-full mt-2 ${
                      activity.type === "project"
                        ? "bg-blue-500"
                        : activity.type === "payment"
                          ? "bg-green-500"
                          : activity.type === "deadline"
                            ? "bg-orange-500"
                            : "bg-purple-500"
                    }`}
                  />
                  <div className="flex flex-col space-y-1 flex-1">
                    <p className="text-sm">{activity.message}</p>
                    <p className="text-xs text-gray-500">{activity.time}</p>
                  </div>
                </div>
              </DropdownMenuItem>
            ))}
          </DropdownMenuContent>
        </DropdownMenu>

        {/* User Menu */}
        <DropdownMenu>
          <DropdownMenuTrigger asChild>
            <Button variant="ghost" className="flex items-center space-x-2">
              <Avatar className="h-8 w-8">
                <AvatarImage src={profile.avatarUrl || "/placeholder.svg"} alt={`${profile.name}'s profile picture`} />
                <AvatarFallback className="bg-gradient-to-r from-purple-500 to-blue-500 text-white text-sm">
                  {getInitials(profile.name)}
                </AvatarFallback>
              </Avatar>
              <span className="hidden md:block">{profile.name}</span>
              <ChevronDown className="h-4 w-4" />
            </Button>
          </DropdownMenuTrigger>
          <DropdownMenuContent align="end">
            <DropdownMenuItem asChild>
              <Link href="/dashboard/profile" className="w-full cursor-pointer">
                Profile
              </Link>
            </DropdownMenuItem>
            <DropdownMenuItem onClick={handleLogout} className="cursor-pointer text-red-600 focus:text-red-600">
              Logout
            </DropdownMenuItem>
          </DropdownMenuContent>
        </DropdownMenu>
      </div>
    </header>
  )
}
