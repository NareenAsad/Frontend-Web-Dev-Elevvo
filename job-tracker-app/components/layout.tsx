"use client"

import type React from "react"
import { Footer } from "@/components/footer"
import { Briefcase, Download, Upload } from "lucide-react"
import { Button } from "@/components/ui/button"
import { useJobs } from "@/contexts/job-context"
import { useRef } from "react"
import Link from "next/link"

export function Layout({ children }: { children: React.ReactNode }) {
  const { exportJobs, importJobs } = useJobs()
  const fileInputRef = useRef<HTMLInputElement>(null)

  const handleImport = async (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0]
    if (file) {
      try {
        await importJobs(file)
        alert("Jobs imported successfully!")
      } catch (error) {
        alert("Error importing jobs. Please check the file format.")
      }
      // Reset the input
      if (fileInputRef.current) {
        fileInputRef.current.value = ""
      }
    }
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-900 via-emerald-900 to-slate-900 flex flex-col">
      {/* Header */}
      <header className="bg-gradient-to-r from-emerald-900/95 via-teal-900/95 to-cyan-900/95 backdrop-blur-md shadow-lg border-b border-emerald-500/20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-center h-16">
            <div className="flex items-center space-x-4">
              <div className="p-1 bg-gradient-to-r from-amber-500 to-orange-600 rounded-lg shadow-lg">
                <Briefcase className="h-6 w-6 text-white" />
              </div>
              <Link href="/" className="text-xl font-bold bg-gradient-to-r from-amber-400 to-orange-400 bg-clip-text text-transparent hover:underline">
                Job Tracker
              </Link>
            </div>

            {/* Import/Export buttons */}
            <div className="flex items-center space-x-2">
              <Button
                variant="outline"
                size="sm"
                onClick={() => fileInputRef.current?.click()}
                className="hidden sm:flex bg-gradient-to-r from-emerald-500/10 to-teal-500/10 hover:from-emerald-500/20 hover:to-teal-500/20 border-emerald-400/50 hover:border-emerald-400 text-white transition-all duration-200 transform hover:scale-105"
              >
                <Upload className="h-4 w-4 mr-2" />
                Import
              </Button>
              <Button
                variant="outline"
                size="sm"
                onClick={exportJobs}
                className="hidden sm:flex bg-gradient-to-r from-emerald-500/10 to-teal-500/10 hover:from-emerald-500/20 hover:to-teal-500/20 border-emerald-400/50 hover:border-emerald-400 text-white transition-all duration-200 transform hover:scale-105"
              >
                <Download className="h-4 w-4 mr-2" />
                Export
              </Button>
              <input ref={fileInputRef} type="file" accept=".json" onChange={handleImport} className="hidden" />
            </div>
          </div>
        </div>
      </header>

      {/* Main Content */}
      <main className="flex-1 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">{children}</main>

      {/* Footer */}
      <Footer />
    </div>
  )
}
