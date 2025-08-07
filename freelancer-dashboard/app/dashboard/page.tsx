"use client"

import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Progress } from "@/components/ui/progress"
import { DollarSign, FolderOpen, Clock, TrendingUp, Calendar, CheckCircle, AlertCircle } from 'lucide-react'
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, PieChart, Pie, Cell } from "recharts"
import { SummaryCards } from "@/components/dashboard/summary-cards"
import { ChartsSection } from "@/components/dashboard/charts-section"
import { RecentProjects } from "@/components/dashboard/recent-projects"

const monthlyEarnings = [
  { month: "Jan", earnings: 4500 },
  { month: "Feb", earnings: 5200 },
  { month: "Mar", earnings: 4800 },
  { month: "Apr", earnings: 6100 },
  { month: "May", earnings: 5800 },
  { month: "Jun", earnings: 7200 },
]

const taskTypes = [
  { name: "Design", value: 35, color: "#8B5CF6" },
  { name: "Development", value: 45, color: "#3B82F6" },
  { name: "Consulting", value: 20, color: "#10B981" },
]

const recentProjects = [
  { name: "E-commerce Website", client: "TechCorp", status: "In Progress", progress: 75 },
  { name: "Mobile App Design", client: "StartupXYZ", status: "Completed", progress: 100 },
  { name: "Brand Identity", client: "Creative Agency", status: "Review", progress: 90 },
  { name: "Dashboard UI", client: "DataCorp", status: "In Progress", progress: 45 },
]

export default function Overview() {
  return (
    <div className="space-y-6">
      {/* Page Header */}
      <div>
        <h1 className="text-3xl font-bold bg-gradient-to-r from-purple-600 to-blue-600 bg-clip-text text-transparent">
          Dashboard Overview
        </h1>
        <p className="text-gray-600 dark:text-gray-400 mt-2">
          Welcome back! Here's what's happening with your freelance business.
        </p>
      </div>

      <SummaryCards />
      <ChartsSection />
      <RecentProjects />
    </div>
  )
}
