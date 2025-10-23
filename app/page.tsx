"use client"

import type React from "react"
import { useAppContext } from "@/context/AppContext"
import LandingPage from "@/pages/LandingPage"
import { useRouter } from "next/navigation"
import { useEffect } from "react"

const AppContent: React.FC = () => {
  const { user } = useAppContext()
  const router = useRouter()

  useEffect(() => {
    if (user) {
      router.push("/dashboard")
    }
  }, [user, router])

  if (!user) {
    return <LandingPage />
  }

  // Show nothing while redirecting
  return null
}

export default AppContent
