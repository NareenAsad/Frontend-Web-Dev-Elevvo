"use client"

import { useState } from "react"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import { Progress } from "@/components/ui/progress"
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table"
import { Plus, Calendar, DollarSign } from 'lucide-react'
import { ProjectStats } from "@/components/projects/project-stats"
import { ProjectFilters } from "@/components/projects/project-filters"
import { ProjectFormModel } from "@/components/projects/project-form-model"
import { ProjectEditModel } from "@/components/projects/project-edit-model"
import { ProjectDetailsModel } from "@/components/projects/project-details-model"
import { ProjectActions } from "@/components/projects/project-actions"
import { projects as initialProjects } from "@/data/projects"
import { getStatusIcon, getStatusColor, getPriorityColor } from "@/utils/project-helpers"
import { useLocalStorage } from "@/hooks/use-local-storage"
import { useToast } from "@/hooks/use-toast"

export default function Projects() {
  const [projects, setProjects] = useLocalStorage('freelance-projects', initialProjects)
  
  // Ensure projects is always an array to prevent runtime errors
  const safeProjects = projects || []
  const [searchTerm, setSearchTerm] = useState("")
  const [statusFilter, setStatusFilter] = useState("all")
  const [viewMode, setViewMode] = useState<"table" | "cards">("table")
  const [showProjectForm, setShowProjectForm] = useState(false)
  const [showEditModal, setShowEditModal] = useState(false)
  const [showDetailsModal, setShowDetailsModal] = useState(false)
  const [selectedProject, setSelectedProject] = useState<any>(null)
  const { toast } = useToast()

  const filteredProjects = safeProjects.filter(project => {
    const matchesSearch = project.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         project.client.toLowerCase().includes(searchTerm.toLowerCase())
    const matchesStatus = statusFilter === "all" || project.status === statusFilter
    return matchesSearch && matchesStatus
  })

  const handleAddProject = (newProject: any) => {
    setProjects(prev => [...prev, newProject])
    toast({
      title: "Project Created",
      description: `${newProject.name} has been added successfully.`,
    })
  }

  const handleEditProject = (project: any) => {
    setSelectedProject(project)
    setShowEditModal(true)
  }

  const handleUpdateProject = (updatedProject: any) => {
    setProjects(prev => prev.map(p => p.id === updatedProject.id ? updatedProject : p))
    toast({
      title: "Project Updated",
      description: `${updatedProject.name} has been updated successfully.`,
    })
  }

  const handleViewProject = (project: any) => {
    setSelectedProject(project)
    setShowDetailsModal(true)
  }

  const handleDuplicateProject = (project: any) => {
    const duplicatedProject = {
      ...project,
      id: Date.now(),
      name: `${project.name} (Copy)`,
      status: "Planning",
      progress: 0
    }
    setProjects(prev => [...prev, duplicatedProject])
    toast({
      title: "Project Duplicated",
      description: `${duplicatedProject.name} has been created.`,
    })
  }

  const handleDeleteProject = (projectId: number) => {
    const project = safeProjects.find(p => p.id === projectId)
    setProjects(prev => prev.filter(p => p.id !== projectId))
    toast({
      title: "Project Deleted",
      description: `${project?.name} has been deleted successfully.`,
      variant: "destructive",
    })
  }

  return (
    <div className="space-y-6">
      {/* Page Header */}
      <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
        <div>
          <h1 className="text-3xl font-bold bg-gradient-to-r from-purple-600 to-blue-600 bg-clip-text text-transparent">
            Projects
          </h1>
          <p className="text-gray-600 dark:text-gray-400 mt-2">
            Manage and track all your freelance projects
          </p>
        </div>
        <Button 
          onClick={() => setShowProjectForm(true)}
          className="bg-gradient-to-r from-purple-500 to-blue-500 hover:from-purple-600 hover:to-blue-600"
        >
          <Plus className="w-4 h-4 mr-2" />
          New Project
        </Button>
      </div>

      <ProjectStats projects={projects} />

      {/* Filters and Projects List */}
      <Card className="bg-white/80 dark:bg-gray-800/80 backdrop-blur-sm border-gray-200/50 dark:border-gray-700/50">
        <CardHeader>
          <ProjectFilters
            searchTerm={searchTerm}
            setSearchTerm={setSearchTerm}
            statusFilter={statusFilter}
            setStatusFilter={setStatusFilter}
            viewMode={viewMode}
            setViewMode={setViewMode}
          />
        </CardHeader>
        <CardContent>
          {viewMode === "table" ? (
            <div className="overflow-x-auto">
              <Table>
                <TableHeader>
                  <TableRow>
                    <TableHead>Project</TableHead>
                    <TableHead>Client</TableHead>
                    <TableHead>Status</TableHead>
                    <TableHead>Priority</TableHead>
                    <TableHead>Progress</TableHead>
                    <TableHead>Deadline</TableHead>
                    <TableHead>Budget</TableHead>
                    <TableHead className="w-[50px]">Actions</TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  {filteredProjects.map((project) => {
                    const StatusIcon = getStatusIcon(project.status)
                    return (
                      <TableRow key={project.id}>
                        <TableCell>
                          <div>
                            <div className="font-medium">{project.name}</div>
                            <div className="text-sm text-gray-500">{project.type}</div>
                          </div>
                        </TableCell>
                        <TableCell>{project.client}</TableCell>
                        <TableCell>
                          <Badge className={getStatusColor(project.status)}>
                            <StatusIcon className="w-3 h-3 mr-1" />
                            {project.status}
                          </Badge>
                        </TableCell>
                        <TableCell>
                          <Badge variant="outline" className={getPriorityColor(project.priority)}>
                            {project.priority}
                          </Badge>
                        </TableCell>
                        <TableCell>
                          <div className="flex items-center space-x-2">
                            <Progress value={project.progress} className="w-16" />
                            <span className="text-sm">{project.progress}%</span>
                          </div>
                        </TableCell>
                        <TableCell>{new Date(project.deadline).toLocaleDateString()}</TableCell>
                        <TableCell>${project.budget.toLocaleString()}</TableCell>
                        <TableCell>
                          <ProjectActions
                            project={project}
                            onDelete={handleDeleteProject}
                            onEdit={handleEditProject}
                            onView={handleViewProject}
                            onDuplicate={handleDuplicateProject}
                          />
                        </TableCell>
                      </TableRow>
                    )
                  })}
                </TableBody>
              </Table>
            </div>
          ) : (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
              {filteredProjects.map((project) => {
                const StatusIcon = getStatusIcon(project.status)
                return (
                  <Card key={project.id} className="bg-gray-50/50 dark:bg-gray-700/50 border-gray-200/50 dark:border-gray-600/50">
                    <CardHeader className="pb-3">
                      <div className="flex items-start justify-between">
                        <div className="flex-1">
                          <CardTitle className="text-lg">{project.name}</CardTitle>
                          <CardDescription>{project.client}</CardDescription>
                        </div>
                        <div className="flex items-center space-x-2">
                          <Badge className={getStatusColor(project.status)}>
                            <StatusIcon className="w-3 h-3 mr-1" />
                            {project.status}
                          </Badge>
                          <ProjectActions
                            project={project}
                            onDelete={handleDeleteProject}
                            onEdit={handleEditProject}
                            onView={handleViewProject}
                            onDuplicate={handleDuplicateProject}
                          />
                        </div>
                      </div>
                    </CardHeader>
                    <CardContent className="space-y-3">
                      <div className="flex items-center justify-between text-sm">
                        <span>Progress</span>
                        <span>{project.progress}%</span>
                      </div>
                      <Progress value={project.progress} />
                      
                      <div className="flex items-center justify-between">
                        <Badge variant="outline" className={getPriorityColor(project.priority)}>
                          {project.priority}
                        </Badge>
                        <span className="text-sm text-gray-500">{project.type}</span>
                      </div>
                      
                      <div className="flex items-center justify-between text-sm">
                        <div className="flex items-center">
                          <Calendar className="w-4 h-4 mr-1" />
                          {new Date(project.deadline).toLocaleDateString()}
                        </div>
                        <div className="flex items-center">
                          <DollarSign className="w-4 h-4 mr-1" />
                          ${project.budget.toLocaleString()}
                        </div>
                      </div>
                    </CardContent>
                  </Card>
                )
              })}
            </div>
          )}

          {filteredProjects.length === 0 && (
            <div className="text-center py-12">
              <div className="text-gray-400 mb-4">
                <Calendar className="w-12 h-12 mx-auto" />
              </div>
              <h3 className="text-lg font-medium text-gray-900 dark:text-gray-100 mb-2">
                No projects found
              </h3>
              <p className="text-gray-500 dark:text-gray-400 mb-4">
                {searchTerm || statusFilter !== "all" 
                  ? "Try adjusting your search or filter criteria."
                  : "Get started by creating your first project."
                }
              </p>
              {!searchTerm && statusFilter === "all" && (
                <Button 
                  onClick={() => setShowProjectForm(true)}
                  className="bg-gradient-to-r from-purple-500 to-blue-500 hover:from-purple-600 hover:to-blue-600"
                >
                  <Plus className="w-4 h-4 mr-2" />
                  Create Your First Project
                </Button>
              )}
            </div>
          )}
        </CardContent>
      </Card>

      {/* Modals */}
      <ProjectFormModel
        open={showProjectForm}
        onOpenChange={setShowProjectForm}
        onSubmit={handleAddProject}
      />

      <ProjectEditModel
        open={showEditModal}
        onOpenChange={setShowEditModal}
        onSubmit={handleUpdateProject}
        project={selectedProject}
      />

      <ProjectDetailsModel
        open={showDetailsModal}
        onOpenChange={setShowDetailsModal}
        project={selectedProject}
      />
    </div>
  )
}
