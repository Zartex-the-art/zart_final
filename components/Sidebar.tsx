"use client"

import type React from "react"
import { useState } from "react"
import Link from "next/link"
import { usePathname } from "next/navigation"
import { HomeIcon, ChartBarIcon, DocumentTextIcon, CogIcon, LogoutIcon, MenuIcon, XIcon } from "./icons/Icons"
import { useAppContext } from "@/context/AppContext"

type SidebarProps = {}

const Sidebar: React.FC<SidebarProps> = () => {
  const { logout, user } = useAppContext()
  const [isOpen, setIsOpen] = useState(false)
  const pathname = usePathname()

  const navItems = [
    { icon: <HomeIcon />, label: "Dashboard", href: "/dashboard" },
    { icon: <DocumentTextIcon />, label: "Learning Path", href: "/learning-path" },
    { icon: <ChartBarIcon />, label: "Analytics", href: "/analytics" },
    { icon: <CogIcon />, label: "Settings", href: "/settings" },
  ]

  const isActive = (href: string) => pathname === href

  return (
    <>
      {/* Mobile Menu Button */}
      <button
        onClick={() => setIsOpen(!isOpen)}
        className="md:hidden fixed top-4 left-4 z-50 p-2 bg-gray-800 rounded-lg border border-gray-700"
      >
        {isOpen ? <XIcon /> : <MenuIcon />}
      </button>

      {/* Sidebar */}
      <aside
        className={`fixed left-0 top-0 h-screen w-64 bg-gray-900 border-r border-gray-700 p-6 transform transition-transform duration-300 ${isOpen ? "translate-x-0" : "-translate-x-full"} md:translate-x-0 z-40`}
      >
        <div className="space-y-8">
          <div>
            <h1 className="text-2xl font-bold text-white">SmartLMS</h1>
            <p className="text-sm text-gray-400 mt-2">Welcome, {user?.name}</p>
          </div>

          <nav className="space-y-2">
            {navItems.map((item, index) => (
              <Link
                key={index}
                href={item.href}
                onClick={() => setIsOpen(false)}
                className={`w-full flex items-center gap-3 px-4 py-3 rounded-lg transition-colors ${
                  isActive(item.href) ? "bg-purple-600 text-white" : "text-gray-300 hover:bg-gray-800 hover:text-white"
                }`}
              >
                {item.icon}
                <span>{item.label}</span>
              </Link>
            ))}
          </nav>

          <div className="absolute bottom-6 left-6 right-6">
            <button
              onClick={() => {
                logout()
                setIsOpen(false)
              }}
              className="w-full flex items-center gap-3 px-4 py-3 rounded-lg text-red-400 hover:bg-red-900/20 transition-colors"
            >
              <LogoutIcon />
              <span>Logout</span>
            </button>
          </div>
        </div>
      </aside>
    </>
  )
}

export default Sidebar
