"use client"

import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { DollarSign, FolderOpen, Clock, TrendingUp } from "lucide-react"
import { useLocalStorage } from "@/hooks/use-local-storage"
import { projects as initialProjects } from "@/data/projects"
import { useMemo } from "react"

export function SummaryCards() {
  const [projects] = useLocalStorage("freelance-projects", initialProjects)

  const stats = useMemo(() => {
    const now = new Date()
    const currentMonth = now.getMonth()
    const currentYear = now.getFullYear()

    // Calculate total earnings from completed projects
    const totalEarnings = projects
      .filter((project) => project.status === "Completed")
      .reduce((sum, project) => sum + project.budget, 0)

    // Count active projects (In Progress, Review, Planning)
    const activeProjects = projects.filter((project) =>
      ["In Progress", "Review", "Planning"].includes(project.status),
    ).length

    // Count overdue tasks (projects past deadline that aren't completed)
    const overdueTasks = projects.filter((project) => {
      if (project.status === "Completed") return false
      const deadline = new Date(project.deadline)
      return deadline < now
    }).length

    // Calculate this month's earnings - more realistic approach
    // Include projects that are in progress or completed this month
    const thisMonthEarnings = projects
      .filter((project) => {
        const projectDate = new Date(project.deadline)
        const isCurrentMonth = projectDate.getMonth() === currentMonth && projectDate.getFullYear() === currentYear

        // Include completed projects from this month OR
        // Include a portion of in-progress projects based on their progress
        if (project.status === "Completed" && isCurrentMonth) {
          return true
        } else if (project.status === "In Progress" && isCurrentMonth) {
          return true // We'll calculate partial earnings below
        }
        return false
      })
      .reduce((sum, project) => {
        if (project.status === "Completed") {
          return sum + project.budget
        } else if (project.status === "In Progress") {
          // Calculate earnings based on progress percentage
          return sum + project.budget * (project.progress / 100)
        }
        return sum
      }, 0)

    // If no earnings this month, show earnings from recently completed projects
    const fallbackEarnings =
      thisMonthEarnings === 0
        ? projects
            .filter((p) => p.status === "Completed")
            .slice(0, 2) // Take first 2 completed projects
            .reduce((sum, project) => sum + project.budget, 0)
        : thisMonthEarnings

    return {
      totalEarnings,
      activeProjects,
      overdueTasks,
      thisMonthEarnings: Math.round(fallbackEarnings),
    }
  }, [projects])

  const summaryData = [
    {
      title: "Total Earnings",
      value: `$${stats.totalEarnings.toLocaleString()}`,
      change:
        stats.totalEarnings > 0
          ? `From ${projects.filter((p) => p.status === "Completed").length} completed projects`
          : "No completed projects yet",
      icon: DollarSign,
      gradient: "from-purple-500 to-purple-600",
    },
    {
      title: "Active Projects",
      value: stats.activeProjects.toString(),
      change:
        stats.activeProjects > 0
          ? `${projects.filter((p) => p.status === "In Progress").length} in progress`
          : "No active projects",
      icon: FolderOpen,
      gradient: "from-blue-500 to-blue-600",
    },
    {
      title: "Tasks Due",
      value: stats.overdueTasks.toString(),
      change: stats.overdueTasks > 0 ? `${stats.overdueTasks} overdue` : "All tasks on track",
      icon: Clock,
      gradient: stats.overdueTasks > 0 ? "from-red-500 to-red-600" : "from-green-500 to-green-600",
    },
    {
      title: "This Month",
      value: `$${stats.thisMonthEarnings.toLocaleString()}`,
      change:
        stats.thisMonthEarnings > 0
          ? stats.thisMonthEarnings ===
            projects
              .filter((p) => p.status === "Completed")
              .slice(0, 2)
              .reduce((sum, p) => sum + p.budget, 0)
            ? "From recent completed projects"
            : "From current month projects"
          : "No earnings this month",
      icon: TrendingUp,
      gradient: "from-orange-500 to-orange-600",
    },
  ]

  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
      {summaryData.map((item, index) => {
        const Icon = item.icon
        return (
          <Card key={index} className={`bg-gradient-to-br ${item.gradient} text-white border-0 shadow-lg`}>
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium opacity-90">{item.title}</CardTitle>
              <Icon className="h-4 w-4 opacity-90" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">{item.value}</div>
              <p className="text-xs opacity-90">{item.change}</p>
            </CardContent>
          </Card>
        )
      })}
    </div>
  )
}
