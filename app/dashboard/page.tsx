"use client"

import type React from "react"
import { useAppContext } from "@/context/AppContext"
import { UserRole } from "@/types"
import { useRouter } from "next/navigation"
import AdminDashboard from "@/pages/AdminDashboard"
import StudentDashboard from "@/pages/StudentDashboard"

const DashboardPage: React.FC = () => {
  const { user } = useAppContext()
  const router = useRouter()

  if (!user) {
    router.push("/")
    return null
  }

  if (user.role === UserRole.Admin) {
    return <AdminDashboard />
  }

  return <StudentDashboard />
}

export default DashboardPage
