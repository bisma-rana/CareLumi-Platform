"use client"

import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Avatar, AvatarFallback } from "@/components/ui/avatar"

export default function RecentActivity() {
  const activities = [
    {
      user: "Sarah Miller",
      action: "uploaded new training certificates",
      time: "10 minutes ago",
      initials: "SM",
    },
    {
      user: "John Davis",
      action: "completed background check verification",
      time: "1 hour ago",
      initials: "JD",
    },
    {
      user: "Maria Johnson",
      action: "generated compliance folder for DCFS",
      time: "3 hours ago",
      initials: "MJ",
    },
    {
      user: "David Smith",
      action: "submitted fingerprint forms",
      time: "Yesterday at 4:30 PM",
      initials: "DS",
    },
    {
      user: "Lisa Wong",
      action: "updated staff credentials",
      time: "Yesterday at 2:15 PM",
      initials: "LW",
    },
  ]

  return (
    <Card className="col-span-1">
      <CardHeader>
        <CardTitle>Recent Activity</CardTitle>
        <CardDescription>Latest actions in the system</CardDescription>
      </CardHeader>
      <CardContent>
        <div className="space-y-4">
          {activities.map((activity, index) => (
            <div
              key={index}
              className="flex items-center gap-4 p-2 rounded-lg hover:bg-gradient-to-r hover:from-[#F4A2B9]/10 hover:to-[#CD9BD2]/10 cursor-pointer transition-all"
              onClick={() => console.log(`View details for ${activity.user}`)}
            >
              <Avatar className="h-8 w-8 ring-2 ring-[#CD9BD2]/20">
                <AvatarFallback className="bg-gradient-to-r from-[#F4A2B9] to-[#CD9BD2] text-white text-xs">
                  {activity.initials}
                </AvatarFallback>
              </Avatar>
              <div className="space-y-1 flex-1">
                <p className="text-sm font-medium leading-none text-[#212121]">
                  {activity.user} <span className="text-gray-600 font-normal">{activity.action}</span>
                </p>
                <p className="text-xs text-gray-500">{activity.time}</p>
              </div>
            </div>
          ))}
        </div>
      </CardContent>
    </Card>
  )
}
