"use client"

import { Heart } from "lucide-react"

export function Footer() {
  const currentYear = new Date().getFullYear()

  return (
    <div className="mt-10 border-t border-emerald-500/20 py-6 px-4 bg-gradient-to-r from-slate-900 via-emerald-900 to-slate-900">
      <div className="max-w-7xl mx-auto flex flex-col md:flex-row items-center justify-between space-y-3 md:space-y-0">
        <p className="text-sm text-gray-400">
          © {currentYear}{" "}
          <span className="font-medium bg-gradient-to-r from-amber-400 to-orange-400 bg-clip-text text-transparent">
            Job Application Tracker
          </span>
          . All rights reserved.
        </p>
        <div className="flex items-center text-sm text-gray-400">
          <span className="mr-1">Made with</span>
          <Heart className="h-4 w-4 text-red-500 animate-pulse" />
          <span className="ml-1">for job seekers everywhere</span>
        </div>
      </div>
    </div>
  )
}
