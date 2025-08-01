"use client"

import { useState, useEffect } from "react"
import Link from "next/link"
import { Button } from "@/components/ui/button"
import { Card, CardContent } from "@/components/ui/card"
import {
  Briefcase,
  TrendingUp,
  FileText,
  Search,
  BarChart3,
  Download,
  ArrowRight,
  CheckCircle,
  Plus,
} from "lucide-react"

export default function IntroductionPage() {
  const [isVisible, setIsVisible] = useState(false)

  useEffect(() => {
    setIsVisible(true)
  }, [])

  const features = [
    {
      icon: <Briefcase className="h-6 w-6" />,
      title: "Track Applications",
      description: "Keep all your job applications organized in one place with detailed status tracking.",
    },
    {
      icon: <TrendingUp className="h-6 w-6" />,
      title: "Monitor Progress",
      description: "Visualize your job search progress with real-time statistics and insights.",
    },
    {
      icon: <FileText className="h-6 w-6" />,
      title: "Detailed Notes",
      description: "Add comprehensive notes about each application, interview, and company.",
    },
    {
      icon: <Search className="h-6 w-6" />,
      title: "Smart Search",
      description: "Quickly find applications with powerful search and filtering capabilities.",
    },
    {
      icon: <BarChart3 className="h-6 w-6" />,
      title: "Analytics Dashboard",
      description: "Get insights into your application patterns and success rates.",
    },
    {
      icon: <Download className="h-6 w-6" />,
      title: "Export & Import",
      description: "Backup your data or migrate between devices with JSON export/import.",
    },
  ]

  const stats = [
    { label: "Applications Tracked", value: "10,000+", icon: <Briefcase className="h-5 w-5" /> },
    { label: "Success Rate", value: "85%", icon: <TrendingUp className="h-5 w-5" /> },
    { label: "Time Saved", value: "50hrs", icon: <CheckCircle className="h-5 w-5" /> },
  ]

  return (
    <div className="min-h-screen bg-gradient-to-br from-emerald-900 via-teal-900 to-cyan-900">
      {/* Hero Section */}
      <div className="relative overflow-hidden">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pt-20 pb-16">
          <div
            className={`text-center transition-all duration-1000 ${isVisible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-10"}`}
          >
            <div className="flex justify-center mb-6">
              <div className="relative">
                <div className="absolute inset-0 bg-gradient-to-r from-orange-500 to-red-500 rounded-full animate-pulse opacity-30 blur-xl"></div>
                <div className="relative bg-gradient-to-r from-amber-400 to-orange-500 p-4 rounded-full">
                  <Briefcase className="h-16 w-16 text-white animate-bounce" />
                </div>
              </div>
            </div>

            <h1 className="text-4xl md:text-6xl font-bold mb-6 bg-gradient-to-r from-amber-400 via-orange-400 to-red-400 bg-clip-text text-transparent">
              Job Application Tracker
            </h1>

            <p className="text-xl md:text-2xl text-gray-200 mb-8 max-w-3xl mx-auto leading-relaxed">
              Take control of your job search journey. Track applications, monitor progress, and land your dream job
              with our intuitive tracking system.
            </p>

            <div className="flex flex-col sm:flex-row gap-4 justify-center items-center mb-12">
              <Link href="/dashboard">
                <Button
                  size="lg"
                  className="group bg-gradient-to-r from-orange-500 to-red-600 hover:from-orange-600 hover:to-red-700 transform hover:scale-105 transition-all duration-200 shadow-lg hover:shadow-orange-500/25 border-0"
                >
                  Get Started
                  <ArrowRight className="ml-2 h-5 w-5 group-hover:translate-x-1 transition-transform" />
                </Button>
              </Link>
              <Link href="/add-job">
                <Button
                  variant="outline"
                  size="lg"
                  className="group bg-gradient-to-r from-emerald-500/10 to-teal-500/10 hover:from-emerald-500/20 hover:to-teal-500/20 border-2 border-emerald-400/50 hover:border-emerald-400 text-white transform hover:scale-105 transition-all duration-200 backdrop-blur-sm"
                >
                  Add Your First Job
                  <Plus className="ml-2 h-5 w-5 group-hover:rotate-90 transition-transform" />
                </Button>
              </Link>
            </div>

            {/* Stats */}
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6 max-w-2xl mx-auto">
              {stats.map((stat, index) => (
                <div
                  key={stat.label}
                  className={`transform transition-all duration-700 delay-${index * 200} ${isVisible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-10"}`}
                >
                  <Card className="hover:shadow-lg transition-shadow duration-300 border-0 bg-gradient-to-br from-white/20 to-white/15 backdrop-blur-md hover:from-white/30 hover:to-white/20">
                    <CardContent className="p-6 text-center">
                      <div className="flex justify-center mb-2 text-amber-400">{stat.icon}</div>
                      <div className="text-2xl font-bold text-white mb-1">{stat.value}</div>
                      <div className="text-sm text-gray-300">{stat.label}</div>
                    </CardContent>
                  </Card>
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* Decorative Elements */}
        <div className="absolute top-20 left-10 w-20 h-20 bg-gradient-to-r from-orange-500 to-red-500 rounded-full opacity-20 animate-float blur-xl"></div>
        <div className="absolute top-40 right-10 w-16 h-16 bg-gradient-to-r from-amber-500 to-orange-500 rounded-full opacity-20 animate-float-delayed blur-xl"></div>
        <div className="absolute bottom-20 left-1/4 w-12 h-12 bg-gradient-to-r from-emerald-500 to-teal-500 rounded-full opacity-20 animate-float blur-xl"></div>
      </div>

      {/* Features Section */}
      <div className="py-20 bg-gradient-to-br from-slate-900 via-emerald-900 to-slate-900">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-3xl md:text-4xl font-bold mb-4 bg-gradient-to-r from-amber-400 to-orange-400 bg-clip-text text-transparent">
              Everything you need to manage your job search
            </h2>
            <p className="text-xl text-gray-300 max-w-2xl mx-auto">
              Powerful features designed to streamline your application process and increase your success rate.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {features.map((feature, index) => (
              <div
                key={feature.title}
                className={`group transform transition-all duration-700 delay-${index * 100} ${isVisible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-10"}`}
              >
                <Card className="h-full hover:shadow-xl hover:shadow-orange-500/25 transition-all duration-300 hover:-translate-y-2 border-0 bg-gradient-to-br from-white/20 to-white/15 backdrop-blur-md hover:from-emerald-500/30 hover:to-teal-500/30">
                  <CardContent className="p-8">
                    <div className="flex items-center mb-4">
                      <div className="p-3 bg-gradient-to-r from-amber-500 to-orange-600 rounded-lg text-white group-hover:from-emerald-500 group-hover:to-teal-500 transition-all duration-300 shadow-lg">
                        {feature.icon}
                      </div>
                    </div>
                    <h3 className="text-xl font-semibold text-white mb-3 group-hover:text-amber-400 transition-colors">
                      {feature.title}
                    </h3>
                    <p className="text-gray-300 leading-relaxed">{feature.description}</p>
                  </CardContent>
                </Card>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  )
}
