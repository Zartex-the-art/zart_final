"use client"

import type React from "react"
import { createContext, useState, useContext, type ReactNode, useCallback } from "react"
import {
  type User,
  type Student,
  type LearningPath,
  UserRole,
  type LearningCategory,
  type JobDescription,
} from "@/types"
import { DUMMY_STUDENTS, DUMMY_LEARNING_PATHS } from "@/constants"
import { generateLearningPathFromJD } from "@/app/actions/generateLearningPath"

interface AppContextType {
  user: User | null
  students: Student[]
  learningPaths: LearningPath[]
  jobDescriptions: JobDescription[]
  login: (role: UserRole) => void
  logout: () => void
  generateAndAssignPath: (
    jobDescription: string,
    company: string,
    jobTitle: string,
    selectedStudentIds: string[],
  ) => Promise<void>
  updateTopicCompletion: (studentId: string, category: string, topicName: string, completed: boolean) => void
  addJobDescription: (company: string, jobTitle: string, description: string) => void
  deleteJobDescription: (id: string) => void
}

const AppContext = createContext<AppContextType | undefined>(undefined)

export const AppProvider: React.FC<{ children: ReactNode }> = ({ children }) => {
  const [user, setUser] = useState<User | null>(null)
  const [students, setStudents] = useState<Student[]>(
    DUMMY_STUDENTS.map((s) => ({ ...s, assignedLearningPathId: "LP1" })),
  )
  const [learningPaths, setLearningPaths] = useState<LearningPath[]>(DUMMY_LEARNING_PATHS)
  const [jobDescriptions, setJobDescriptions] = useState<JobDescription[]>([])

  const login = (role: UserRole) => {
    if (role === UserRole.Admin) {
      setUser({ id: "A1", name: "Admin User", email: "admin@smartlms.com", role: UserRole.Admin })
    } else {
      setUser(students[0])
    }
  }

  const logout = () => {
    setUser(null)
  }

  const generateAndAssignPath = useCallback(
    async (jobDescription: string, company: string, jobTitle: string, selectedStudentIds: string[]) => {
      const generatedTopics = await generateLearningPathFromJD(jobDescription)
      const newPath: LearningPath = {
        id: `LP${learningPaths.length + 1}`,
        company,
        jobTitle,
        topics: Object.keys(generatedTopics).reduce((acc: LearningCategory, key: string) => {
          acc[key] = (generatedTopics as any)[key].map((topicName: string) => ({ name: topicName, completed: false }))
          return acc
        }, {}),
      }
      setLearningPaths((prevPaths) => [...prevPaths, newPath])
      setStudents((prevStudents) =>
        prevStudents.map((student) =>
          selectedStudentIds.includes(student.id) ? { ...student, assignedLearningPathId: newPath.id } : student,
        ),
      )
    },
    [learningPaths],
  )

  const updateTopicCompletion = (studentId: string, category: string, topicName: string, completed: boolean) => {
    const student = students.find((s) => s.id === studentId)
    if (!student || !student.assignedLearningPathId) return

    setLearningPaths((prevPaths) =>
      prevPaths.map((path) => {
        if (path.id === student.assignedLearningPathId) {
          const newTopics = { ...path.topics }
          if (newTopics[category]) {
            newTopics[category] = newTopics[category].map((topic) =>
              topic.name === topicName ? { ...topic, completed } : topic,
            )
          }
          return { ...path, topics: newTopics }
        }
        return path
      }),
    )
  }

  const addJobDescription = (company: string, jobTitle: string, description: string) => {
    const newJD: JobDescription = {
      id: `JD${jobDescriptions.length + 1}`,
      company,
      jobTitle,
      description,
      createdAt: new Date(),
    }
    setJobDescriptions((prev) => [...prev, newJD])
  }

  const deleteJobDescription = (id: string) => {
    setJobDescriptions((prev) => prev.filter((jd) => jd.id !== id))
  }

  return (
    <AppContext.Provider
      value={{
        user,
        students,
        learningPaths,
        jobDescriptions,
        login,
        logout,
        generateAndAssignPath,
        updateTopicCompletion,
        addJobDescription,
        deleteJobDescription,
      }}
    >
      {children}
    </AppContext.Provider>
  )
}

export const useAppContext = (): AppContextType => {
  const context = useContext(AppContext)
  if (!context) {
    throw new Error("useAppContext must be used within an AppProvider")
  }
  return context
}
