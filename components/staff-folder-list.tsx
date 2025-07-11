"use client"

import { Card, CardContent } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import { Avatar, AvatarFallback } from "@/components/ui/avatar"
import { Download, Share2, MoreHorizontal, CheckCircle2, AlertTriangle, XCircle, FileText } from "lucide-react"
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu"

export default function StaffFolderList() {
  const staffFolders = [
    {
      name: "Sarah Miller",
      position: "Lead Teacher",
      status: "complete",
      lastUpdated: "Today at 10:23 AM",
      documents: 12,
      initials: "SM",
    },
    {
      name: "John Davis",
      position: "Assistant Teacher",
      status: "complete",
      lastUpdated: "Yesterday at 3:45 PM",
      documents: 10,
      initials: "JD",
    },
    {
      name: "Maria Johnson",
      position: "Center Director",
      status: "warning",
      lastUpdated: "Apr 22, 2025",
      documents: 15,
      initials: "MJ",
    },
    {
      name: "David Smith",
      position: "Teacher",
      status: "incomplete",
      lastUpdated: "Apr 20, 2025",
      documents: 8,
      initials: "DS",
    },
    {
      name: "Lisa Wong",
      position: "Assistant Teacher",
      status: "complete",
      lastUpdated: "Apr 19, 2025",
      documents: 11,
      initials: "LW",
    },
  ]

  const getStatusIcon = (status: string) => {
    switch (status) {
      case "complete":
        return <CheckCircle2 className="h-4 w-4 text-green-500" />
      case "warning":
        return <AlertTriangle className="h-4 w-4 text-amber-500" />
      case "incomplete":
        return <XCircle className="h-4 w-4 text-red-500" />
      default:
        return null
    }
  }

  const getStatusText = (status: string) => {
    switch (status) {
      case "complete":
        return "Complete"
      case "warning":
        return "Needs Attention"
      case "incomplete":
        return "Incomplete"
      default:
        return ""
    }
  }

  const getStatusColor = (status: string) => {
    switch (status) {
      case "complete":
        return "bg-green-100 text-green-800 hover:bg-green-100"
      case "warning":
        return "bg-amber-100 text-amber-800 hover:bg-amber-100"
      case "incomplete":
        return "bg-red-100 text-red-800 hover:bg-red-100"
      default:
        return ""
    }
  }

  return (
    <div className="grid gap-4">
      {staffFolders.map((folder, index) => (
        <Card key={index} className="overflow-hidden">
          <CardContent className="p-0">
            <div className="flex flex-col sm:flex-row sm:items-center justify-between p-6">
              <div className="flex items-center gap-4 mb-4 sm:mb-0">
                <Avatar className="h-10 w-10">
                  <AvatarFallback>{folder.initials}</AvatarFallback>
                </Avatar>
                <div
                  className="cursor-pointer hover:text-[#BC4E82] transition-colors"
                  onClick={() => {
                    // Navigate to staff detail page
                    console.log(`Viewing details for ${folder.name}`)
                    // In real app: router.push(`/staff/${folder.id}`)
                  }}
                >
                  <h3 className="font-medium hover:underline">{folder.name}</h3>
                  <p className="text-sm text-muted-foreground">{folder.position}</p>
                </div>
              </div>

              <div className="flex flex-wrap items-center gap-2 sm:gap-4">
                <Badge variant="outline" className={getStatusColor(folder.status)}>
                  <span className="flex items-center gap-1">
                    {getStatusIcon(folder.status)}
                    {getStatusText(folder.status)}
                  </span>
                </Badge>

                <div className="flex items-center text-sm text-muted-foreground">
                  <FileText className="h-4 w-4 mr-1" />
                  {folder.documents} docs
                </div>

                <div className="hidden sm:block text-sm text-muted-foreground">Updated {folder.lastUpdated}</div>

                <div className="flex items-center gap-1 ml-auto">
                  <Button variant="ghost" size="icon">
                    <Download className="h-4 w-4" />
                  </Button>
                  <Button variant="ghost" size="icon">
                    <Share2 className="h-4 w-4" />
                  </Button>
                  <DropdownMenu>
                    <DropdownMenuTrigger asChild>
                      <Button variant="ghost" size="icon">
                        <MoreHorizontal className="h-4 w-4" />
                      </Button>
                    </DropdownMenuTrigger>
                    <DropdownMenuContent align="end">
                      <DropdownMenuLabel>Actions</DropdownMenuLabel>
                      <DropdownMenuSeparator />
                      <DropdownMenuItem>View Details</DropdownMenuItem>
                      <DropdownMenuItem>Edit Folder</DropdownMenuItem>
                      <DropdownMenuItem>Run Legibility Check</DropdownMenuItem>
                      <DropdownMenuItem>Archive</DropdownMenuItem>
                    </DropdownMenuContent>
                  </DropdownMenu>
                </div>
              </div>
            </div>
          </CardContent>
        </Card>
      ))}
    </div>
  )
}
