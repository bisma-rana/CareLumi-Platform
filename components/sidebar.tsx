"use client"

import Link from "next/link"
import { usePathname } from "next/navigation"
import { cn } from "@/lib/utils"
import { BarChart3, FolderArchive, Bell, Settings, LogOut, Clock } from "lucide-react"
import Image from "next/image"
import { useState, useEffect } from "react"

export default function Sidebar() {
  const pathname = usePathname()
  const [userRole, setUserRole] = useState<string | null>(null)

  useEffect(() => {
    if (typeof window !== "undefined") {
      setUserRole(localStorage.getItem("userRole"))
    }
  }, [])

  if (!userRole) {
    return null
  }

  const adminRoutes = [
    {
      href: "/dashboard",
      icon: BarChart3,
      title: "Dashboard",
    },
    {
      href: "/staff-compliance",
      icon: FolderArchive,
      title: "Staff Compliance",
    },
    {
      href: "/notifications",
      icon: Bell,
      title: "Notifications",
    },
    {
      href: "/settings",
      icon: Settings,
      title: "Settings",
    },
    {
      href: "/coming-soon",
      icon: Clock,
      title: "Coming Soon",
    },
  ]

  const staffRoutes = [
    {
      href: "/dashboard",
      icon: BarChart3,
      title: "Dashboard",
    },
    {
      href: "/my-compliance",
      icon: FolderArchive,
      title: "My Compliance",
    },
    {
      href: "/notifications",
      icon: Bell,
      title: "Notifications",
    },
    {
      href: "/settings",
      icon: Settings,
      title: "Settings",
    },
  ]

  const routes = userRole === "admin" ? adminRoutes : staffRoutes

  return (
    <div className="flex flex-col h-full w-64 bg-white border-r border-gray-200 shadow-sm">
      <div className="p-6 border-b border-gray-200">
        <div className="flex items-center justify-center">
          <Image
            src="/images/carelumi-full-logo.png"
            alt="CareLumi Logo"
            width={200}
            height={60}
            className="h-14 w-auto"
          />
        </div>
      </div>
      <nav className="flex-1 px-4 py-4 space-y-1">
        {routes.map((route) => (
          <Link
            key={route.href}
            href={route.href}
            className={cn(
              "flex items-center gap-3 rounded-lg px-3 py-2.5 text-sm font-medium transition-all hover:bg-gradient-to-r hover:from-[#F4A2B9]/10 hover:to-[#CD9BD2]/10",
              pathname === route.href
                ? "bg-gradient-to-r from-[#F4A2B9]/20 to-[#CD9BD2]/20 text-[#BC4E82] border-r-2 border-[#BC4E82]"
                : "text-gray-700 hover:text-[#BC4E82]",
            )}
          >
            <route.icon className="h-5 w-5" />
            {route.title}
          </Link>
        ))}
      </nav>
      <div className="p-4 mt-auto border-t border-gray-200">
        <button
          onClick={() => {
            // In a real app, this would clear authentication tokens
            window.location.href = "/login"
          }}
          className="flex items-center gap-3 rounded-lg px-3 py-2.5 text-sm font-medium text-gray-700 transition-all hover:text-[#BC4E82] hover:bg-gradient-to-r hover:from-[#F4A2B9]/10 hover:to-[#CD9BD2]/10 w-full text-left"
        >
          <LogOut className="h-5 w-5" />
          Logout
        </button>
      </div>
    </div>
  )
}
