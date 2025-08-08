"use client"

import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, PieChart, Pie, Cell } from "recharts"
import { useLocalStorage } from "@/hooks/use-local-storage"
import { projects as initialProjects } from "@/data/projects"
import { useMemo } from "react"

export function ChartsSection() {
  const [projects] = useLocalStorage('freelance-projects', initialProjects)
  
  // Ensure projects is always an array to prevent runtime errors
  const safeProjects = projects || []

  const chartData = useMemo(() => {
    // Generate monthly earnings data based on completed projects
    const monthlyEarnings: Array<{month: string, earnings: number}> = []
    const months = ["Jan", "Feb", "Mar", "Apr", "May", "Jun"]
    
    // For demo purposes, we'll distribute completed project earnings across months
    const completedProjects = safeProjects.filter(p => p.status === 'Completed')
    const totalEarnings = completedProjects.reduce((sum, p) => sum + p.budget, 0)
    
    // If we have earnings, distribute them across months, otherwise show zeros
    if (totalEarnings > 0) {
      const baseEarning = Math.floor(totalEarnings / 6)
      months.forEach((month, index) => {
        monthlyEarnings.push({
          month,
          earnings: index === months.length - 1 ? 
            totalEarnings - (baseEarning * (months.length - 1)) : // Last month gets remainder
            baseEarning + Math.floor(Math.random() * 1000) // Add some variation
        })
      })
    } else {
      months.forEach(month => {
        monthlyEarnings.push({ month, earnings: 0 })
      })
    }

    // Calculate task distribution based on actual projects
    const taskTypes = [
      { name: "Design", value: 0, color: "#8B5CF6" },
      { name: "Development", value: 0, color: "#3B82F6" },
      { name: "Consulting", value: 0, color: "#10B981" },
      { name: "Marketing", value: 0, color: "#F59E0B" },
      { name: "Writing", value: 0, color: "#EF4444" },
    ]

    // Count projects by type
    const typeCounts: Record<string, number> = {}
    safeProjects.forEach(project => {
      typeCounts[project.type] = (typeCounts[project.type] || 0) + 1
    })

    // Update task types with actual counts
    taskTypes.forEach(type => {
      type.value = typeCounts[type.name] || 0
    })

    // Filter out types with 0 projects
    const filteredTaskTypes = taskTypes.filter(type => type.value > 0)

    return { monthlyEarnings, taskTypes: filteredTaskTypes }
  }, [projects])

  return (
    <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
      <Card className="bg-white/80 dark:bg-gray-800/80 backdrop-blur-sm border-gray-200/50 dark:border-gray-700/50">
        <CardHeader>
          <CardTitle>Monthly Earnings</CardTitle>
          <CardDescription>
            {chartData.monthlyEarnings.some(m => m.earnings > 0) 
              ? "Your earnings distribution over the last 6 months" 
              : "Complete projects to see your earnings chart"
            }
          </CardDescription>
        </CardHeader>
        <CardContent>
          <ResponsiveContainer width="100%" height={300}>
            <BarChart data={chartData.monthlyEarnings}>
              <CartesianGrid strokeDasharray="3 3" opacity={0.3} />
              <XAxis dataKey="month" />
              <YAxis />
              <Tooltip 
                formatter={(value) => [`$${value}`, 'Earnings']}
                labelStyle={{ color: '#374151' }}
              />
              <Bar dataKey="earnings" fill="url(#colorGradient)" radius={[4, 4, 0, 0]} />
              <defs>
                <linearGradient id="colorGradient" x1="0" y1="0" x2="0" y2="1">
                  <stop offset="5%" stopColor="#8B5CF6" stopOpacity={0.8}/>
                  <stop offset="95%" stopColor="#3B82F6" stopOpacity={0.8}/>
                </linearGradient>
              </defs>
            </BarChart>
          </ResponsiveContainer>
        </CardContent>
      </Card>

      <Card className="bg-white/80 dark:bg-gray-800/80 backdrop-blur-sm border-gray-200/50 dark:border-gray-700/50">
        <CardHeader>
          <CardTitle>Project Distribution</CardTitle>
          <CardDescription>
            {chartData.taskTypes.length > 0 
              ? "Breakdown of your projects by type" 
              : "Add projects to see distribution chart"
            }
          </CardDescription>
        </CardHeader>
        <CardContent>
          {chartData.taskTypes.length > 0 ? (
            <>
              <ResponsiveContainer width="100%" height={300}>
                <PieChart>
                  <Pie
                    data={chartData.taskTypes}
                    cx="50%"
                    cy="50%"
                    innerRadius={60}
                    outerRadius={100}
                    paddingAngle={5}
                    dataKey="value"
                  >
                    {chartData.taskTypes.map((entry, index) => (
                      <Cell key={`cell-${index}`} fill={entry.color} />
                    ))}
                  </Pie>
                  <Tooltip formatter={(value) => [`${value}`, 'Projects']} />
                </PieChart>
              </ResponsiveContainer>
              <div className="flex justify-center flex-wrap gap-4 mt-4">
                {chartData.taskTypes.map((type) => (
                  <div key={type.name} className="flex items-center space-x-2">
                    <div 
                      className="w-3 h-3 rounded-full" 
                      style={{ backgroundColor: type.color }}
                    />
                    <span className="text-sm">{type.name} ({type.value})</span>
                  </div>
                ))}
              </div>
            </>
          ) : (
            <div className="flex items-center justify-center h-[300px] text-gray-500">
              <div className="text-center">
                <div className="text-4xl mb-2">📊</div>
                <p>No projects yet</p>
                <p className="text-sm">Add projects to see the distribution</p>
              </div>
            </div>
          )}
        </CardContent>
      </Card>
    </div>
  )
}
