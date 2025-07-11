"use client"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Switch } from "@/components/ui/switch"
import { Badge } from "@/components/ui/badge"
import { Avatar, AvatarFallback } from "@/components/ui/avatar"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog"
import { UserPlus, Mail, MoreHorizontal, Shield, User, Trash2 } from "lucide-react"
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu"

export default function TeamManagement() {
  const [isInviteDialogOpen, setIsInviteDialogOpen] = useState(false)
  const [inviteForm, setInviteForm] = useState({
    email: "",
    role: "",
    isNewHire: false,
  })

  const teamMembers = [
    {
      id: 1,
      name: "Sarah Miller",
      email: "sarah.miller@kemitacademy.com",
      role: "Lead Teacher",
      status: "Active",
      joinDate: "2023-01-15",
      isNewHire: false,
    },
    {
      id: 2,
      name: "John Davis",
      email: "john.davis@kemitacademy.com",
      role: "Assistant Teacher",
      status: "Active",
      joinDate: "2023-03-20",
      isNewHire: false,
    },
    {
      id: 3,
      name: "Maria Johnson",
      email: "maria.johnson@kemitacademy.com",
      role: "Center Director",
      status: "Active",
      joinDate: "2022-08-10",
      isNewHire: false,
    },
    {
      id: 4,
      name: "Emily Chen",
      email: "emily.chen@kemitacademy.com",
      role: "Teacher",
      status: "Pending",
      joinDate: "2025-01-20",
      isNewHire: true,
    },
  ]

  const roles = [
    "Teacher",
    "Assistant Teacher",
    "Lead Teacher",
    "Substitute Teacher",
    "Teacher Aide",
    "Cook/Kitchen Staff",
    "Maintenance Staff",
    "Administrative Assistant",
    "Other",
  ]

  const handleInvite = () => {
    // Handle invitation logic here
    console.log("Inviting:", inviteForm)
    setIsInviteDialogOpen(false)
    setInviteForm({ email: "", role: "", isNewHire: false })
  }

  const getStatusBadge = (status: string) => {
    switch (status) {
      case "Active":
        return <Badge className="bg-green-100 text-green-800">Active</Badge>
      case "Pending":
        return <Badge className="bg-yellow-100 text-yellow-800">Pending</Badge>
      case "Inactive":
        return <Badge className="bg-gray-100 text-gray-800">Inactive</Badge>
      default:
        return <Badge>{status}</Badge>
    }
  }

  return (
    <div className="space-y-6">
      <Card>
        <CardHeader>
          <div className="flex items-center justify-between">
            <div>
              <CardTitle>Team Management</CardTitle>
              <CardDescription>Manage your team members and their access permissions</CardDescription>
            </div>
            <Dialog open={isInviteDialogOpen} onOpenChange={setIsInviteDialogOpen}>
              <DialogTrigger asChild>
                <Button className="bg-gradient-to-r from-[#F4A2B9] to-[#CD9BD2] hover:from-[#F4A2B9]/90 hover:to-[#CD9BD2]/90 text-white">
                  <UserPlus className="mr-2 h-4 w-4" />
                  Add Team Member
                </Button>
              </DialogTrigger>
              <DialogContent className="sm:max-w-[425px]">
                <DialogHeader>
                  <DialogTitle>Add New Team Member</DialogTitle>
                  <DialogDescription>
                    Send an invitation to a new team member. They'll receive an email with instructions to join.
                  </DialogDescription>
                </DialogHeader>
                <div className="grid gap-4 py-4">
                  <div className="space-y-2">
                    <Label htmlFor="email">Email Address</Label>
                    <Input
                      id="email"
                      type="email"
                      placeholder="Enter email address"
                      value={inviteForm.email}
                      onChange={(e) => setInviteForm({ ...inviteForm, email: e.target.value })}
                    />
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="role">Role/Title</Label>
                    <Select
                      value={inviteForm.role}
                      onValueChange={(value) => setInviteForm({ ...inviteForm, role: value })}
                    >
                      <SelectTrigger>
                        <SelectValue placeholder="Select a role" />
                      </SelectTrigger>
                      <SelectContent>
                        {roles.map((role) => (
                          <SelectItem key={role} value={role}>
                            {role}
                          </SelectItem>
                        ))}
                      </SelectContent>
                    </Select>
                  </div>
                  <div className="flex items-center space-x-2">
                    <Switch
                      id="new-hire"
                      checked={inviteForm.isNewHire}
                      onCheckedChange={(checked) => setInviteForm({ ...inviteForm, isNewHire: checked })}
                    />
                    <Label htmlFor="new-hire">New Hire</Label>
                  </div>
                  {inviteForm.isNewHire && (
                    <div className="bg-blue-50 border border-blue-200 rounded-lg p-3">
                      <p className="text-sm text-blue-800">
                        <strong>New Hire Onboarding:</strong> This person will receive additional onboarding materials
                        including:
                      </p>
                      <ul className="text-sm text-blue-700 mt-2 list-disc list-inside">
                        <li>New staff onboarding checklist</li>
                        <li>Required compliance documents</li>
                        <li>Medical report forms</li>
                        <li>Scanner app download link</li>
                      </ul>
                    </div>
                  )}
                </div>
                <DialogFooter>
                  <Button variant="outline" onClick={() => setIsInviteDialogOpen(false)}>
                    Cancel
                  </Button>
                  <Button
                    onClick={handleInvite}
                    className="bg-gradient-to-r from-[#F4A2B9] to-[#CD9BD2] hover:from-[#F4A2B9]/90 hover:to-[#CD9BD2]/90 text-white"
                  >
                    Send Invitation
                  </Button>
                </DialogFooter>
              </DialogContent>
            </Dialog>
          </div>
        </CardHeader>
        <CardContent>
          <Tabs defaultValue="members" className="space-y-4">
            <TabsList>
              <TabsTrigger value="members">Team Members</TabsTrigger>
              <TabsTrigger value="permissions">Permissions</TabsTrigger>
              <TabsTrigger value="invitations">Pending Invitations</TabsTrigger>
            </TabsList>

            <TabsContent value="members" className="space-y-4">
              <div className="space-y-4">
                {teamMembers.map((member) => (
                  <div key={member.id} className="flex items-center justify-between p-4 border rounded-lg">
                    <div className="flex items-center gap-4">
                      <Avatar>
                        <AvatarFallback>
                          {member.name
                            .split(" ")
                            .map((n) => n[0])
                            .join("")}
                        </AvatarFallback>
                      </Avatar>
                      <div>
                        <h4 className="font-medium">{member.name}</h4>
                        <p className="text-sm text-gray-600">{member.email}</p>
                        <div className="flex items-center gap-2 mt-1">
                          <Badge variant="outline">{member.role}</Badge>
                          {member.isNewHire && <Badge className="bg-blue-100 text-blue-800">New Hire</Badge>}
                        </div>
                      </div>
                    </div>
                    <div className="flex items-center gap-3">
                      {getStatusBadge(member.status)}
                      <DropdownMenu>
                        <DropdownMenuTrigger asChild>
                          <Button variant="ghost" size="icon">
                            <MoreHorizontal className="h-4 w-4" />
                          </Button>
                        </DropdownMenuTrigger>
                        <DropdownMenuContent align="end">
                          <DropdownMenuLabel>Actions</DropdownMenuLabel>
                          <DropdownMenuSeparator />
                          <DropdownMenuItem>
                            <User className="mr-2 h-4 w-4" />
                            View Profile
                          </DropdownMenuItem>
                          <DropdownMenuItem>
                            <Mail className="mr-2 h-4 w-4" />
                            Send Message
                          </DropdownMenuItem>
                          <DropdownMenuItem>
                            <Shield className="mr-2 h-4 w-4" />
                            Edit Permissions
                          </DropdownMenuItem>
                          <DropdownMenuSeparator />
                          <DropdownMenuItem className="text-red-600">
                            <Trash2 className="mr-2 h-4 w-4" />
                            Remove Member
                          </DropdownMenuItem>
                        </DropdownMenuContent>
                      </DropdownMenu>
                    </div>
                  </div>
                ))}
              </div>
            </TabsContent>

            <TabsContent value="permissions" className="space-y-4">
              <Card>
                <CardHeader>
                  <CardTitle>Role Permissions</CardTitle>
                  <CardDescription>Configure what each role can access and modify</CardDescription>
                </CardHeader>
                <CardContent>
                  <p className="text-gray-600">Permission management interface would be implemented here.</p>
                </CardContent>
              </Card>
            </TabsContent>

            <TabsContent value="invitations" className="space-y-4">
              <Card>
                <CardHeader>
                  <CardTitle>Pending Invitations</CardTitle>
                  <CardDescription>Manage outstanding invitations to join your team</CardDescription>
                </CardHeader>
                <CardContent>
                  <p className="text-gray-600">Pending invitations would be displayed here.</p>
                </CardContent>
              </Card>
            </TabsContent>
          </Tabs>
        </CardContent>
      </Card>
    </div>
  )
}
