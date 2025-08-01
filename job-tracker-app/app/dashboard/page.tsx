"use client"

import { useState } from "react"
import Link from "next/link"
import { useJobs } from "@/contexts/job-context"
import { Card, CardContent } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Plus, Search, Calendar, Building2, Briefcase } from "lucide-react"

const statusColors = {
  Applied: "bg-blue-100 text-blue-800",
  Interviewing: "bg-yellow-100 text-yellow-800",
  Offer: "bg-green-100 text-green-800",
  Rejected: "bg-red-100 text-red-800",
}

export default function Dashboard() {
  const { state } = useJobs()
  const [searchTerm, setSearchTerm] = useState("")
  const [statusFilter, setStatusFilter] = useState<string>("all")

  const filteredJobs = state.jobs.filter((job) => {
    const matchesSearch =
      job.companyName.toLowerCase().includes(searchTerm.toLowerCase()) ||
      job.jobTitle.toLowerCase().includes(searchTerm.toLowerCase())
    const matchesStatus = statusFilter === "all" || job.status === statusFilter
    return matchesSearch && matchesStatus
  })

  const stats = {
    total: state.jobs.length,
    applied: state.jobs.filter((job) => job.status === "Applied").length,
    interviewing: state.jobs.filter((job) => job.status === "Interviewing").length,
    offers: state.jobs.filter((job) => job.status === "Offer").length,
    rejected: state.jobs.filter((job) => job.status === "Rejected").length,
  }

  return (
    <div className="space-y-6 animate-fade-in">
      {/* Header */}
      <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
        <div>
          <h1 className="text-3xl font-bold bg-gradient-to-r from-amber-400 to-orange-400 bg-clip-text text-transparent">
            Dashboard
          </h1>
          <p className="text-gray-300 mt-1">Track and manage your job applications</p>
        </div>
        <Link href="/add-job">
          <Button className="w-full sm:w-auto bg-gradient-to-r from-orange-500 to-red-600 hover:from-orange-600 hover:to-red-700 border-0 shadow-lg hover:shadow-orange-500/25 transform hover:scale-105 transition-all duration-200">
            <Plus className="h-4 w-4 mr-2" />
            Add New Job
          </Button>
        </Link>
      </div>

      {/* Stats Cards */}
      <div className="grid grid-cols-2 lg:grid-cols-5 gap-4">
        {[
          { label: "Total Applications", value: stats.total, gradient: "from-gray-600 to-gray-800" },
          { label: "Applied", value: stats.applied, gradient: "from-blue-500 to-indigo-600" },
          { label: "Interviewing", value: stats.interviewing, gradient: "from-amber-500 to-orange-600" },
          { label: "Offers", value: stats.offers, gradient: "from-emerald-500 to-green-600" },
          { label: "Rejected", value: stats.rejected, gradient: "from-red-500 to-rose-600" },
        ].map((stat, index) => (
          <Card
            key={stat.label}
            className="hover:shadow-lg hover:shadow-orange-500/25 transition-all duration-300 transform hover:-translate-y-1 animate-slide-up border-0 bg-gradient-to-br from-white/10 to-white/5 backdrop-blur-md hover:from-white/20 hover:to-white/10"
            style={{ animationDelay: `${index * 100}ms` }}
          >
            <CardContent className="p-4">
              <div className={`text-2xl font-bold bg-gradient-to-r ${stat.gradient} bg-clip-text text-transparent`}>
                {stat.value}
              </div>
              <div className="text-sm text-gray-300">{stat.label}</div>
            </CardContent>
          </Card>
        ))}
      </div>

      {/* Filters */}
      <div className="flex flex-col sm:flex-row gap-4">
        <div className="relative flex-1">
          <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 h-4 w-4" />
          <Input
            placeholder="Search by company or job title..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            className="pl-10 bg-white/10 border-emerald-500/30 text-white placeholder-gray-400 focus:border-amber-400 focus:ring-amber-400/20"
          />
        </div>
        <Select value={statusFilter} onValueChange={setStatusFilter}>
          <SelectTrigger className="w-full sm:w-48 bg-white/10 border-emerald-500/30 text-white focus:border-amber-400">
            <SelectValue placeholder="Filter by status" />
          </SelectTrigger>
          <SelectContent className="bg-gray-900 border-emerald-500/30">
            <SelectItem value="all" className="text-white hover:bg-emerald-500/20">
              All Statuses
            </SelectItem>
            <SelectItem value="Applied" className="text-white hover:bg-emerald-500/20">
              Applied
            </SelectItem>
            <SelectItem value="Interviewing" className="text-white hover:bg-emerald-500/20">
              Interviewing
            </SelectItem>
            <SelectItem value="Offer" className="text-white hover:bg-emerald-500/20">
              Offer
            </SelectItem>
            <SelectItem value="Rejected" className="text-white hover:bg-emerald-500/20">
              Rejected
            </SelectItem>
          </SelectContent>
        </Select>
      </div>

      {/* Job Applications List */}
      {filteredJobs.length === 0 ? (
        <Card className="border-0 bg-gradient-to-br from-white/10 to-white/5 backdrop-blur-md">
          <CardContent className="p-8 text-center">
            <Briefcase className="h-12 w-12 text-gray-400 mx-auto mb-4" />
            <h3 className="text-lg font-medium text-white mb-2">
              {state.jobs.length === 0 ? "No job applications yet" : "No applications match your filters"}
            </h3>
            <p className="text-gray-300 mb-4">
              {state.jobs.length === 0
                ? "Start tracking your job applications by adding your first one."
                : "Try adjusting your search or filter criteria."}
            </p>
            {state.jobs.length === 0 && (
              <Link href="/add-job">
                <Button className="bg-gradient-to-r from-orange-500 to-red-600 hover:from-orange-600 hover:to-red-700 border-0">
                  <Plus className="h-4 w-4 mr-2" />
                  Add Your First Job
                </Button>
              </Link>
            )}
          </CardContent>
        </Card>
      ) : (
        <div className="grid gap-4">
          {filteredJobs.map((job, index) => (
            <Link key={job.id} href={`/job/${job.id}`}>
              <Card
                className="hover:shadow-lg hover:shadow-orange-500/25 transition-all duration-300 cursor-pointer transform hover:-translate-y-1 animate-slide-up border-0 bg-gradient-to-br from-white/10 to-white/5 backdrop-blur-md hover:from-white/20 hover:to-white/10 group"
                style={{ animationDelay: `${index * 50}ms` }}
              >
                <CardContent className="p-6">
                  <div className="flex flex-col sm:flex-row justify-between items-start gap-4">
                    <div className="flex-1 min-w-0">
                      <div className="flex items-start gap-3">
                        <Building2 className="h-5 w-5 text-gray-400 mt-0.5 flex-shrink-0" />
                        <div className="min-w-0 flex-1">
                          <h3 className="text-lg font-semibold text-white truncate group-hover:text-amber-400 transition-colors">
                            {job.jobTitle}
                          </h3>
                          <p className="text-gray-300 truncate">{job.companyName}</p>
                        </div>
                      </div>
                      <div className="flex items-center gap-2 mt-3">
                        <Calendar className="h-4 w-4 text-gray-400" />
                        <span className="text-sm text-gray-300">
                          Applied on {new Date(job.applicationDate).toLocaleDateString()}
                        </span>
                      </div>
                    </div>
                    <div className="flex items-center gap-3">
                      <Badge className={`${statusColors[job.status]} transition-all duration-200 hover:scale-105`}>
                        {job.status}
                      </Badge>
                    </div>
                  </div>
                </CardContent>
              </Card>
            </Link>
          ))}
        </div>
      )}
    </div>
  )
}
