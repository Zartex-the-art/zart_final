"use client"

import type React from "react"
import { useState } from "react"
import { useAppContext } from "@/context/AppContext"

interface AddJDModalProps {
  isOpen: boolean
  onClose: () => void
}

const AddJDModal: React.FC<AddJDModalProps> = ({ isOpen, onClose }) => {
  const { addJobDescription } = useAppContext()
  const [company, setCompany] = useState("")
  const [jobTitle, setJobTitle] = useState("")
  const [description, setDescription] = useState("")

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    if (!company.trim() || !jobTitle.trim() || !description.trim()) {
      alert("Please fill all fields")
      return
    }
    addJobDescription(company, jobTitle, description)
    setCompany("")
    setJobTitle("")
    setDescription("")
    onClose()
  }

  if (!isOpen) return null

  return (
    <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50">
      <div className="bg-gray-800 rounded-lg p-8 max-w-2xl w-full mx-4">
        <h2 className="text-2xl font-bold text-white mb-6">Add New Job Description</h2>
        <form onSubmit={handleSubmit} className="space-y-4">
          <input
            type="text"
            placeholder="Company Name"
            value={company}
            onChange={(e) => setCompany(e.target.value)}
            className="w-full bg-gray-700/50 p-3 rounded-lg border border-gray-600 focus:ring-2 focus:ring-purple-500 focus:outline-none text-white"
          />
          <input
            type="text"
            placeholder="Job Title"
            value={jobTitle}
            onChange={(e) => setJobTitle(e.target.value)}
            className="w-full bg-gray-700/50 p-3 rounded-lg border border-gray-600 focus:ring-2 focus:ring-purple-500 focus:outline-none text-white"
          />
          <textarea
            placeholder="Job Description"
            value={description}
            onChange={(e) => setDescription(e.target.value)}
            className="w-full h-48 bg-gray-700/50 p-3 rounded-lg border border-gray-600 focus:ring-2 focus:ring-purple-500 focus:outline-none text-white"
          />
          <div className="flex gap-4">
            <button
              type="submit"
              className="flex-1 bg-gradient-to-r from-purple-500 to-pink-600 text-white font-semibold py-3 rounded-lg hover:opacity-90 transition-opacity"
            >
              Save Job Description
            </button>
            <button
              type="button"
              onClick={onClose}
              className="flex-1 bg-gray-700 text-white font-semibold py-3 rounded-lg hover:bg-gray-600 transition-colors"
            >
              Cancel
            </button>
          </div>
        </form>
      </div>
    </div>
  )
}

export default AddJDModal
