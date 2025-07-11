"use client"

import { useEffect, useState } from "react"
import { useSearchParams } from "next/navigation"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Input } from "@/components/ui/input"
import { UserPlus, Search, Filter, Clock, AlertTriangle, FileText } from "lucide-react"
import StaffFolderList from "@/components/staff-folder-list"
import FolderGenerator from "@/components/folder-generator"

export default function StaffCompliancePage() {
  const searchParams = useSearchParams()
  const [activeTab, setActiveTab] = useState("all")

  useEffect(() => {
    const tab = searchParams.get("tab")
    if (tab) {
      setActiveTab(tab)
    }
  }, [searchParams])

  return (
    <div className="flex-1 space-y-4 p-6">
      <div className="flex items-center justify-between">
        <h2 className="text-3xl font-bold tracking-tight text-[#212121]">Staff Compliance</h2>
        <div className="flex items-center gap-3">
          <Button className="bg-gradient-to-r from-[#F4A2B9] to-[#CD9BD2] hover:from-[#F4A2B9]/90 hover:to-[#CD9BD2]/90 text-white">
            <UserPlus className="mr-2 h-4 w-4" />
            Add New Staff
          </Button>
        </div>
      </div>

      <div className="flex items-center space-x-2">
        <div className="relative flex-1">
          <Search className="absolute left-2.5 top-2.5 h-4 w-4 text-muted-foreground" />
          <Input type="search" placeholder="Search staff members..." className="pl-8" />
        </div>
        <Button variant="outline" size="icon">
          <Filter className="h-4 w-4" />
        </Button>
      </div>

      <Tabs value={activeTab} onValueChange={setActiveTab} className="space-y-4">
        <TabsList>
          <TabsTrigger value="all">
            <FileText className="h-4 w-4 mr-2" />
            All Staff
          </TabsTrigger>
          <TabsTrigger value="training">
            <FileText className="h-4 w-4 mr-2" />
            Training
          </TabsTrigger>
          <TabsTrigger value="expiring" className="text-orange-600">
            <Clock className="h-4 w-4 mr-2" />
            Expiring
          </TabsTrigger>
          <TabsTrigger value="missing" className="text-red-600">
            <AlertTriangle className="h-4 w-4 mr-2" />
            Missing
          </TabsTrigger>
          <TabsTrigger value="documents">
            <FileText className="h-4 w-4 mr-2" />
            Add Staff Documents
          </TabsTrigger>
        </TabsList>

        <TabsContent value="all" className="space-y-4">
          <StaffFolderList />
        </TabsContent>

        <TabsContent value="training" className="space-y-4">
          <Card>
            <CardHeader>
              <CardTitle>Training Compliance</CardTitle>
              <CardDescription>Staff training requirements and completion status</CardDescription>
            </CardHeader>
            <CardContent>
              <p>This tab displays staff training compliance status and requirements.</p>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="expiring" className="space-y-4">
          <Card>
            <CardHeader>
              <CardTitle className="text-orange-600">Expiring Credentials</CardTitle>
              <CardDescription>Credentials expiring within the next 30 days</CardDescription>
            </CardHeader>
            <CardContent>
              <p>This tab shows all credentials that are expiring soon and need renewal.</p>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="missing" className="space-y-4">
          <Card>
            <CardHeader>
              <CardTitle className="text-red-600">Missing Credentials</CardTitle>
              <CardDescription>Staff members with incomplete documentation</CardDescription>
            </CardHeader>
            <CardContent>
              <p>This tab displays staff members who are missing required credentials or documents.</p>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="documents" className="space-y-4">
          <FolderGenerator />
        </TabsContent>
      </Tabs>
    </div>
  )
}
