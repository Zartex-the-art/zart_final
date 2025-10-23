import type React from "react"

interface CardProps {
  children: React.ReactNode
  className?: string
}

const Card: React.FC<CardProps> = ({ children, className = "" }) => {
  return <div className={`bg-gray-800 rounded-lg p-6 border border-gray-700 ${className}`}>{children}</div>
}

export default Card
