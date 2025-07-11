"use client"

import { useEffect, useState } from "react"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Progress } from "@/components/ui/progress"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Alert, AlertDescription, AlertTitle } from "@/components/ui/alert"
import { Button } from "@/components/ui/button"
import { AlertCircle, Clock, FileCheck, CheckCircle2, AlertTriangle, TrendingUp, Download } from "lucide-react"
import DashboardMetrics from "@/components/dashboard-metrics"
import RecentActivity from "@/components/recent-activity"
import InteractiveCharts from "@/components/interactive-charts"
import QuickActions from "@/components/quick-actions"
import StaffDashboard from "@/components/staff-dashboard"

export default function DashboardPage() {
  const [userRole, setUserRole] = useState<string | null>(null)
  const [userName, setUserName] = useState<string>("")

  useEffect(() => {
    if (typeof window !== "undefined") {
      setUserRole(localStorage.getItem("userRole"))
      setUserName(localStorage.getItem("userName") || "")
    }
  }, [])

  // Show loading state while determining user role
  if (!userRole) {
    return (
      <div className="flex-1 flex items-center justify-center p-6">
        <div className="text-center">
          <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-[#BC4E82] mx-auto mb-4"></div>
          <p className="text-gray-600">Loading dashboard...</p>
        </div>
      </div>
    )
  }

  // Staff Dashboard
  if (userRole === "staff") {
    return <StaffDashboard userName={userName} />
  }

  // Admin Dashboard (existing dashboard)
  return (
    <div className="flex-1 space-y-6 p-6">
      <div className="flex items-center justify-between">
        <div>
          <h2 className="text-3xl font-bold tracking-tight text-[#212121]">Dashboard</h2>
          <p className="text-gray-600">Welcome back! Here's what's happening with your compliance.</p>
        </div>
        <div className="flex items-center space-x-3">
          <Button variant="outline" className="border-[#CD9BD2] text-[#BC4E82] hover:bg-[#CD9BD2]/10 bg-transparent">
            <Download className="mr-2 h-4 w-4" />
            Export Report
          </Button>
          <div className="text-right">
            <p className="text-sm font-medium text-[#212121]">Kemit Academy</p>
            <p className="text-xs text-gray-600">Last updated: 2 min ago</p>
          </div>
        </div>
      </div>

      <QuickActions />

      <Tabs defaultValue="overview" className="space-y-4">
        <TabsList className="bg-gradient-to-r from-[#F4A2B9]/10 to-[#CD9BD2]/10">
          <TabsTrigger
            value="overview"
            className="data-[state=active]:bg-gradient-to-r data-[state=active]:from-[#F4A2B9] data-[state=active]:to-[#CD9BD2] data-[state=active]:text-white"
          >
            Overview
          </TabsTrigger>
          <TabsTrigger
            value="analytics"
            className="data-[state=active]:bg-gradient-to-r data-[state=active]:from-[#F4A2B9] data-[state=active]:to-[#CD9BD2] data-[state=active]:text-white"
          >
            Analytics
          </TabsTrigger>
          <TabsTrigger
            value="reports"
            className="data-[state=active]:bg-gradient-to-r data-[state=active]:from-[#F4A2B9] data-[state=active]:to-[#CD9BD2] data-[state=active]:text-white"
          >
            Reports
          </TabsTrigger>
        </TabsList>

        <TabsContent value="overview" className="space-y-6">
          <DashboardMetrics />

          <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
            <Card className="border-[#CD9BD2]/20 hover:shadow-lg transition-shadow cursor-pointer">
              <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                <CardTitle className="text-sm font-medium text-[#212121]">Compliance Status</CardTitle>
                <FileCheck className="h-4 w-4 text-[#BC4E82]" />
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  <div className="space-y-2">
                    <div className="flex items-center justify-between text-sm">
                      <span className="text-gray-700">Staff Documentation</span>
                      <span className="font-medium text-[#212121]">92%</span>
                    </div>
                    <Progress value={92} className="h-2 bg-gray-200">
                      <div
                        className="h-full bg-gradient-to-r from-[#FEBC89] to-[#FDD683] rounded-full transition-all"
                        style={{ width: "92%" }}
                      />
                    </Progress>
                  </div>
                  <div className="space-y-2">
                    <div className="flex items-center justify-between text-sm">
                      <span className="text-gray-700">Training Compliance</span>
                      <span className="font-medium text-[#212121]">87%</span>
                    </div>
                    <Progress value={87} className="h-2 bg-gray-200">
                      <div
                        className="h-full bg-gradient-to-r from-[#8E94DC] to-[#505691] rounded-full transition-all"
                        style={{ width: "87%" }}
                      />
                    </Progress>
                  </div>
                  <div className="space-y-2">
                    <div className="flex items-center justify-between text-sm">
                      <span className="text-gray-700">Background Checks</span>
                      <span className="font-medium text-[#212121]">100%</span>
                    </div>
                    <Progress value={100} className="h-2 bg-gray-200">
                      <div
                        className="h-full bg-gradient-to-r from-[#F4A2B9] to-[#CD9BD2] rounded-full transition-all"
                        style={{ width: "100%" }}
                      />
                    </Progress>
                  </div>
                </div>
              </CardContent>
            </Card>

            <Card className="border-[#CD9BD2]/20 hover:shadow-lg transition-shadow cursor-pointer">
              <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                <CardTitle className="text-sm font-medium text-[#212121]">Onboarding Timeline</CardTitle>
                <Clock className="h-4 w-4 text-[#BC4E82]" />
              </CardHeader>
              <CardContent>
                <div className="text-2xl font-bold text-[#212121]">9.2 days</div>
                <p className="text-xs text-gray-600">Average time from offer to ready-to-work</p>
                <div className="mt-4 flex items-center gap-2 text-sm">
                  <span className="text-green-600 flex items-center">
                    <TrendingUp className="h-4 w-4 mr-1" />
                    Under target (14 days)
                  </span>
                </div>
                <div className="mt-3 bg-gradient-to-r from-[#FEBC89]/20 to-[#FDD683]/20 p-2 rounded-lg">
                  <p className="text-xs text-gray-700">3 staff members in onboarding</p>
                </div>
              </CardContent>
            </Card>

            <Card className="border-[#CD9BD2]/20 hover:shadow-lg transition-shadow cursor-pointer">
              <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                <CardTitle className="text-sm font-medium text-[#212121]">Document Quality</CardTitle>
                <AlertCircle className="h-4 w-4 text-[#BC4E82]" />
              </CardHeader>
              <CardContent>
                <div className="text-2xl font-bold text-[#212121]">7%</div>
                <p className="text-xs text-gray-600">Documents failing quality check</p>
                <div className="mt-4 flex items-center gap-2 text-sm">
                  <span className="text-green-600 flex items-center">
                    <CheckCircle2 className="h-4 w-4 mr-1" />
                    Below threshold (10%)
                  </span>
                </div>
                <div className="mt-3 bg-gradient-to-r from-[#F4A2B9]/20 to-[#CD9BD2]/20 p-2 rounded-lg">
                  <p className="text-xs text-gray-700">2 documents need review</p>
                </div>
              </CardContent>
            </Card>
          </div>

          <div className="grid gap-6 md:grid-cols-2">
            <Card className="border-[#CD9BD2]/20">
              <CardHeader>
                <CardTitle className="text-[#212121]">Alerts & Notifications</CardTitle>
                <CardDescription className="text-gray-600">Issues requiring your attention</CardDescription>
              </CardHeader>
              <CardContent className="space-y-4">
                <Alert
                  variant="destructive"
                  className="border-red-200 bg-red-50 hover:bg-red-100 transition-colors cursor-pointer"
                >
                  <AlertCircle className="h-4 w-4" />
                  <AlertTitle className="text-red-800">CPR Certification Expiring</AlertTitle>
                  <AlertDescription className="text-red-700">
                    Maria Johnson's CPR certification expires in 14 days.
                  </AlertDescription>
                </Alert>

                <Alert className="border-amber-200 bg-amber-50 hover:bg-amber-100 transition-colors cursor-pointer">
                  <AlertTriangle className="h-4 w-4 text-amber-600" />
                  <AlertTitle className="text-amber-800">Background Check Delay</AlertTitle>
                  <AlertDescription className="text-amber-700">
                    David Smith's background check has been pending for 12 days.
                  </AlertDescription>
                </Alert>

                <Alert className="border-blue-200 bg-blue-50 hover:bg-blue-100 transition-colors cursor-pointer">
                  <AlertTriangle className="h-4 w-4 text-blue-600" />
                  <AlertTitle className="text-blue-800">Annual Inspection</AlertTitle>
                  <AlertDescription className="text-blue-700">
                    Scheduled for May 15, 2025. Ensure all compliance folders are ready.
                  </AlertDescription>
                </Alert>
              </CardContent>
            </Card>

            <RecentActivity />
          </div>
        </TabsContent>

        <TabsContent value="analytics" className="space-y-6">
          <InteractiveCharts />
        </TabsContent>

        <TabsContent value="reports" className="space-y-6">
          <Card className="border-[#CD9BD2]/20">
            <CardHeader>
              <CardTitle className="text-[#212121]">Compliance Reports</CardTitle>
              <CardDescription className="text-gray-600">Generate and download compliance reports</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="grid gap-4 md:grid-cols-2">
                <Button className="h-20 bg-gradient-to-r from-[#F4A2B9] to-[#CD9BD2] hover:from-[#F4A2B9]/90 hover:to-[#CD9BD2]/90 text-white">
                  <div className="text-center">
                    <Download className="h-6 w-6 mx-auto mb-2" />
                    <div className="font-medium">Missing Credentials Report</div>
                    <div className="text-xs opacity-90">Export CSV/XLSX</div>
                  </div>
                </Button>
                <Button
                  variant="outline"
                  className="h-20 border-[#CD9BD2] text-[#BC4E82] hover:bg-[#CD9BD2]/10 bg-transparent"
                >
                  <div className="text-center">
                    <FileCheck className="h-6 w-6 mx-auto mb-2" />
                    <div className="font-medium">Compliance Summary</div>
                    <div className="text-xs">PDF Report</div>
                  </div>
                </Button>
              </div>
            </CardContent>
          </Card>
        </TabsContent>
      </Tabs>
    </div>
  )
}
