import type React from "react"
import { Inter } from "next/font/google"
import "./globals.css"
import { JobProvider } from "@/contexts/job-context"
import { Layout } from "@/components/layout"

const inter = Inter({ subsets: ["latin"] })

export const metadata = {
  title: "Job Application Tracker",
  description: "Track your job applications with ease",
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="en">
      <body className={inter.className}>
        <JobProvider>
          <Layout>{children}</Layout>
        </JobProvider>
      </body>
    </html>
  )
}
