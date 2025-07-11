"use client"

import { Card, CardContent } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import { Avatar, AvatarFallback } from "@/components/ui/avatar"
import { Progress } from "@/components/ui/progress"
import { MoreHorizontal, CheckCircle2, AlertTriangle, XCircle, Clock } from "lucide-react"
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu"

export default function StaffCredentialsList() {
  const staffCredentials = [
    {
      name: "Sarah Miller",
      position: "Lead Teacher",
      trainingHours: 15,
      trainingRequired: 15,
      credentials: [
        { name: "CPR Certification", status: "valid", expiry: "Jan 15, 2026" },
        { name: "First Aid", status: "valid", expiry: "Jan 15, 2026" },
        { name: "SIDS Training", status: "valid", expiry: "Mar 22, 2026" },
      ],
      initials: "SM",
    },
    {
      name: "John Davis",
      position: "Assistant Teacher",
      trainingHours: 12,
      trainingRequired: 15,
      credentials: [
        { name: "CPR Certification", status: "valid", expiry: "Aug 10, 2025" },
        { name: "First Aid", status: "valid", expiry: "Aug 10, 2025" },
        { name: "SIDS Training", status: "expiring", expiry: "May 30, 2025" },
      ],
      initials: "JD",
    },
    {
      name: "Maria Johnson",
      position: "Center Director",
      trainingHours: 15,
      trainingRequired: 15,
      credentials: [
        { name: "CPR Certification", status: "expiring", expiry: "May 12, 2025" },
        { name: "First Aid", status: "expiring", expiry: "May 12, 2025" },
        { name: "SIDS Training", status: "valid", expiry: "Nov 05, 2025" },
        { name: "Director Credential", status: "valid", expiry: "Dec 20, 2026" },
      ],
      initials: "MJ",
    },
    {
      name: "David Smith",
      position: "Teacher",
      trainingHours: 8,
      trainingRequired: 15,
      credentials: [
        { name: "CPR Certification", status: "missing", expiry: "" },
        { name: "First Aid", status: "valid", expiry: "Sep 18, 2025" },
        { name: "SIDS Training", status: "valid", expiry: "Oct 30, 2025" },
      ],
      initials: "DS",
    },
    {
      name: "Lisa Wong",
      position: "Assistant Teacher",
      trainingHours: 13,
      trainingRequired: 15,
      credentials: [
        { name: "CPR Certification", status: "valid", expiry: "Jul 25, 2025" },
        { name: "First Aid", status: "valid", expiry: "Jul 25, 2025" },
        { name: "SIDS Training", status: "valid", expiry: "Feb 14, 2026" },
      ],
      initials: "LW",
    },
  ]

  const getStatusIcon = (status: string) => {
    switch (status) {
      case "valid":
        return <CheckCircle2 className="h-4 w-4 text-green-500" />
      case "expiring":
        return <AlertTriangle className="h-4 w-4 text-amber-500" />
      case "missing":
        return <XCircle className="h-4 w-4 text-red-500" />
      default:
        return null
    }
  }

  const getStatusBadge = (status: string) => {
    switch (status) {
      case "valid":
        return <Badge className="bg-green-100 text-green-800">Valid</Badge>
      case "expiring":
        return <Badge className="bg-amber-100 text-amber-800">Expiring Soon</Badge>
      case "missing":
        return <Badge className="bg-red-100 text-red-800">Missing</Badge>
      default:
        return null
    }
  }

  return (
    <div className="grid gap-4">
      {staffCredentials.map((staff, index) => (
        <Card key={index} className="overflow-hidden">
          <CardContent className="p-6">
            <div className="flex flex-col lg:flex-row lg:items-center justify-between gap-4">
              <div className="flex items-center gap-4">
                <Avatar className="h-10 w-10">
                  <AvatarFallback>{staff.initials}</AvatarFallback>
                </Avatar>
                <div
                  className="cursor-pointer hover:text-[#BC4E82] transition-colors"
                  onClick={() => {
                    // Navigate to staff detail page
                    console.log(`Viewing details for ${staff.name}`)
                    // In real app: router.push(`/staff/${staff.id}`)
                  }}
                >
                  <h3 className="font-medium hover:underline">{staff.name}</h3>
                  <p className="text-sm text-muted-foreground">{staff.position}</p>
                </div>
              </div>

              <div className="flex flex-col sm:flex-row items-start sm:items-center gap-4 mt-4 lg:mt-0">
                <div className="space-y-1 min-w-[150px]">
                  <div className="flex items-center justify-between text-sm">
                    <span>Training Hours</span>
                    <span>
                      {staff.trainingHours}/{staff.trainingRequired}
                    </span>
                  </div>
                  <Progress value={(staff.trainingHours / staff.trainingRequired) * 100} className="h-2" />
                </div>

                <div className="flex flex-wrap gap-2">
                  {staff.credentials.map((credential, idx) => (
                    <div key={idx} className="flex items-center gap-1 text-sm border rounded-md px-2 py-1">
                      {getStatusIcon(credential.status)}
                      <span>{credential.name}</span>
                      {credential.expiry && (
                        <span className="text-xs text-muted-foreground ml-1">
                          {credential.status === "expiring" ? (
                            <span className="flex items-center">
                              <Clock className="h-3 w-3 mr-1" />
                              {credential.expiry}
                            </span>
                          ) : (
                            credential.expiry
                          )}
                        </span>
                      )}
                    </div>
                  ))}
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
                    <DropdownMenuItem>Add Credential</DropdownMenuItem>
                    <DropdownMenuItem>Update Training Hours</DropdownMenuItem>
                    <DropdownMenuItem>Send Reminder</DropdownMenuItem>
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
