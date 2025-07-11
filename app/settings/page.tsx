"use client"

import { useSearchParams } from "next/navigation"
import { useEffect, useState } from "react"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Switch } from "@/components/ui/switch"
import { Textarea } from "@/components/ui/textarea"
import { Save } from "lucide-react"
import TeamManagement from "@/components/team-management"
import StaffTeamView from "@/components/staff-team-view"

export default function SettingsPage() {
  const searchParams = useSearchParams()
  const [activeTab, setActiveTab] = useState("profile")
  const [userRole, setUserRole] = useState<string | null>(null)

  useEffect(() => {
    if (typeof window !== "undefined") {
      setUserRole(localStorage.getItem("userRole"))
    }
    const tab = searchParams.get("tab")
    if (tab) {
      setActiveTab(tab)
    }
  }, [searchParams])

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

  return (
    <div className="flex-1 space-y-4 p-6">
      <div className="flex items-center justify-between">
        <h2 className="text-3xl font-bold tracking-tight">Settings</h2>
        <Button>
          <Save className="mr-2 h-4 w-4" />
          Save Changes
        </Button>
      </div>

      <Tabs value={activeTab} onValueChange={setActiveTab} className="space-y-4">
        <TabsList>
          <TabsTrigger value="profile">Profile</TabsTrigger>
          {userRole === "admin" && <TabsTrigger value="center">Center Information</TabsTrigger>}
          <TabsTrigger value="notifications">Notifications</TabsTrigger>
          <TabsTrigger value="security">Security</TabsTrigger>
          <TabsTrigger value="team">Team</TabsTrigger>
          {userRole === "admin" && <TabsTrigger value="templates">Document Templates</TabsTrigger>}
        </TabsList>

        <TabsContent value="profile" className="space-y-4">
          <Card>
            <CardHeader>
              <CardTitle>Profile</CardTitle>
              <CardDescription>Manage your personal information</CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div className="space-y-2">
                  <Label htmlFor="name">Full Name</Label>
                  <Input
                    id="name"
                    placeholder="Your name"
                    defaultValue={userRole === "admin" ? "Jane Smith" : "Sarah Miller"}
                  />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="email">Email</Label>
                  <Input
                    id="email"
                    type="email"
                    placeholder="Your email"
                    defaultValue={userRole === "admin" ? "admin@carelumi.com" : "staff@carelumi.com"}
                  />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="phone">Phone</Label>
                  <Input id="phone" placeholder="Your phone number" defaultValue="(555) 123-4567" />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="role">Role</Label>
                  <Input
                    id="role"
                    placeholder="Your role"
                    defaultValue={userRole === "admin" ? "Center Director" : "Lead Teacher"}
                  />
                </div>
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        {userRole === "admin" && (
          <TabsContent value="center" className="space-y-4">
            <Card>
              <CardHeader>
                <CardTitle>Center Information</CardTitle>
                <CardDescription>Manage your center's details</CardDescription>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div className="space-y-2">
                    <Label htmlFor="center-name">Center Name</Label>
                    <Input id="center-name" placeholder="Center name" defaultValue="Kemit Academy" />
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="license">License Number</Label>
                    <Input id="license" placeholder="License number" defaultValue="IL-ECE-12345" />
                  </div>
                  <div className="space-y-2 md:col-span-2">
                    <Label htmlFor="address">Address</Label>
                    <Input id="address" placeholder="Center address" defaultValue="123 Main St, Chicago, IL 60601" />
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="capacity">Capacity</Label>
                    <Input id="capacity" type="number" placeholder="Center capacity" defaultValue="75" />
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="dcfs-rep">DCFS Representative</Label>
                    <Input id="dcfs-rep" placeholder="DCFS representative" defaultValue="Michael Johnson" />
                  </div>
                  <div className="space-y-2 md:col-span-2">
                    <Label htmlFor="notes">Additional Notes</Label>
                    <Textarea id="notes" placeholder="Additional notes about your center" />
                  </div>
                </div>
              </CardContent>
            </Card>
          </TabsContent>
        )}

        <TabsContent value="notifications" className="space-y-4">
          <Card>
            <CardHeader>
              <CardTitle>Notification Preferences</CardTitle>
              <CardDescription>Manage how you receive notifications</CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="space-y-4">
                <div className="flex items-center justify-between">
                  <div className="space-y-0.5">
                    <Label htmlFor="email-notifications">Email Notifications</Label>
                    <p className="text-sm text-muted-foreground">Receive notifications via email</p>
                  </div>
                  <Switch id="email-notifications" defaultChecked />
                </div>

                <div className="flex items-center justify-between">
                  <div className="space-y-0.5">
                    <Label htmlFor="sms-notifications">SMS Notifications</Label>
                    <p className="text-sm text-muted-foreground">Receive notifications via text message</p>
                  </div>
                  <Switch id="sms-notifications" />
                </div>

                <div className="flex items-center justify-between">
                  <div className="space-y-0.5">
                    <Label htmlFor="expiry-alerts">Expiry Alerts</Label>
                    <p className="text-sm text-muted-foreground">Get alerts for expiring credentials</p>
                  </div>
                  <Switch id="expiry-alerts" defaultChecked />
                </div>

                <div className="flex items-center justify-between">
                  <div className="space-y-0.5">
                    <Label htmlFor="compliance-alerts">Compliance Alerts</Label>
                    <p className="text-sm text-muted-foreground">Get alerts for compliance issues</p>
                  </div>
                  <Switch id="compliance-alerts" defaultChecked />
                </div>

                {userRole === "admin" && (
                  <div className="flex items-center justify-between">
                    <div className="space-y-0.5">
                      <Label htmlFor="background-alerts">Background Check Alerts</Label>
                      <p className="text-sm text-muted-foreground">Get alerts for background check status</p>
                    </div>
                    <Switch id="background-alerts" defaultChecked />
                  </div>
                )}
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="security" className="space-y-4">
          <Card>
            <CardHeader>
              <CardTitle>Security Settings</CardTitle>
              <CardDescription>Manage your account security</CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="space-y-4">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div className="space-y-2">
                    <Label htmlFor="current-password">Current Password</Label>
                    <Input id="current-password" type="password" />
                  </div>
                  <div className="md:col-span-2 md:w-1/2">
                    <Button variant="outline" className="w-full bg-transparent">
                      Change Password
                    </Button>
                  </div>
                </div>

                <div className="flex items-center justify-between">
                  <div className="space-y-0.5">
                    <Label htmlFor="two-factor">Two-Factor Authentication</Label>
                    <p className="text-sm text-muted-foreground">Add an extra layer of security to your account</p>
                  </div>
                  <Switch id="two-factor" />
                </div>

                <div className="flex items-center justify-between">
                  <div className="space-y-0.5">
                    <Label htmlFor="session-timeout">Session Timeout</Label>
                    <p className="text-sm text-muted-foreground">
                      Automatically log out after 30 minutes of inactivity
                    </p>
                  </div>
                  <Switch id="session-timeout" defaultChecked />
                </div>
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="team" className="space-y-4">
          {userRole === "admin" ? <TeamManagement /> : <StaffTeamView />}
        </TabsContent>

        {userRole === "admin" && (
          <TabsContent value="templates" className="space-y-4">
            <Card>
              <CardHeader>
                <CardTitle>Document Templates</CardTitle>
                <CardDescription>Manage document templates for compliance folders</CardDescription>
              </CardHeader>
              <CardContent>
                <p>
                  This tab would contain document template settings, allowing users to customize the format and
                  structure of generated compliance folders.
                </p>
              </CardContent>
            </Card>
          </TabsContent>
        )}
      </Tabs>
    </div>
  )
}
