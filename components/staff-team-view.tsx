"use client"

import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Avatar, AvatarFallback } from "@/components/ui/avatar"
import { Shield, User, Mail, Phone } from "lucide-react"

export default function StaffTeamView() {
  const teamMembers = [
    {
      name: "Jane Smith",
      email: "jane.smith@kemitacademy.com",
      role: "admin",
      title: "Center Director",
      phone: "(555) 123-4567",
      initials: "JS",
    },
    {
      name: "Sarah Miller",
      email: "sarah.miller@kemitacademy.com",
      role: "staff",
      title: "Lead Teacher",
      phone: "(555) 234-5678",
      initials: "SM",
      isMe: true,
    },
    {
      name: "John Davis",
      email: "john.davis@kemitacademy.com",
      role: "staff",
      title: "Assistant Teacher",
      phone: "(555) 345-6789",
      initials: "JD",
    },
    {
      name: "Maria Johnson",
      email: "maria.johnson@kemitacademy.com",
      role: "staff",
      title: "Teacher",
      phone: "(555) 456-7890",
      initials: "MJ",
    },
    {
      name: "David Smith",
      email: "david.smith@kemitacademy.com",
      role: "staff",
      title: "Teacher",
      phone: "(555) 567-8901",
      initials: "DS",
    },
  ]

  const getRoleIcon = (role: string) => {
    return role === "admin" ? <Shield className="h-4 w-4" /> : <User className="h-4 w-4" />
  }

  const getRoleBadge = (role: string) => {
    return role === "admin" ? (
      <Badge className="bg-gradient-to-r from-[#F4A2B9] to-[#CD9BD2] text-white">Administrator</Badge>
    ) : (
      <Badge className="bg-gradient-to-r from-[#8E94DC] to-[#505691] text-white">Staff Member</Badge>
    )
  }

  return (
    <Card className="border-[#CD9BD2]/20">
      <CardHeader>
        <CardTitle className="text-[#212121]">Team Directory</CardTitle>
        <CardDescription className="text-gray-600">
          View your team members and their contact information
        </CardDescription>
      </CardHeader>
      <CardContent>
        <div className="space-y-4">
          {teamMembers.map((member, index) => (
            <Card
              key={index}
              className={`border-gray-200 ${member.isMe ? "ring-2 ring-[#CD9BD2] bg-gradient-to-r from-[#F4A2B9]/5 to-[#CD9BD2]/5" : ""}`}
            >
              <CardContent className="p-4">
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-3">
                    <Avatar className="h-10 w-10">
                      <AvatarFallback className="bg-gradient-to-r from-[#F4A2B9] to-[#CD9BD2] text-white">
                        {member.initials}
                      </AvatarFallback>
                    </Avatar>
                    <div>
                      <div className="flex items-center gap-2">
                        <h4 className="font-medium text-[#212121]">
                          {member.name} {member.isMe && <span className="text-sm text-[#BC4E82]">(You)</span>}
                        </h4>
                        {getRoleBadge(member.role)}
                      </div>
                      <p className="text-sm text-gray-600">{member.title}</p>
                      <div className="flex items-center gap-4 mt-2 text-xs text-gray-500">
                        <div className="flex items-center gap-1">
                          <Mail className="h-3 w-3" />
                          {member.email}
                        </div>
                        <div className="flex items-center gap-1">
                          <Phone className="h-3 w-3" />
                          {member.phone}
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </CardContent>
            </Card>
          ))}
        </div>

        <div className="mt-6 p-4 bg-gradient-to-r from-[#FEBC89]/10 to-[#CD9BD2]/10 rounded-lg border border-[#CD9BD2]/20">
          <h4 className="font-medium text-[#212121] mb-2">Need to update team information?</h4>
          <p className="text-sm text-gray-600">
            Contact your administrator to add new team members or update contact information.
          </p>
        </div>
      </CardContent>
    </Card>
  )
}
