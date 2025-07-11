"use client"

import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Progress } from "@/components/ui/progress"
import { TrendingUp, TrendingDown, Users, FileCheck, Clock, AlertTriangle } from "lucide-react"

export default function InteractiveCharts() {
  const complianceData = [
    { month: "Jan", percentage: 85 },
    { month: "Feb", percentage: 88 },
    { month: "Mar", percentage: 92 },
    { month: "Apr", percentage: 96 },
  ]

  const staffMetrics = [
    { category: "Fully Compliant", count: 24, percentage: 86, color: "from-[#F4A2B9] to-[#CD9BD2]" },
    { category: "Missing 1 Item", count: 3, percentage: 11, color: "from-[#FEBC89] to-[#FDD683]" },
    { category: "Missing 2+ Items", count: 1, percentage: 3, color: "from-[#BC4E82] to-[#505691]" },
  ]

  return (
    <div className="space-y-6">
      <div className="grid gap-6 md:grid-cols-2">
        <Card className="border-[#CD9BD2]/20">
          <CardHeader>
            <CardTitle className="text-[#212121]">Compliance Trends</CardTitle>
            <CardDescription className="text-gray-600">Monthly compliance percentage over time</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              {complianceData.map((data, index) => (
                <div key={data.month} className="space-y-2">
                  <div className="flex items-center justify-between text-sm">
                    <span className="text-gray-700">{data.month} 2025</span>
                    <div className="flex items-center gap-2">
                      <span className="font-medium text-[#212121]">{data.percentage}%</span>
                      {index > 0 && data.percentage > complianceData[index - 1].percentage ? (
                        <TrendingUp className="h-3 w-3 text-green-600" />
                      ) : index > 0 ? (
                        <TrendingDown className="h-3 w-3 text-red-600" />
                      ) : null}
                    </div>
                  </div>
                  <Progress value={data.percentage} className="h-2 bg-gray-200">
                    <div
                      className="h-full bg-gradient-to-r from-[#F4A2B9] to-[#CD9BD2] rounded-full transition-all duration-500"
                      style={{ width: `${data.percentage}%` }}
                    />
                  </Progress>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>

        <Card className="border-[#CD9BD2]/20">
          <CardHeader>
            <CardTitle className="text-[#212121]">Staff Compliance Breakdown</CardTitle>
            <CardDescription className="text-gray-600">Current status of all staff members</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              {staffMetrics.map((metric) => (
                <div key={metric.category} className="space-y-2">
                  <div className="flex items-center justify-between text-sm">
                    <span className="text-gray-700">{metric.category}</span>
                    <div className="flex items-center gap-2">
                      <span className="font-medium text-[#212121]">{metric.count} staff</span>
                      <span className="text-xs text-gray-600">({metric.percentage}%)</span>
                    </div>
                  </div>
                  <Progress value={metric.percentage} className="h-2 bg-gray-200">
                    <div
                      className={`h-full bg-gradient-to-r ${metric.color} rounded-full transition-all duration-500`}
                      style={{ width: `${metric.percentage}%` }}
                    />
                  </Progress>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>
      </div>

      <div className="grid gap-6 md:grid-cols-4">
        <Card className="border-[#CD9BD2]/20 hover:shadow-lg transition-shadow">
          <CardContent className="p-6 text-center">
            <div className="h-12 w-12 rounded-full bg-gradient-to-r from-[#F4A2B9] to-[#CD9BD2] flex items-center justify-center mx-auto mb-3">
              <Users className="h-6 w-6 text-white" />
            </div>
            <div className="text-2xl font-bold text-[#212121]">28</div>
            <p className="text-sm text-gray-600">Total Staff</p>
          </CardContent>
        </Card>

        <Card className="border-[#CD9BD2]/20 hover:shadow-lg transition-shadow">
          <CardContent className="p-6 text-center">
            <div className="h-12 w-12 rounded-full bg-gradient-to-r from-[#FEBC89] to-[#FDD683] flex items-center justify-center mx-auto mb-3">
              <FileCheck className="h-6 w-6 text-white" />
            </div>
            <div className="text-2xl font-bold text-[#212121]">24</div>
            <p className="text-sm text-gray-600">Fully Compliant</p>
          </CardContent>
        </Card>

        <Card className="border-[#CD9BD2]/20 hover:shadow-lg transition-shadow">
          <CardContent className="p-6 text-center">
            <div className="h-12 w-12 rounded-full bg-gradient-to-r from-[#8E94DC] to-[#505691] flex items-center justify-center mx-auto mb-3">
              <Clock className="h-6 w-6 text-white" />
            </div>
            <div className="text-2xl font-bold text-[#212121]">4</div>
            <p className="text-sm text-gray-600">Expiring Soon</p>
          </CardContent>
        </Card>

        <Card className="border-[#CD9BD2]/20 hover:shadow-lg transition-shadow">
          <CardContent className="p-6 text-center">
            <div className="h-12 w-12 rounded-full bg-gradient-to-r from-[#BC4E82] to-[#505691] flex items-center justify-center mx-auto mb-3">
              <AlertTriangle className="h-6 w-6 text-white" />
            </div>
            <div className="text-2xl font-bold text-[#212121]">3</div>
            <p className="text-sm text-gray-600">Need Attention</p>
          </CardContent>
        </Card>
      </div>
    </div>
  )
}
