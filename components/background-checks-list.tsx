"use client"

import { Card, CardContent } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import { Avatar, AvatarFallback } from "@/components/ui/avatar"
import { MoreHorizontal, CheckCircle2, AlertTriangle, Clock, Fingerprint } from "lucide-react"
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu"

export default function BackgroundChecksList() {
  const backgroundChecks = [
    {
      name: "Sarah Miller",
      position: "Lead Teacher",
      status: "complete",
      tcn: "TCN-2025-04-001",
      submissionDate: "Mar 15, 2025",
      completionDate: "Mar 22, 2025",
      initials: "SM",
    },
    {
      name: "John Davis",
      position: "Assistant Teacher",
      status: "complete",
      tcn: "TCN-2025-04-002",
      submissionDate: "Mar 18, 2025",
      completionDate: "Mar 25, 2025",
      initials: "JD",
    },
    {
      name: "Maria Johnson",
      position: "Center Director",
      status: "complete",
      tcn: "TCN-2025-03-015",
      submissionDate: "Mar 05, 2025",
      completionDate: "Mar 12, 2025",
      initials: "MJ",
    },
    {
      name: "David Smith",
      position: "Teacher",
      status: "pending",
      tcn: "TCN-2025-04-010",
      submissionDate: "Apr 15, 2025",
      completionDate: "",
      initials: "DS",
    },
    {
      name: "Lisa Wong",
      position: "Assistant Teacher",
      status: "delayed",
      tcn: "TCN-2025-04-005",
      submissionDate: "Apr 05, 2025",
      completionDate: "",
      initials: "LW",
    },
  ]

  const getStatusIcon = (status: string) => {
    switch (status) {
      case "complete":
        return <CheckCircle2 className="h-4 w-4 text-green-500" />
      case "pending":
        return <Clock className="h-4 w-4 text-amber-500" />
      case "delayed":
        return <AlertTriangle className="h-4 w-4 text-red-500" />
      default:
        return null
    }
  }

  const getStatusBadge = (status: string) => {
    switch (status) {
      case "complete":
        return <Badge className="bg-green-100 text-green-800">Complete</Badge>
      case "pending":
        return <Badge className="bg-amber-100 text-amber-800">In Progress</Badge>
      case "delayed":
        return <Badge className="bg-red-100 text-red-800">Delayed</Badge>
      default:
        return null
    }
  }

  return (
    <div className="grid gap-4">
      {backgroundChecks.map((check, index) => (
        <Card key={index} className="overflow-hidden">
          <CardContent className="p-6">
            <div className="flex flex-col lg:flex-row lg:items-center justify-between gap-4">
              <div className="flex items-center gap-4">
                <Avatar className="h-10 w-10">
                  <AvatarFallback>{check.initials}</AvatarFallback>
                </Avatar>
                <div
                  className="cursor-pointer hover:text-[#BC4E82] transition-colors"
                  onClick={() => {
                    // Navigate to staff detail page
                    console.log(`Viewing details for ${check.name}`)
                    // In real app: router.push(`/staff/${check.id}`)
                  }}
                >
                  <h3 className="font-medium hover:underline">{check.name}</h3>
                  <p className="text-sm text-muted-foreground">{check.position}</p>
                </div>
              </div>

              <div className="flex flex-col sm:flex-row items-start sm:items-center gap-4 mt-4 lg:mt-0">
                <div className="flex items-center gap-2">
                  <Fingerprint className="h-4 w-4 text-muted-foreground" />
                  <span className="text-sm font-medium">{check.tcn}</span>
                </div>

                <div className="flex items-center gap-2">
                  {getStatusIcon(check.status)}
                  {getStatusBadge(check.status)}
                </div>

                <div className="flex flex-col text-sm">
                  <div className="flex items-center gap-1">
                    <span className="text-muted-foreground">Submitted:</span>
                    <span>{check.submissionDate}</span>
                  </div>
                  {check.completionDate && (
                    <div className="flex items-center gap-1">
                      <span className="text-muted-foreground">Completed:</span>
                      <span>{check.completionDate}</span>
                    </div>
                  )}
                </div>

                <DropdownMenu>
                  <DropdownMenuTrigger asChild>
                    <Button variant="ghost" size="icon" className="ml-auto">
                      <MoreHorizontal className="h-4 w-4" />
                    </Button>
                  </DropdownMenuTrigger>
                  <DropdownMenuContent align="end">
                    <DropdownMenuLabel>Actions</DropdownMenuLabel>
                    <DropdownMenuSeparator />
                    <DropdownMenuItem>View Details</DropdownMenuItem>
                    <DropdownMenuItem>Check Status</DropdownMenuItem>
                    <DropdownMenuItem>Send Inquiry</DropdownMenuItem>
                    <DropdownMenuItem>Download Report</DropdownMenuItem>
                  </DropdownMenuContent>
                </DropdownMenu>
              </div>
            </div>
          </CardContent>
        </Card>
      ))}
    </div>
  )
}
