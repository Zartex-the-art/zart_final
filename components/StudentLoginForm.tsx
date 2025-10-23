"use client"

import type React from "react"
import { useState } from "react"
import { useAppContext } from "@/context/AppContext"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { AlertCircle } from "lucide-react"

interface StudentLoginFormProps {
  onLoginSuccess: () => void
}

const StudentLoginForm: React.FC<StudentLoginFormProps> = ({ onLoginSuccess }) => {
  const { login } = useAppContext()
  const [rollNumber, setRollNumber] = useState("")
  const [email, setEmail] = useState("")
  const [password, setPassword] = useState("")
  const [error, setError] = useState("")
  const [isLoading, setIsLoading] = useState(false)

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setError("")
    setIsLoading(true)

    if (!rollNumber || !email || !password) {
      setError("Please fill in all fields")
      setIsLoading(false)
      return
    }

    const result = login({ rollNumber, email, password, role: "Student" as any })
    if (result.success) {
      onLoginSuccess()
    } else {
      setError(result.error || "Login failed")
    }
    setIsLoading(false)
  }

  return (
    <Card className="bg-slate-800 border-slate-700">
      <CardHeader>
        <CardTitle className="text-white">Student Login</CardTitle>
        <CardDescription>Enter your credentials to access your learning dashboard</CardDescription>
      </CardHeader>
      <CardContent>
        <form onSubmit={handleSubmit} className="space-y-4">
          <div>
            <label className="block text-sm font-medium text-slate-300 mb-2">Roll Number</label>
            <Input
              type="text"
              placeholder="e.g., 23311A05R5"
              value={rollNumber}
              onChange={(e) => setRollNumber(e.target.value)}
              className="bg-slate-700 border-slate-600 text-white placeholder-slate-400"
            />
          </div>
          <div>
            <label className="block text-sm font-medium text-slate-300 mb-2">Email</label>
            <Input
              type="email"
              placeholder="your.email@sreenidhi.edu.in"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              className="bg-slate-700 border-slate-600 text-white placeholder-slate-400"
            />
          </div>
          <div>
            <label className="block text-sm font-medium text-slate-300 mb-2">Password</label>
            <Input
              type="password"
              placeholder="Enter password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              className="bg-slate-700 border-slate-600 text-white placeholder-slate-400"
            />
          </div>
          {error && (
            <div className="flex items-center gap-2 p-3 bg-red-900/20 border border-red-700 rounded text-red-400 text-sm">
              <AlertCircle size={16} />
              {error}
            </div>
          )}
          <div className="text-xs text-slate-400">Demo password: student123</div>
          <Button type="submit" disabled={isLoading} className="w-full bg-purple-600 hover:bg-purple-700 text-white">
            {isLoading ? "Logging in..." : "Login"}
          </Button>
        </form>
      </CardContent>
    </Card>
  )
}

export default StudentLoginForm
