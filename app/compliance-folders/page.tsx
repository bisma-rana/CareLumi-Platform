"use client"

import { useEffect, useState } from "react"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Input } from "@/components/ui/input"
import { FolderPlus, Search, Filter, Download } from "lucide-react"
import FolderGenerator from "@/components/folder-generator"
import StaffFolderList from "@/components/staff-folder-list"
import MyComplianceFolder from "@/components/my-compliance-folder"

export default function ComplianceFoldersPage() {
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

  // Staff view - only their own folder
  if (userRole === "staff") {
    return (
      <div className="flex-1 space-y-4 p-6">
        <div className="flex items-center justify-between">
          <h2 className="text-3xl font-bold tracking-tight text-[#212121]">My Compliance Folder</h2>
          <Button className="bg-gradient-to-r from-[#F4A2B9] to-[#CD9BD2] hover:from-[#F4A2B9]/90 hover:to-[#CD9BD2]/90 text-white">
            <Download className="mr-2 h-4 w-4" />
            Download My Folder
          </Button>
        </div>
        <MyComplianceFolder />
      </div>
    )
  }

  // Admin view - all folders
  return (
    <div className="flex-1 space-y-4 p-6">
      <div className="flex items-center justify-between">
        <h2 className="text-3xl font-bold tracking-tight text-[#212121]">Compliance Folders</h2>
        <div className="flex items-center gap-3">
          <Button
            variant="outline"
            className="border-[#CD9BD2] text-[#BC4E82] hover:bg-[#CD9BD2]/10 bg-transparent"
            onClick={() => {
              // Generate missing credentials report
              const missingCredentials = [
                { name: "David Smith", missing: "CPR Certification", expiry: "N/A", position: "Teacher" },
                {
                  name: "Maria Johnson",
                  missing: "First Aid Training",
                  expiry: "2025-05-12",
                  position: "Center Director",
                },
                { name: "Lisa Wong", missing: "SIDS Training", expiry: "2025-06-01", position: "Assistant Teacher" },
              ]

              const csvContent =
                "data:text/csv;charset=utf-8," +
                "Staff Name,Position,Missing Credential,Expiry Date\n" +
                missingCredentials
                  .map((item) => `${item.name},${item.position},${item.missing},${item.expiry}`)
                  .join("\n")

              const encodedUri = encodeURI(csvContent)
              const link = document.createElement("a")
              link.setAttribute("href", encodedUri)
              link.setAttribute("download", "missing_credentials_report.csv")
              document.body.appendChild(link)
              link.click()
              document.body.removeChild(link)
            }}
          >
            <Download className="mr-2 h-4 w-4" />
            Export Missing Credentials
          </Button>
          <Button className="bg-gradient-to-r from-[#F4A2B9] to-[#CD9BD2] hover:from-[#F4A2B9]/90 hover:to-[#CD9BD2]/90 text-white">
            <FolderPlus className="mr-2 h-4 w-4" />
            New Folder
          </Button>
        </div>
      </div>

      <div className="flex items-center space-x-2">
        <div className="relative flex-1">
          <Search className="absolute left-2.5 top-2.5 h-4 w-4 text-muted-foreground" />
          <Input type="search" placeholder="Search folders or staff..." className="pl-8" />
        </div>
        <Button variant="outline" size="icon">
          <Filter className="h-4 w-4" />
        </Button>
      </div>

      <Tabs defaultValue="all" className="space-y-4">
        <TabsList>
          <TabsTrigger value="all">All Folders</TabsTrigger>
          <TabsTrigger value="complete">Complete</TabsTrigger>
          <TabsTrigger value="incomplete">Incomplete</TabsTrigger>
          <TabsTrigger value="generator">Folder Generator</TabsTrigger>
        </TabsList>

        <TabsContent value="all" className="space-y-4">
          <StaffFolderList />
        </TabsContent>

        <TabsContent value="complete" className="space-y-4">
          <Card>
            <CardHeader>
              <CardTitle>Complete Folders</CardTitle>
              <CardDescription>Staff folders with all required documentation</CardDescription>
            </CardHeader>
            <CardContent>
              <p>This tab would display only the complete staff folders ready for DCFS submission.</p>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="incomplete" className="space-y-4">
          <Card>
            <CardHeader>
              <CardTitle>Incomplete Folders</CardTitle>
              <CardDescription>Staff folders missing required documentation</CardDescription>
            </CardHeader>
            <CardContent>
              <p>This tab would display staff folders with missing or incomplete documentation.</p>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="generator" className="space-y-4">
          <FolderGenerator />
        </TabsContent>
      </Tabs>
    </div>
  )
}
