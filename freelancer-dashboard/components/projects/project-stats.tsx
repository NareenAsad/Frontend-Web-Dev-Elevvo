import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Calendar, DollarSign, CheckCircle } from 'lucide-react'

interface ProjectStatsProps {
  projects: any[]
}

export function ProjectStats({ projects }: ProjectStatsProps) {
  const totalBudget = projects.reduce((sum, project) => sum + project.budget, 0)
  const completedProjects = projects.filter(p => p.status === 'Completed').length
  const inProgressProjects = projects.filter(p => p.status === 'In Progress').length

  return (
    <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
      <Card className="bg-white/80 dark:bg-gray-800/80 backdrop-blur-sm border-gray-200/50 dark:border-gray-700/50">
        <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
          <CardTitle className="text-sm font-medium">Total Projects</CardTitle>
          <Calendar className="h-4 w-4 text-muted-foreground" />
        </CardHeader>
        <CardContent>
          <div className="text-2xl font-bold">{projects.length}</div>
          <p className="text-xs text-muted-foreground">
            {completedProjects} completed, {inProgressProjects} in progress
          </p>
        </CardContent>
      </Card>

      <Card className="bg-white/80 dark:bg-gray-800/80 backdrop-blur-sm border-gray-200/50 dark:border-gray-700/50">
        <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
          <CardTitle className="text-sm font-medium">Total Budget</CardTitle>
          <DollarSign className="h-4 w-4 text-muted-foreground" />
        </CardHeader>
        <CardContent>
          <div className="text-2xl font-bold">${totalBudget.toLocaleString()}</div>
          <p className="text-xs text-muted-foreground">
            Across all active projects
          </p>
        </CardContent>
      </Card>

      <Card className="bg-white/80 dark:bg-gray-800/80 backdrop-blur-sm border-gray-200/50 dark:border-gray-700/50">
        <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
          <CardTitle className="text-sm font-medium">Completion Rate</CardTitle>
          <CheckCircle className="h-4 w-4 text-muted-foreground" />
        </CardHeader>
        <CardContent>
          <div className="text-2xl font-bold">{Math.round((completedProjects / projects.length) * 100)}%</div>
          <p className="text-xs text-muted-foreground">
            {completedProjects} of {projects.length} projects completed
          </p>
        </CardContent>
      </Card>
    </div>
  )
}
