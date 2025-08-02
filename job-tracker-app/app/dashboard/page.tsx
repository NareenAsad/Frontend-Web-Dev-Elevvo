"use client"

import { useState } from "react"
import Link from "next/link"
import { useJobs } from "@/contexts/job-context"
import { Card, CardContent } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import {
  Plus,
  Search,
  Calendar,
  Building2,
  Briefcase,
  MapPin,
  CloudSun,
} from "lucide-react"

const statusColors = {
  Applied: "bg-indigo-200 text-indigo-800",
  Interviewing: "bg-teal-200 text-teal-800",
  Offer: "bg-emerald-200 text-emerald-800",
  Rejected: "bg-rose-200 text-rose-800",
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
          <h1 className="text-3xl font-bold bg-gradient-to-r from-amber-400 to-orange-400 bg-clip-text text-transparent hover:underline">
            Dashboard
          </h1>
          <p className="text-white mt-1">Track and manage your job applications</p>
        </div>
        <Link href="/add-job">
          <Button className="w-full sm:w-auto bg-gradient-to-r from-emerald-500 to-teal-600 hover:from-emerald-600 hover:to-teal-700 text-white border-0 shadow-lg hover:shadow-emerald-400/30 transform hover:scale-105 transition-all duration-200">
            <Plus className="h-4 w-4 mr-2" />
            Add New Job
          </Button>
        </Link>
      </div>

      {/* Stats Cards */}
      <div className="grid grid-cols-2 lg:grid-cols-5 gap-4">
        {[
          { label: "Total Applications", value: stats.total, gradient: "from-slate-500 to-slate-700" },
          { label: "Applied", value: stats.applied, gradient: "from-indigo-500 to-indigo-600" },
          { label: "Interviewing", value: stats.interviewing, gradient: "from-teal-500 to-teal-600" },
          { label: "Offers", value: stats.offers, gradient: "from-emerald-500 to-emerald-600" },
          { label: "Rejected", value: stats.rejected, gradient: "from-rose-500 to-rose-600" },
        ].map((stat, index) => (
          <Card
            key={stat.label}
            className="hover:shadow-lg hover:shadow-emerald-500/25 transition-all duration-300 hover:-translate-y-2 border border-emerald-800 bg-white/10 backdrop-blur-md"
          >
            <CardContent className="p-4">
              <div className={`text-2xl font-bold bg-gradient-to-r ${stat.gradient} bg-clip-text text-transparent`}>
                {stat.value}
              </div>
              <div className="text-sm text-emerald-100">{stat.label}</div>
            </CardContent>
          </Card>
        ))}
      </div>

      {/* Filters */}
      <div className="flex flex-col sm:flex-row gap-4">
        <div className="relative flex-1">
          <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-500 h-4 w-4" />
          <Input
            placeholder="Search by company or job title..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            className="pl-10 bg-white border border-gray-300 text-gray-800 placeholder-gray-500 focus:border-teal-400 focus:ring-teal-400/20"
          />
        </div>
        <Select value={statusFilter} onValueChange={setStatusFilter}>
          <SelectTrigger className="w-full sm:w-48 bg-white border border-gray-300 text-gray-800 focus:border-teal-400">
            <SelectValue placeholder="Filter by status" />
          </SelectTrigger>
          <SelectContent className="bg-white border border-gray-300">
            {["all", "Applied", "Interviewing", "Offer", "Rejected"].map((status) => (
              <SelectItem key={status} value={status} className="text-gray-800 hover:bg-gray-100">
                {status === "all" ? "All Statuses" : status}
              </SelectItem>
            ))}
          </SelectContent>
        </Select>
      </div>

      {/* Job Applications List */}
      {filteredJobs.length === 0 ? (
        <Card className="hover:shadow-lg hover:shadow-emerald-500/25 transition-all duration-300 hover:-translate-y-2 border border-emerald-800 bg-white/10 backdrop-blur-md">
          <CardContent className="p-8 text-center">
            <Briefcase className="h-12 w-12 text-gray-500 mx-auto mb-4" />
            <h3 className="text-lg font-medium text-gray-900 mb-2">
              {state.jobs.length === 0 ? "No job applications yet" : "No applications match your filters"}
            </h3>
            <p className="text-white mb-4">
              {state.jobs.length === 0
                ? "Start tracking your job applications by adding your first one."
                : "Try adjusting your search or filter criteria."}
            </p>
            {state.jobs.length === 0 && (
              <Link href="/add-job">
                <Button className="bg-gradient-to-r from-emerald-500 to-teal-600 hover:from-emerald-600 hover:to-teal-700 text-white border-0">
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
                className="hover:shadow-lg hover:shadow-emerald-500/25 transition-all duration-300 hover:-translate-y-1 border border-emerald-800 bg-white/10 backdrop-blur-md"
                style={{ animationDelay: `${index * 50}ms` }}
              >
                <CardContent className="p-6">
                  <div className="flex flex-col sm:flex-row justify-between items-start gap-4">
                    <div className="flex-1 min-w-0">
                      <div className="flex items-start gap-3">
                        <Building2 className="h-5 w-5 text-gray-400 mt-0.5 flex-shrink-0" />
                        <div className="min-w-0 flex-1">
                          <h3 className="text-lg font-semibold text-white truncate group-hover:text-teal-300 transition-colors">
                            {job.jobTitle}
                          </h3>
                          <p className="text-emerald-200 truncate">{job.companyName}</p>
                        </div>
                      </div>
                      <div className="flex items-center gap-2 mt-3">
                        <Calendar className="h-4 w-4 text-gray-400" />
                        <span className="text-sm text-gray-300">
                          Applied on {new Date(job.applicationDate).toLocaleDateString()}
                        </span>
                      </div>
                    </div>
                    <div className="flex flex-col items-end gap-2 flex-shrink-0 self-start">
                      <Badge className={`${statusColors[job.status]} transition-all duration-200 hover:scale-105`}>
                        {job.status}
                      </Badge>
                      {job.location && (
                        <div className="flex items-center gap-2 text-teal-200 mt-1">
                          <MapPin className="h-4 w-4" />
                          <span className="text-sm">{job.location}</span>
                        </div>
                      )}
                      {job.weather && (
                        <div className="flex items-center gap-2 text-indigo-200 mt-1">
                          <CloudSun className="h-4 w-4" />
                          <span className="text-sm">{job.weather}</span>
                        </div>
                      )}
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
