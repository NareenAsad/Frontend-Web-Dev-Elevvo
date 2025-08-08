"use client"

import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog"
import { Badge } from "@/components/ui/badge"
import { Progress } from "@/components/ui/progress"
import { Separator } from "@/components/ui/separator"
import { Calendar, DollarSign, User, Briefcase, Flag, Clock } from 'lucide-react'
import { getStatusColor, getPriorityColor } from "@/utils/project-helpers"

interface ProjectDetailsModelProps {
  open: boolean
  onOpenChange: (open: boolean) => void
  project: any | null
}

export function ProjectDetailsModel({ open, onOpenChange, project }: ProjectDetailsModelProps) {
  if (!project) return null

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="sm:max-w-[600px]">
        <DialogHeader>
          <DialogTitle className="flex items-center text-xl">
            <Briefcase className="w-5 h-5 mr-2" />
            {project.name}
          </DialogTitle>
          <DialogDescription>
            Detailed information about this project
          </DialogDescription>
        </DialogHeader>
        
        <div className="space-y-6">
          {/* Status and Priority */}
          <div className="flex items-center justify-between">
            <Badge className={getStatusColor(project.status)}>
              {project.status}
            </Badge>
            <Badge variant="outline" className={getPriorityColor(project.priority)}>
              <Flag className="w-3 h-3 mr-1" />
              {project.priority} Priority
            </Badge>
          </div>

          {/* Progress */}
          <div className="space-y-2">
            <div className="flex items-center justify-between">
              <span className="text-sm font-medium">Progress</span>
              <span className="text-sm text-gray-500">{project.progress}%</span>
            </div>
            <Progress value={project.progress} className="h-2" />
          </div>

          <Separator />

          {/* Project Details Grid */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div className="space-y-4">
              <div className="flex items-center space-x-3">
                <User className="w-4 h-4 text-gray-500" />
                <div>
                  <p className="text-sm font-medium">Client</p>
                  <p className="text-sm text-gray-600">{project.client}</p>
                </div>
              </div>

              <div className="flex items-center space-x-3">
                <Briefcase className="w-4 h-4 text-gray-500" />
                <div>
                  <p className="text-sm font-medium">Project Type</p>
                  <p className="text-sm text-gray-600">{project.type}</p>
                </div>
              </div>
            </div>

            <div className="space-y-4">
              <div className="flex items-center space-x-3">
                <DollarSign className="w-4 h-4 text-gray-500" />
                <div>
                  <p className="text-sm font-medium">Budget</p>
                  <p className="text-sm text-gray-600">${project.budget.toLocaleString()}</p>
                </div>
              </div>

              <div className="flex items-center space-x-3">
                <Calendar className="w-4 h-4 text-gray-500" />
                <div>
                  <p className="text-sm font-medium">Deadline</p>
                  <p className="text-sm text-gray-600">
                    {new Date(project.deadline).toLocaleDateString('en-US', {
                      year: 'numeric',
                      month: 'long',
                      day: 'numeric'
                    })}
                  </p>
                </div>
              </div>
            </div>
          </div>

          {/* Description */}
          {project.description && (
            <>
              <Separator />
              <div>
                <h4 className="text-sm font-medium mb-2">Description</h4>
                <p className="text-sm text-gray-600 leading-relaxed">
                  {project.description}
                </p>
              </div>
            </>
          )}

          {/* Timeline */}
          <Separator />
          <div>
            <h4 className="text-sm font-medium mb-3">Project Timeline</h4>
            <div className="space-y-2">
              <div className="flex items-center justify-between text-sm">
                <span className="flex items-center">
                  <Clock className="w-3 h-3 mr-2" />
                  Created
                </span>
                <span className="text-gray-500">
                  {new Date(project.id).toLocaleDateString()}
                </span>
              </div>
              <div className="flex items-center justify-between text-sm">
                <span className="flex items-center">
                  <Calendar className="w-3 h-3 mr-2" />
                  Due Date
                </span>
                <span className="text-gray-500">
                  {new Date(project.deadline).toLocaleDateString()}
                </span>
              </div>
            </div>
          </div>
        </div>
      </DialogContent>
    </Dialog>
  )
}
