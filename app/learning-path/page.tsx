"use client"

import type React from "react"
import { useMemo, useState } from "react"
import Sidebar from "@/components/Sidebar"
import Card from "@/components/Card"
import { useAppContext } from "@/context/AppContext"
import type { Student } from "@/types"
import { ChevronDownIcon, CheckCircleIcon } from "@/components/icons/Icons"
import { useRouter } from "next/navigation"

const LearningPathPage: React.FC = () => {
  const { user, learningPaths, updateTopicCompletion } = useAppContext()
  const router = useRouter()
  const [openCategories, setOpenCategories] = useState<{ [key: string]: boolean }>({})
  const student = user as Student
  const learningPath = useMemo(() => {
    return learningPaths.find((p) => p.id === student?.assignedLearningPathId)
  }, [learningPaths, student])

  if (!user) {
    router.push("/")
    return null
  }

  if (!learningPath) {
    return (
      <div className="flex min-h-screen bg-gray-900">
        <Sidebar />
        <main className="flex-1 md:ml-64 p-8">
          <div className="max-w-7xl mx-auto">
            <h1 className="text-4xl font-bold text-white mb-8">Learning Path</h1>
            <Card>
              <p className="text-gray-400">No learning path assigned yet. Please contact your admin.</p>
            </Card>
          </div>
        </main>
      </div>
    )
  }

  const allTopics = Object.values(learningPath.topics).flat()
  const completedTopics = allTopics.filter((t) => t.completed)
  const progress = allTopics.length > 0 ? (completedTopics.length / allTopics.length) * 100 : 0

  const toggleCategory = (category: string) => {
    setOpenCategories((prev) => ({ ...prev, [category]: !prev[category] }))
  }

  return (
    <div className="flex min-h-screen bg-gray-900">
      <Sidebar />
      <main className="flex-1 md:ml-64 p-8">
        <div className="max-w-7xl mx-auto">
          <h1 className="text-4xl font-bold text-white mb-8">Learning Path</h1>
          <Card>
            <h2 className="text-2xl font-bold text-white mb-2">Your Learning Path</h2>
            <p className="text-gray-400 mb-6">
              For: {learningPath.jobTitle} at {learningPath.company}
            </p>

            <div className="mb-8">
              <div className="flex justify-between items-center mb-2">
                <span className="text-gray-300">Overall Progress</span>
                <span className="text-2xl font-bold text-purple-500">{Math.round(progress)}% Complete</span>
              </div>
              <div className="w-full bg-gray-700 rounded-full h-3">
                <div
                  className="bg-gradient-to-r from-purple-500 to-pink-600 h-3 rounded-full transition-all duration-300"
                  style={{ width: `${progress}%` }}
                />
              </div>
            </div>

            <div className="space-y-3">
              {Object.entries(learningPath.topics).map(([category, topics]) => (
                <div key={category} className="border border-gray-700 rounded-lg overflow-hidden">
                  <button
                    onClick={() => toggleCategory(category)}
                    className="w-full flex justify-between items-center text-left p-4 bg-gray-700/50 hover:bg-gray-700 transition-colors focus:outline-none"
                  >
                    <span className="font-semibold text-white">{category}</span>
                    <ChevronDownIcon
                      className={`transform transition-transform ${openCategories[category] ? "rotate-180" : ""}`}
                    />
                  </button>

                  {openCategories[category] && (
                    <div className="bg-gray-800/50 p-4 space-y-3">
                      {topics.map((topic) => (
                        <label key={topic.name} className="flex items-center gap-3 cursor-pointer group">
                          <input
                            type="checkbox"
                            checked={topic.completed}
                            onChange={(e) =>
                              student && updateTopicCompletion(student.id, category, topic.name, e.target.checked)
                            }
                            className="w-5 h-5 text-purple-500 bg-gray-600 border-gray-500 rounded focus:ring-purple-600 cursor-pointer"
                          />
                          <span
                            className={`flex-1 ${topic.completed ? "line-through text-gray-500" : "text-gray-300"}`}
                          >
                            {topic.name}
                          </span>
                          {topic.completed && <CheckCircleIcon className="text-green-500" />}
                        </label>
                      ))}
                    </div>
                  )}
                </div>
              ))}
            </div>
          </Card>
        </div>
      </main>
    </div>
  )
}

export default LearningPathPage
