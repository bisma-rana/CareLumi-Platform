"use client"

import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Progress } from "@/components/ui/progress"
import { Alert, AlertDescription, AlertTitle } from "@/components/ui/alert"
import { Badge } from "@/components/ui/badge"
import { Avatar, AvatarFallback } from "@/components/ui/avatar"
import { Button } from "@/components/ui/button"
import {
  AlertCircle,
  Clock,
  FileCheck,
  CheckCircle2,
  AlertTriangle,
  Upload,
  Download,
  Calendar,
  QrCode,
} from "lucide-react"

interface StaffDashboardProps {
  userName: string
}

export default function StaffDashboard({ userName }: StaffDashboardProps) {
  return (
    <div className="flex-1 space-y-6 p-6">
      <div className="flex items-center justify-between">
        <div>
          <h2 className="text-3xl font-bold tracking-tight text-[#212121]">My Dashboard</h2>
          <p className="text-gray-600">Welcome back, {userName}! Here's your compliance status.</p>
        </div>
        <div className="text-right">
          <p className="text-sm font-medium text-[#212121]">Kemit Academy</p>
          <p className="text-xs text-gray-600">Last updated: 5 min ago</p>
        </div>
      </div>

      {/* Quick Actions for Staff */}
      <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
        <Card className="border-[#CD9BD2]/20 hover:shadow-lg transition-all cursor-pointer group">
          <CardContent className="p-4 text-center">
            <div className="h-12 w-12 rounded-full bg-gradient-to-r from-[#F4A2B9] to-[#CD9BD2] flex items-center justify-center mx-auto mb-3 group-hover:scale-110 transition-transform">
              <Upload className="h-6 w-6 text-white" />
            </div>
            <h3 className="font-medium text-[#212121] mb-1">Upload Documents</h3>
            <p className="text-xs text-gray-600">Add new credentials</p>
          </CardContent>
        </Card>

        <Card className="border-[#CD9BD2]/20 hover:shadow-lg transition-all cursor-pointer group">
          <CardContent className="p-4 text-center">
            <div className="h-12 w-12 rounded-full bg-gradient-to-r from-[#FEBC89] to-[#FDD683] flex items-center justify-center mx-auto mb-3 group-hover:scale-110 transition-transform">
              <Download className="h-6 w-6 text-white" />
            </div>
            <h3 className="font-medium text-[#212121] mb-1">Download Folder</h3>
            <p className="text-xs text-gray-600">Get compliance folder</p>
          </CardContent>
        </Card>

        <Card className="border-[#CD9BD2]/20 hover:shadow-lg transition-all cursor-pointer group">
          <CardContent className="p-4 text-center">
            <div className="h-12 w-12 rounded-full bg-gradient-to-r from-[#8E94DC] to-[#505691] flex items-center justify-center mx-auto mb-3 group-hover:scale-110 transition-transform">
              <Calendar className="h-6 w-6 text-white" />
            </div>
            <h3 className="font-medium text-[#212121] mb-1">View Schedule</h3>
            <p className="text-xs text-gray-600">Upcoming deadlines</p>
          </CardContent>
        </Card>

        <Card className="border-[#CD9BD2]/20 hover:shadow-lg transition-all cursor-pointer group">
          <CardContent className="p-4 text-center">
            <div className="h-12 w-12 rounded-full bg-gradient-to-r from-[#BC4E82] to-[#505691] flex items-center justify-center mx-auto mb-3 group-hover:scale-110 transition-transform">
              <QrCode className="h-6 w-6 text-white" />
            </div>
            <h3 className="font-medium text-[#212121] mb-1">Scanner App</h3>
            <p className="text-xs text-gray-600">Download QR code</p>
          </CardContent>
        </Card>
      </div>

      {/* Staff Compliance Status */}
      <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
        <Card className="border-[#CD9BD2]/20">
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium text-[#212121]">My Compliance Status</CardTitle>
            <FileCheck className="h-4 w-4 text-[#BC4E82]" />
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              <div className="space-y-2">
                <div className="flex items-center justify-between text-sm">
                  <span className="text-gray-700">Required Documents</span>
                  <span className="font-medium text-[#212121]">11/12</span>
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
                  <span className="text-gray-700">Training Hours</span>
                  <span className="font-medium text-[#212121]">15/15</span>
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

        <Card className="border-[#CD9BD2]/20">
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium text-[#212121]">Expiring Soon</CardTitle>
            <Clock className="h-4 w-4 text-[#BC4E82]" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold text-[#212121]">1</div>
            <p className="text-xs text-gray-600">Credential expiring in 30 days</p>
            <div className="mt-4 flex items-center gap-2 text-sm">
              <span className="text-amber-600 flex items-center">
                <AlertTriangle className="h-4 w-4 mr-1" />
                CPR Certification
              </span>
            </div>
            <div className="mt-3 bg-gradient-to-r from-[#FEBC89]/20 to-[#FDD683]/20 p-2 rounded-lg">
              <p className="text-xs text-gray-700">Expires: May 12, 2025</p>
            </div>
          </CardContent>
        </Card>

        <Card className="border-[#CD9BD2]/20">
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium text-[#212121]">Document Quality</CardTitle>
            <CheckCircle2 className="h-4 w-4 text-[#BC4E82]" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold text-[#212121]">100%</div>
            <p className="text-xs text-gray-600">All documents are legible</p>
            <div className="mt-4 flex items-center gap-2 text-sm">
              <span className="text-green-600 flex items-center">
                <CheckCircle2 className="h-4 w-4 mr-1" />
                All Clear
              </span>
            </div>
            <div className="mt-3 bg-gradient-to-r from-[#F4A2B9]/20 to-[#CD9BD2]/20 p-2 rounded-lg">
              <p className="text-xs text-gray-700">Last scan: Today</p>
            </div>
          </CardContent>
        </Card>
      </div>

      {/* QR Code Scanner Section */}
      <Card className="border-[#CD9BD2]/20">
        <CardHeader>
          <CardTitle className="text-[#212121] flex items-center gap-2">
            <QrCode className="h-5 w-5" />
            Document Scanner App
          </CardTitle>
          <CardDescription className="text-gray-600">
            Download our mobile app to easily scan and upload documents
          </CardDescription>
        </CardHeader>
        <CardContent>
          <div className="flex items-center gap-6">
            <div className="h-32 w-32 bg-gray-100 rounded-lg flex items-center justify-center border-2 border-dashed border-gray-300">
              <QrCode className="h-16 w-16 text-gray-400" />
            </div>
            <div className="flex-1">
              <h4 className="font-medium text-[#212121] mb-2">Scan to Download</h4>
              <p className="text-sm text-gray-600 mb-4">
                Use your phone's camera to scan this QR code and download the CareLumi Scanner app. Upload documents
                directly from your mobile device.
              </p>
              <Button className="bg-gradient-to-r from-[#F4A2B9] to-[#CD9BD2] hover:from-[#F4A2B9]/90 hover:to-[#CD9BD2]/90 text-white">
                Download App
              </Button>
            </div>
          </div>
        </CardContent>
      </Card>

      {/* My Alerts and Recent Activity */}
      <div className="grid gap-6 md:grid-cols-2">
        <Card className="border-[#CD9BD2]/20">
          <CardHeader>
            <CardTitle className="text-[#212121]">My Notifications</CardTitle>
            <CardDescription className="text-gray-600">Issues requiring your attention</CardDescription>
          </CardHeader>
          <CardContent className="space-y-4">
            <Alert className="border-amber-200 bg-amber-50">
              <AlertTriangle className="h-4 w-4 text-amber-600" />
              <AlertTitle className="text-amber-800">CPR Certification Expiring</AlertTitle>
              <AlertDescription className="text-amber-700">
                Your CPR certification expires on May 12, 2025 (14 days).
              </AlertDescription>
            </Alert>

            <Alert className="border-blue-200 bg-blue-50">
              <AlertCircle className="h-4 w-4 text-blue-600" />
              <AlertTitle className="text-blue-800">Missing Document</AlertTitle>
              <AlertDescription className="text-blue-700">
                Please upload your updated First Aid certificate.
              </AlertDescription>
            </Alert>

            <Alert className="border-green-200 bg-green-50">
              <CheckCircle2 className="h-4 w-4 text-green-600" />
              <AlertTitle className="text-green-800">Training Complete</AlertTitle>
              <AlertDescription className="text-green-700">
                SIDS training completed successfully. Certificate uploaded.
              </AlertDescription>
            </Alert>
          </CardContent>
        </Card>

        <Card className="border-[#CD9BD2]/20">
          <CardHeader>
            <CardTitle className="text-[#212121]">My Recent Activity</CardTitle>
            <CardDescription className="text-gray-600">Your latest actions</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              <div className="flex items-center gap-4 p-2 rounded-lg hover:bg-gradient-to-r hover:from-[#F4A2B9]/10 hover:to-[#CD9BD2]/10">
                <Avatar className="h-8 w-8 ring-2 ring-[#CD9BD2]/20">
                  <AvatarFallback className="bg-gradient-to-r from-[#F4A2B9] to-[#CD9BD2] text-white text-xs">
                    SM
                  </AvatarFallback>
                </Avatar>
                <div className="space-y-1 flex-1">
                  <p className="text-sm font-medium leading-none text-[#212121]">Uploaded SIDS training certificate</p>
                  <p className="text-xs text-gray-500">2 hours ago</p>
                </div>
              </div>

              <div className="flex items-center gap-4 p-2 rounded-lg hover:bg-gradient-to-r hover:from-[#F4A2B9]/10 hover:to-[#CD9BD2]/10">
                <Avatar className="h-8 w-8 ring-2 ring-[#CD9BD2]/20">
                  <AvatarFallback className="bg-gradient-to-r from-[#F4A2B9] to-[#CD9BD2] text-white text-xs">
                    SM
                  </AvatarFallback>
                </Avatar>
                <div className="space-y-1 flex-1">
                  <p className="text-sm font-medium leading-none text-[#212121]">Updated profile information</p>
                  <p className="text-xs text-gray-500">Yesterday at 3:30 PM</p>
                </div>
              </div>

              <div className="flex items-center gap-4 p-2 rounded-lg hover:bg-gradient-to-r hover:from-[#F4A2B9]/10 hover:to-[#CD9BD2]/10">
                <Avatar className="h-8 w-8 ring-2 ring-[#CD9BD2]/20">
                  <AvatarFallback className="bg-gradient-to-r from-[#F4A2B9] to-[#CD9BD2] text-white text-xs">
                    SM
                  </AvatarFallback>
                </Avatar>
                <div className="space-y-1 flex-1">
                  <p className="text-sm font-medium leading-none text-[#212121]">Downloaded compliance folder</p>
                  <p className="text-xs text-gray-500">Apr 20, 2025</p>
                </div>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>

      {/* My Credentials Overview */}
      <Card className="border-[#CD9BD2]/20">
        <CardHeader>
          <CardTitle className="text-[#212121]">My Credentials</CardTitle>
          <CardDescription className="text-gray-600">
            Current status of your certifications and training
          </CardDescription>
        </CardHeader>
        <CardContent>
          <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
            <div className="flex items-center justify-between p-3 bg-green-50 rounded-lg border border-green-200">
              <div className="flex items-center gap-3">
                <CheckCircle2 className="h-5 w-5 text-green-600" />
                <div>
                  <h4 className="font-medium text-green-800">First Aid</h4>
                  <p className="text-sm text-green-600">Valid until Aug 10, 2025</p>
                </div>
              </div>
              <Badge className="bg-green-100 text-green-800">Valid</Badge>
            </div>

            <div className="flex items-center justify-between p-3 bg-amber-50 rounded-lg border border-amber-200">
              <div className="flex items-center gap-3">
                <AlertTriangle className="h-5 w-5 text-amber-600" />
                <div>
                  <h4 className="font-medium text-amber-800">CPR Certification</h4>
                  <p className="text-sm text-amber-600">Expires May 12, 2025</p>
                </div>
              </div>
              <Badge className="bg-amber-100 text-amber-800">Expiring</Badge>
            </div>

            <div className="flex items-center justify-between p-3 bg-green-50 rounded-lg border border-green-200">
              <div className="flex items-center gap-3">
                <CheckCircle2 className="h-5 w-5 text-green-600" />
                <div>
                  <h4 className="font-medium text-green-800">SIDS Training</h4>
                  <p className="text-sm text-green-600">Valid until Feb 14, 2026</p>
                </div>
              </div>
              <Badge className="bg-green-100 text-green-800">Valid</Badge>
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  )
}
