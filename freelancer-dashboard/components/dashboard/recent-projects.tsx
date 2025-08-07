import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Progress } from "@/components/ui/progress"
import { CheckCircle, AlertCircle, Clock } from 'lucide-react'

const recentProjects = [
  { name: "E-commerce Website", client: "TechCorp", status: "In Progress", progress: 75 },
  { name: "Mobile App Design", client: "StartupXYZ", status: "Completed", progress: 100 },
  { name: "Brand Identity", client: "Creative Agency", status: "Review", progress: 90 },
  { name: "Dashboard UI", client: "DataCorp", status: "In Progress", progress: 45 },
]

export function RecentProjects() {
  return (
    <Card className="bg-white/80 dark:bg-gray-800/80 backdrop-blur-sm border-gray-200/50 dark:border-gray-700/50">
      <CardHeader>
        <CardTitle>Recent Projects</CardTitle>
        <CardDescription>Your latest project updates</CardDescription>
      </CardHeader>
      <CardContent>
        <div className="space-y-4">
          {recentProjects.map((project, index) => (
            <div key={index} className="flex items-center justify-between p-4 rounded-lg bg-gray-50/50 dark:bg-gray-700/50">
              <div className="flex-1">
                <div className="flex items-center space-x-3">
                  <h3 className="font-semibold">{project.name}</h3>
                  <Badge 
                    variant={project.status === 'Completed' ? 'default' : project.status === 'Review' ? 'secondary' : 'outline'}
                    className={
                      project.status === 'Completed' ? 'bg-green-100 text-green-800' :
                      project.status === 'Review' ? 'bg-yellow-100 text-yellow-800' :
                      'bg-blue-100 text-blue-800'
                    }
                  >
                    {project.status === 'Completed' && <CheckCircle className="w-3 h-3 mr-1" />}
                    {project.status === 'Review' && <AlertCircle className="w-3 h-3 mr-1" />}
                    {project.status === 'In Progress' && <Clock className="w-3 h-3 mr-1" />}
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
          ))}
        </div>
      </CardContent>
    </Card>
  )
}
