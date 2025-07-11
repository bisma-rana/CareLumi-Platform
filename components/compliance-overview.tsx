"use client"

import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Progress } from "@/components/ui/progress"
import { Button } from "@/components/ui/button"
import { Avatar, AvatarFallback } from "@/components/ui/avatar"
import { CheckCircle2, AlertTriangle, Clock, FileText, Upload, Calendar, User, Shield, Award } from "lucide-react"

export default function ComplianceOverview() {
  const overallProgress = 85
  const onboardingProgress = 92
  const credentialsProgress = 78

  return (
    <div className="space-y-6">
      {/* Header Card with Personal Info */}
      <Card className="border-[#CD9BD2]/20">
        <CardHeader>
          <div className="flex items-center gap-4">
            <Avatar className="h-16 w-16">
              <AvatarFallback className="bg-gradient-to-r from-[#F4A2B9] to-[#CD9BD2] text-white text-lg">
                SM
              </AvatarFallback>
            </Avatar>
            <div className="flex-1">
              <h3 className="text-2xl font-bold text-[#212121]">Sarah Miller</h3>
              <p className="text-gray-600">Lead Teacher</p>
              <div className="flex items-center gap-4 mt-2">
                <div className="flex items-center gap-1 text-sm text-gray-600">
                  <User className="h-4 w-4" />
                  Employee ID: EMP-001
                </div>
                <div className="flex items-center gap-1 text-sm text-gray-600">
                  <Calendar className="h-4 w-4" />
                  Hired: Jan 15, 2023
                </div>
              </div>
            </div>
            <div className="text-right">
              <div className="text-3xl font-bold text-[#212121]">{overallProgress}%</div>
              <p className="text-sm text-gray-600">Overall Complete</p>
              <Progress value={overallProgress} className="w-24 h-2 mt-2" />
            </div>
          </div>
        </CardHeader>
      </Card>

      {/* Progress Cards */}
      <div className="grid gap-6 md:grid-cols-3">
        <Card className="border-[#CD9BD2]/20">
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium text-[#212121]">Onboarding Progress</CardTitle>
            <CheckCircle2 className="h-4 w-4 text-[#BC4E82]" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold text-[#212121]">{onboardingProgress}%</div>
            <p className="text-xs text-gray-600">11 of 12 tasks complete</p>
            <Progress value={onboardingProgress} className="mt-3" />
            <div className="mt-3 text-xs text-gray-600">1 task remaining: Reference Letters</div>
          </CardContent>
        </Card>

        <Card className="border-[#CD9BD2]/20">
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium text-[#212121]">Credentials Status</CardTitle>
            <Award className="h-4 w-4 text-[#BC4E82]" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold text-[#212121]">{credentialsProgress}%</div>
            <p className="text-xs text-gray-600">7 of 9 credentials current</p>
            <Progress value={credentialsProgress} className="mt-3" />
            <div className="mt-3 text-xs text-amber-600">1 expiring soon: CPR Certification</div>
          </CardContent>
        </Card>

        <Card className="border-[#CD9BD2]/20">
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium text-[#212121]">Compliance Score</CardTitle>
            <Shield className="h-4 w-4 text-[#BC4E82]" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold text-green-600">Excellent</div>
            <p className="text-xs text-gray-600">All critical items complete</p>
            <div className="mt-3 flex items-center gap-2">
              <CheckCircle2 className="h-4 w-4 text-green-500" />
              <span className="text-xs text-green-600">DCFS Compliant</span>
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Quick Actions */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
        <Button className="h-16 bg-gradient-to-r from-[#F4A2B9] to-[#CD9BD2] hover:from-[#F4A2B9]/90 hover:to-[#CD9BD2]/90 text-white">
          <div className="flex items-center gap-3">
            <Upload className="h-5 w-5" />
            <div className="text-left">
              <div className="font-medium">Upload Document</div>
              <div className="text-xs opacity-90">Add credential</div>
            </div>
          </div>
        </Button>

        <Button variant="outline" className="h-16 border-[#CD9BD2] text-[#BC4E82] hover:bg-[#CD9BD2]/10 bg-transparent">
          <div className="flex items-center gap-3">
            <CheckCircle2 className="h-5 w-5" />
            <div className="text-left">
              <div className="font-medium">View Onboarding</div>
              <div className="text-xs">Check tasks</div>
            </div>
          </div>
        </Button>

        <Button variant="outline" className="h-16 border-[#CD9BD2] text-[#BC4E82] hover:bg-[#CD9BD2]/10 bg-transparent">
          <div className="flex items-center gap-3">
            <Award className="h-5 w-5" />
            <div className="text-left">
              <div className="font-medium">Manage Credentials</div>
              <div className="text-xs">Track renewals</div>
            </div>
          </div>
        </Button>

        <Button variant="outline" className="h-16 border-[#CD9BD2] text-[#BC4E82] hover:bg-[#CD9BD2]/10 bg-transparent">
          <div className="flex items-center gap-3">
            <FileText className="h-5 w-5" />
            <div className="text-left">
              <div className="font-medium">View Reports</div>
              <div className="text-xs">Incident history</div>
            </div>
          </div>
        </Button>
      </div>

      {/* Recent Activity & Alerts */}
      <div className="grid gap-6 md:grid-cols-2">
        <Card className="border-[#CD9BD2]/20">
          <CardHeader>
            <CardTitle className="text-[#212121]">Priority Actions</CardTitle>
            <CardDescription>Items requiring immediate attention</CardDescription>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="flex items-center gap-3 p-3 bg-amber-50 rounded-lg border border-amber-200">
              <AlertTriangle className="h-5 w-5 text-amber-600" />
              <div className="flex-1">
                <h4 className="font-medium text-amber-800">CPR Certification Expiring</h4>
                <p className="text-sm text-amber-600">Expires May 12, 2025 (14 days)</p>
              </div>
              <Button size="sm" variant="outline" className="border-amber-300 text-amber-700 bg-transparent">
                Renew
              </Button>
            </div>

            <div className="flex items-center gap-3 p-3 bg-red-50 rounded-lg border border-red-200">
              <FileText className="h-5 w-5 text-red-600" />
              <div className="flex-1">
                <h4 className="font-medium text-red-800">Missing Reference Letters</h4>
                <p className="text-sm text-red-600">Required for onboarding completion</p>
              </div>
              <Button size="sm" variant="outline" className="border-red-300 text-red-700 bg-transparent">
                Upload
              </Button>
            </div>

            <div className="flex items-center gap-3 p-3 bg-blue-50 rounded-lg border border-blue-200">
              <Clock className="h-5 w-5 text-blue-600" />
              <div className="flex-1">
                <h4 className="font-medium text-blue-800">Annual Training Due</h4>
                <p className="text-sm text-blue-600">Mandated Reporter renewal</p>
              </div>
              <Button size="sm" variant="outline" className="border-blue-300 text-blue-700 bg-transparent">
                Start
              </Button>
            </div>
          </CardContent>
        </Card>

        <Card className="border-[#CD9BD2]/20">
          <CardHeader>
            <CardTitle className="text-[#212121]">Recent Activity</CardTitle>
            <CardDescription>Your latest compliance actions</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              <div className="flex items-center gap-4 p-2 rounded-lg hover:bg-gray-50">
                <div className="h-8 w-8 rounded-full bg-green-100 flex items-center justify-center">
                  <CheckCircle2 className="h-4 w-4 text-green-600" />
                </div>
                <div className="flex-1">
                  <p className="text-sm font-medium text-[#212121]">SIDS Training Certificate uploaded</p>
                  <p className="text-xs text-gray-500">2 hours ago</p>
                </div>
              </div>

              <div className="flex items-center gap-4 p-2 rounded-lg hover:bg-gray-50">
                <div className="h-8 w-8 rounded-full bg-blue-100 flex items-center justify-center">
                  <FileText className="h-4 w-4 text-blue-600" />
                </div>
                <div className="flex-1">
                  <p className="text-sm font-medium text-[#212121]">Medical Report (CFS 602) submitted</p>
                  <p className="text-xs text-gray-500">Yesterday at 3:30 PM</p>
                </div>
              </div>

              <div className="flex items-center gap-4 p-2 rounded-lg hover:bg-gray-50">
                <div className="h-8 w-8 rounded-full bg-purple-100 flex items-center justify-center">
                  <Award className="h-4 w-4 text-purple-600" />
                </div>
                <div className="flex-1">
                  <p className="text-sm font-medium text-[#212121]">First Aid certification renewed</p>
                  <p className="text-xs text-gray-500">Apr 20, 2025</p>
                </div>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  )
}
