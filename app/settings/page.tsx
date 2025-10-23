"use client"

import type React from "react"
import Sidebar from "@/components/Sidebar"
import Card from "@/components/Card"
import { useAppContext } from "@/context/AppContext"
import { useRouter } from "next/navigation"

const SettingsPage: React.FC = () => {
  const { user } = useAppContext()
  const router = useRouter()

  if (!user) {
    router.push("/")
    return null
  }

  return (
    <div className="flex min-h-screen bg-gray-900">
      <Sidebar />
      <main className="flex-1 md:ml-64 p-8">
        <div className="max-w-7xl mx-auto">
          <h1 className="text-4xl font-bold text-white mb-8">Settings</h1>
          <div className="grid md:grid-cols-2 gap-8">
            <Card>
              <h2 className="text-2xl font-bold text-white mb-6">Profile Information</h2>
              <div className="space-y-4">
                <div>
                  <label className="block text-gray-400 text-sm mb-2">Name</label>
                  <p className="text-white text-lg">{user.name}</p>
                </div>
                <div>
                  <label className="block text-gray-400 text-sm mb-2">Email</label>
                  <p className="text-white text-lg">{user.email}</p>
                </div>
                <div>
                  <label className="block text-gray-400 text-sm mb-2">Role</label>
                  <p className="text-white text-lg capitalize">{user.role}</p>
                </div>
              </div>
            </Card>

            <Card>
              <h2 className="text-2xl font-bold text-white mb-6">Preferences</h2>
              <div className="space-y-4">
                <label className="flex items-center gap-3 cursor-pointer">
                  <input type="checkbox" defaultChecked className="w-5 h-5 text-purple-500 rounded" />
                  <span className="text-gray-300">Email Notifications</span>
                </label>
                <label className="flex items-center gap-3 cursor-pointer">
                  <input type="checkbox" defaultChecked className="w-5 h-5 text-purple-500 rounded" />
                  <span className="text-gray-300">Progress Updates</span>
                </label>
                <label className="flex items-center gap-3 cursor-pointer">
                  <input type="checkbox" className="w-5 h-5 text-purple-500 rounded" />
                  <span className="text-gray-300">Weekly Reports</span>
                </label>
              </div>
            </Card>
          </div>
        </div>
      </main>
    </div>
  )
}

export default SettingsPage
