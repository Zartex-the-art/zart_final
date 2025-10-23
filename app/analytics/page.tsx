"use client"

import type React from "react"
import { useMemo } from "react"
import Sidebar from "@/components/Sidebar"
import Card from "@/components/Card"
import { useAppContext } from "@/context/AppContext"
import ProgressPieChart from "@/components/charts/ProgressPieChart"
import type { Student } from "@/types"
import { UserRole } from "@/types"
import { useRouter } from "next/navigation"

const AnalyticsPage: React.FC = () => {
  const { user, students, learningPaths } = useAppContext()
  const router = useRouter()

  const totalStudents = students.length
  const studentsWithPath = students.filter((s) => s.assignedLearningPathId).length
  const avgProgress = useMemo(() => {
    const progressValues = students.map((student) => {
      const path = learningPaths.find((p) => p.id === student.assignedLearningPathId)
      if (!path) return 0
      const allTopics = Object.values(path.topics).flat()
      const completed = allTopics.filter((t) => t.completed).length
      return allTopics.length > 0 ? (completed / allTopics.length) * 100 : 0
    })
    return progressValues.length > 0 ? Math.round(progressValues.reduce((a, b) => a + b, 0) / progressValues.length) : 0
  }, [students, learningPaths])

  const student = user as Student
  const { completedCount, totalCount, progress } = useMemo(() => {
    const path = learningPaths.find((p) => p.id === student?.assignedLearningPathId)
    if (!path) return { completedCount: 0, totalCount: 0, progress: 0 }

    const allTopics = Object.values(path.topics).flat()
    const completedTopics = allTopics.filter((t) => t.completed)
    const prog = allTopics.length > 0 ? (completedTopics.length / allTopics.length) * 100 : 0
    return { completedCount: completedTopics.length, totalCount: allTopics.length, progress: prog }
  }, [learningPaths, student])

  if (!user) {
    router.push("/")
    return null
  }

  if (user.role === UserRole.Admin) {
    // Admin Analytics
    return (
      <div className="flex min-h-screen bg-gray-900">
        <Sidebar />
        <main className="flex-1 md:ml-64 p-8">
          <div className="max-w-7xl mx-auto">
            <h1 className="text-4xl font-bold text-white mb-8">Analytics</h1>
            <div className="grid md:grid-cols-3 gap-8">
              <Card>
                <h3 className="text-gray-400 text-sm mb-2">Total Students</h3>
                <p className="text-4xl font-bold text-white">{totalStudents}</p>
              </Card>
              <Card>
                <h3 className="text-gray-400 text-sm mb-2">Students with Path</h3>
                <p className="text-4xl font-bold text-purple-500">{studentsWithPath}</p>
              </Card>
              <Card>
                <h3 className="text-gray-400 text-sm mb-2">Average Progress</h3>
                <p className="text-4xl font-bold text-pink-500">{avgProgress}%</p>
              </Card>
            </div>
          </div>
        </main>
      </div>
    )
  }

  // Student Analytics
  return (
    <div className="flex min-h-screen bg-gray-900">
      <Sidebar />
      <main className="flex-1 md:ml-64 p-8">
        <div className="max-w-7xl mx-auto">
          <h1 className="text-4xl font-bold text-white mb-8">Analytics</h1>
          <div className="grid md:grid-cols-3 gap-8">
            <Card>
              <h3 className="text-gray-400 text-sm mb-2">Topics Completed</h3>
              <p className="text-4xl font-bold text-white">{completedCount}</p>
              <p className="text-gray-400 text-sm mt-2">of {totalCount} total</p>
            </Card>
            <Card>
              <h3 className="text-gray-400 text-sm mb-2">Overall Progress</h3>
              <p className="text-4xl font-bold text-purple-500">{Math.round(progress)}%</p>
            </Card>
            <Card>
              <h2 className="text-2xl font-bold text-white mb-6">Progress Chart</h2>
              <ProgressPieChart completed={completedCount} total={totalCount} />
            </Card>
          </div>
        </div>
      </main>
    </div>
  )
}

export default AnalyticsPage
