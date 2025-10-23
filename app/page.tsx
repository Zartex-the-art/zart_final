"use client"

import type React from "react"
import { useAppContext } from "@/context/AppContext"
import LandingPage from "@/pages/LandingPage"
import { useRouter } from "next/navigation"
import { useEffect, useRef } from "react"

const AppContent: React.FC = () => {
  const { user } = useAppContext()
  const router = useRouter()
  const hasRedirected = useRef(false)

  useEffect(() => {
    if (user && !hasRedirected.current) {
      hasRedirected.current = true
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
