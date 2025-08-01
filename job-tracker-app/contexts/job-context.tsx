"use client"

import type React from "react"
import { createContext, useContext, useReducer, useEffect } from "react"

export interface JobApplication {
  id: string
  companyName: string
  jobTitle: string
  status: "Applied" | "Interviewing" | "Offer" | "Rejected"
  applicationDate: string
  notes: string
  createdAt: string
}

interface JobState {
  jobs: JobApplication[]
}

type JobAction =
  | { type: "ADD_JOB"; payload: JobApplication }
  | { type: "UPDATE_JOB"; payload: JobApplication }
  | { type: "DELETE_JOB"; payload: string }
  | { type: "SET_JOBS"; payload: JobApplication[] }

const JobContext = createContext<{
  state: JobState
  dispatch: React.Dispatch<JobAction>
  addJob: (job: Omit<JobApplication, "id" | "createdAt">) => void
  updateJob: (job: JobApplication) => void
  deleteJob: (id: string) => void
  exportJobs: () => void
  importJobs: (file: File) => Promise<void>
} | null>(null)

const jobReducer = (state: JobState, action: JobAction): JobState => {
  switch (action.type) {
    case "ADD_JOB":
      return { ...state, jobs: [...state.jobs, action.payload] }
    case "UPDATE_JOB":
      return {
        ...state,
        jobs: state.jobs.map((job) => (job.id === action.payload.id ? action.payload : job)),
      }
    case "DELETE_JOB":
      return {
        ...state,
        jobs: state.jobs.filter((job) => job.id !== action.payload),
      }
    case "SET_JOBS":
      return { ...state, jobs: action.payload }
    default:
      return state
  }
}

export function JobProvider({ children }: { children: React.ReactNode }) {
  const [state, dispatch] = useReducer(jobReducer, { jobs: [] })

  // Load jobs from localStorage on mount
  useEffect(() => {
    const savedJobs = localStorage.getItem("jobApplications")
    if (savedJobs) {
      try {
        const jobs = JSON.parse(savedJobs)
        dispatch({ type: "SET_JOBS", payload: jobs })
      } catch (error) {
        console.error("Error loading jobs from localStorage:", error)
      }
    }
  }, [])

  // Save jobs to localStorage whenever jobs change
  useEffect(() => {
    localStorage.setItem("jobApplications", JSON.stringify(state.jobs))
  }, [state.jobs])

  const addJob = (jobData: Omit<JobApplication, "id" | "createdAt">) => {
    const newJob: JobApplication = {
      ...jobData,
      id: Date.now().toString(),
      createdAt: new Date().toISOString(),
    }
    dispatch({ type: "ADD_JOB", payload: newJob })
  }

  const updateJob = (job: JobApplication) => {
    dispatch({ type: "UPDATE_JOB", payload: job })
  }

  const deleteJob = (id: string) => {
    dispatch({ type: "DELETE_JOB", payload: id })
  }

  const exportJobs = () => {
    const dataStr = JSON.stringify(state.jobs, null, 2)
    const dataBlob = new Blob([dataStr], { type: "application/json" })
    const url = URL.createObjectURL(dataBlob)
    const link = document.createElement("a")
    link.href = url
    link.download = `job-applications-${new Date().toISOString().split("T")[0]}.json`
    document.body.appendChild(link)
    link.click()
    document.body.removeChild(link)
    URL.revokeObjectURL(url)
  }

  const importJobs = async (file: File): Promise<void> => {
    return new Promise((resolve, reject) => {
      const reader = new FileReader()
      reader.onload = (e) => {
        try {
          const jobs = JSON.parse(e.target?.result as string)
          if (Array.isArray(jobs)) {
            dispatch({ type: "SET_JOBS", payload: jobs })
            resolve()
          } else {
            reject(new Error("Invalid file format"))
          }
        } catch (error) {
          reject(error)
        }
      }
      reader.onerror = () => reject(new Error("Error reading file"))
      reader.readAsText(file)
    })
  }

  return (
    <JobContext.Provider
      value={{
        state,
        dispatch,
        addJob,
        updateJob,
        deleteJob,
        exportJobs,
        importJobs,
      }}
    >
      {children}
    </JobContext.Provider>
  )
}

export function useJobs() {
  const context = useContext(JobContext)
  if (!context) {
    throw new Error("useJobs must be used within a JobProvider")
  }
  return context
}
