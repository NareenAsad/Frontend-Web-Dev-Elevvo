"use client"

import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Progress } from "@/components/ui/progress"
import { CheckCircle, AlertCircle, Clock, Plus } from 'lucide-react'
import { Button } from "@/components/ui/button"
import { useLocalStorage } from "@/hooks/use-local-storage"
import { projects as initialProjects } from "@/data/projects"
import Link from "next/link"

export function RecentProjects() {
  const [projects] = useLocalStorage('freelance-projects', initialProjects)
  
  // Ensure projects is always an array to prevent runtime errors
  const safeProjects = projects || []

  // Get the 4 most recent projects (sorted by ID which represents creation time)
  const recentProjects = safeProjects
    .sort((a, b) => b.id - a.id)
    .slice(0, 4)

  const getStatusIcon = (status: string) => {
    switch (status) {
      case 'Completed':
        return CheckCircle
      case 'Review':
        return AlertCircle
      default:
        return Clock
    }
  }

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'Completed':
        return 'bg-green-100 text-green-800 dark:bg-green-900 dark:text-green-300'
      case 'Review':
        return 'bg-yellow-100 text-yellow-800 dark:bg-yellow-900 dark:text-yellow-300'
      case 'In Progress':
        return 'bg-blue-100 text-blue-800 dark:bg-blue-900 dark:text-blue-300'
      default:
        return 'bg-gray-100 text-gray-800 dark:bg-gray-900 dark:text-gray-300'
    }
  }

  return (
    <Card className="bg-white/80 dark:bg-gray-800/80 backdrop-blur-sm border-gray-200/50 dark:border-gray-700/50">
      <CardHeader>
        <div className="flex items-center justify-between">
          <div>
            <CardTitle>Recent Projects</CardTitle>
            <CardDescription>
              {recentProjects.length > 0 
                ? "Your latest project updates" 
                : "No projects yet - create your first project"
              }
            </CardDescription>
          </div>
          <Link href="/dashboard/projects">
            <Button variant="outline" size="sm">
              View All
            </Button>
          </Link>
        </div>
      </CardHeader>
      <CardContent>
        {recentProjects.length > 0 ? (
          <div className="space-y-4">
            {recentProjects.map((project, index) => {
              const StatusIcon = getStatusIcon(project.status)
              return (
                <div key={index} className="flex items-center justify-between p-4 rounded-lg bg-gray-50/50 dark:bg-gray-700/50">
                  <div className="flex-1">
                    <div className="flex items-center space-x-3">
                      <h3 className="font-semibold">{project.name}</h3>
                      <Badge className={getStatusColor(project.status)}>
                        <StatusIcon className="w-3 h-3 mr-1" />
                        {project.status}
                      </Badge>
                    </div>
                    <p className="text-sm text-gray-600 dark:text-gray-400 mt-1">{project.client}</p>
                    <div className="mt-2">
                      <div className="flex items-center justify-between text-sm mb-1">
                        <span>Progress</span>
                        <span>{project.progress}%</span>
                      </div>
                      <Progress value={project.progress} className="h-2" />
                    </div>
                  </div>
                </div>
              )
            })}
          </div>
        ) : (
          <div className="text-center py-12">
            <div className="text-gray-400 mb-4">
              <Plus className="w-12 h-12 mx-auto" />
            </div>
            <h3 className="text-lg font-medium text-gray-900 dark:text-gray-100 mb-2">
              No projects yet
            </h3>
            <p className="text-gray-500 dark:text-gray-400 mb-4">
              Create your first project to get started with tracking your freelance work.
            </p>
            <Link href="/dashboard/projects">
              <Button className="bg-gradient-to-r from-purple-500 to-blue-500 hover:from-purple-600 hover:to-blue-600">
                <Plus className="w-4 h-4 mr-2" />
                Create Project
              </Button>
            </Link>
          </div>
        )}
      </CardContent>
    </Card>
  )
}
