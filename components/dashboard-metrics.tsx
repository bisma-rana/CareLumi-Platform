"use client"

import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Progress } from "@/components/ui/progress"
import { Clock, FileCheck, Users, AlertTriangle } from "lucide-react"
import { useRouter } from "next/navigation"

export default function DashboardMetrics() {
  const router = useRouter()

  return (
    <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4">
      <Card
        className="border-[#CD9BD2]/20 hover:shadow-lg transition-all cursor-pointer group"
        onClick={() => router.push("/staff-compliance?tab=training")}
      >
        <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
          <CardTitle className="text-sm font-medium text-[#212121] group-hover:text-[#BC4E82] transition-colors">
            Training Compliance
          </CardTitle>
          <FileCheck className="h-4 w-4 text-[#BC4E82] group-hover:scale-110 transition-transform" />
        </CardHeader>
        <CardContent>
          <div className="text-2xl font-bold text-[#212121] group-hover:text-[#BC4E82] transition-colors">87%</div>
          <p className="text-xs text-gray-600">Staff training completion</p>
          <div className="mt-2 h-1 bg-gray-200 rounded-full overflow-hidden">
            <div className="h-full bg-gradient-to-r from-[#FEBC89] to-[#FDD683] rounded-full w-[87%] transition-all duration-500"></div>
          </div>
        </CardContent>
      </Card>

      <Card
        className="border-[#CD9BD2]/20 hover:shadow-lg transition-all cursor-pointer group"
        onClick={() => router.push("/staff-compliance?tab=missing")}
      >
        <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
          <CardTitle className="text-sm font-medium text-[#212121] group-hover:text-[#BC4E82] transition-colors">
            Missing Credentials
          </CardTitle>
          <AlertTriangle className="h-4 w-4 text-[#BC4E82] group-hover:scale-110 transition-transform" />
        </CardHeader>
        <CardContent>
          <div className="text-2xl font-bold text-[#212121] group-hover:text-[#BC4E82] transition-colors">4</div>
          <p className="text-xs text-gray-600">Staff missing documents</p>
          <div className="mt-2 h-1 bg-gray-200 rounded-full overflow-hidden">
            <div className="h-full bg-gradient-to-r from-[#FF9472] to-[#FF7D68] rounded-full w-1/4 transition-all duration-500"></div>
          </div>
        </CardContent>
      </Card>

      <Card
        className="border-[#CD9BD2]/20 hover:shadow-lg transition-all cursor-pointer group"
        onClick={() => router.push("/staff-compliance?tab=expiring")}
      >
        <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
          <CardTitle className="text-sm font-medium text-[#212121] group-hover:text-[#BC4E82] transition-colors">
            Expiring Soon
          </CardTitle>
          <Clock className="h-4 w-4 text-[#BC4E82] group-hover:scale-110 transition-transform" />
        </CardHeader>
        <CardContent>
          <div className="text-2xl font-bold text-[#212121] group-hover:text-[#BC4E82] transition-colors">3</div>
          <p className="text-xs text-gray-600">Credentials expiring in 30 days</p>
          <div className="mt-2 h-1 bg-gray-200 rounded-full overflow-hidden">
            <div className="h-full bg-gradient-to-r from-[#8E94DC] to-[#505691] rounded-full w-1/5 transition-all duration-500"></div>
          </div>
        </CardContent>
      </Card>

      <Card
        className="border-[#CD9BD2]/20 hover:shadow-lg transition-all cursor-pointer group"
        onClick={() => console.log("Navigate to staff details")}
      >
        <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
          <CardTitle className="text-sm font-medium text-[#212121] group-hover:text-[#BC4E82] transition-colors">
            Total Number of Staff
          </CardTitle>
          <Users className="h-4 w-4 text-[#BC4E82] group-hover:scale-110 transition-transform" />
        </CardHeader>
        <CardContent>
          <div className="text-2xl font-bold text-[#212121] group-hover:text-[#BC4E82] transition-colors">28</div>
          <p className="text-xs text-gray-600">Goal: 35 by end of year</p>
          <div className="mt-2">
            <Progress value={80} className="h-2 bg-gray-200">
              <div
                className="h-full bg-gradient-to-r from-[#68D387] to-[#34A159] rounded-full transition-all duration-500"
                style={{ width: "80%" }}
              />
            </Progress>
            <p className="text-xs text-gray-500 mt-1">80% of yearly goal</p>
          </div>
        </CardContent>
      </Card>
    </div>
  )
}
