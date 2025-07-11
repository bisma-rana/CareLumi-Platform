"use client"

import { useEffect, useState } from "react"
import AlertsList from "@/components/alerts-list"
import MyAlertsList from "@/components/my-alerts-list"

export default function NotificationsPage() {
  const [userRole, setUserRole] = useState<string | null>(null)

  useEffect(() => {
    if (typeof window !== "undefined") {
      setUserRole(localStorage.getItem("userRole"))
    }
  }, [])

  if (!userRole) {
    return (
      <div className="flex-1 flex items-center justify-center p-6">
        <div className="text-center">
          <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-[#BC4E82] mx-auto mb-4"></div>
          <p className="text-gray-600">Loading...</p>
        </div>
      </div>
    )
  }

  return (
    <div className="flex-1 space-y-4 p-6">
      <div className="flex items-center justify-between">
        <h2 className="text-3xl font-bold tracking-tight text-[#212121]">Notifications</h2>
      </div>

      {userRole === "admin" ? <AlertsList /> : <MyAlertsList />}
    </div>
  )
}
