"use client"

import type React from "react"
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer } from "recharts"

interface StudentProgressChartProps {
  data?: Array<{ name: string; progress: number }>
}

export const StudentProgressChart: React.FC<StudentProgressChartProps> = ({ data = [] }) => {
  const chartData =
    data.length > 0
      ? data
      : [
          { name: "Week 1", progress: 20 },
          { name: "Week 2", progress: 35 },
          { name: "Week 3", progress: 50 },
          { name: "Week 4", progress: 75 },
        ]

  return (
    <ResponsiveContainer width="100%" height={300}>
      <BarChart data={chartData}>
        <CartesianGrid strokeDasharray="3 3" stroke="#374151" />
        <XAxis dataKey="name" stroke="#9CA3AF" />
        <YAxis stroke="#9CA3AF" />
        <Tooltip contentStyle={{ backgroundColor: "#1F2937", border: "1px solid #374151" }} />
        <Legend />
        <Bar dataKey="progress" fill="#8B5CF6" />
      </BarChart>
    </ResponsiveContainer>
  )
}

export default StudentProgressChart
