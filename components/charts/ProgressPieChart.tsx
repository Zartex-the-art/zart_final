"use client"

import type React from "react"
import { PieChart, Pie, Cell, ResponsiveContainer, Legend, Tooltip } from "recharts"

interface ProgressPieChartProps {
  completed: number
  total: number
}

const ProgressPieChart: React.FC<ProgressPieChartProps> = ({ completed, total }) => {
  const remaining = total - completed
  const data = [
    { name: "Completed", value: completed },
    { name: "Remaining", value: remaining },
  ]

  const COLORS = ["#8B5CF6", "#374151"]

  return (
    <ResponsiveContainer width="100%" height={300}>
      <PieChart>
        <Pie
          data={data}
          cx="50%"
          cy="50%"
          labelLine={false}
          label={({ name, value }) => `${name}: ${value}`}
          outerRadius={80}
          fill="#8884d8"
          dataKey="value"
        >
          {data.map((entry, index) => (
            <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
          ))}
        </Pie>
        <Tooltip />
        <Legend />
      </PieChart>
    </ResponsiveContainer>
  )
}

export default ProgressPieChart
