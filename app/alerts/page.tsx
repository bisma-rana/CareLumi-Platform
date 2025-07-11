"use client"

import { useEffect, useState } from "react"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Input } from "@/components/ui/input"
import { Search, Filter, BellRing, AlertTriangle } from "lucide-react"
import AlertsList from "@/components/alerts-list"
import MyAlertsList from "@/components/my-alerts-list"

export default function AlertsPage() {
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

  // Staff view - only their alerts
  if (userRole === "staff") {
    return (
      <div className="flex-1 space-y-4 p-6">
        <div className="flex items-center justify-between">
          <h2 className="text-3xl font-bold tracking-tight">My Alerts & Notifications</h2>
          <Button variant="outline">
            <BellRing className="mr-2 h-4 w-4" />
            Mark All as Read
          </Button>
        </div>

        <div className="flex items-center space-x-2">
          <div className="relative flex-1">
            <Search className="absolute left-2.5 top-2.5 h-4 w-4 text-muted-foreground" />
            <Input type="search" placeholder="Search my alerts..." className="pl-8" />
          </div>
          <Button variant="outline" size="icon">
            <Filter className="h-4 w-4" />
          </Button>
        </div>

        <div className="grid gap-4 md:grid-cols-3">
          <Card>
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">Action Required</CardTitle>
              <AlertTriangle className="h-4 w-4 text-amber-500" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">2</div>
              <p className="text-xs text-muted-foreground">Items need your attention</p>
            </CardContent>
          </Card>

          <Card>
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">Expiring Soon</CardTitle>
              <AlertTriangle className="h-4 w-4 text-amber-500" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">1</div>
              <p className="text-xs text-muted-foreground">Credential expiring in 30 days</p>
            </CardContent>
          </Card>

          <Card>
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">Notifications</CardTitle>
              <BellRing className="h-4 w-4 text-muted-foreground" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">3</div>
              <p className="text-xs text-muted-foreground">General updates</p>
            </CardContent>
          </Card>
        </div>

        <Tabs defaultValue="all" className="space-y-4">
          <TabsList>
            <TabsTrigger value="all">All Alerts</TabsTrigger>
            <TabsTrigger value="action">Action Required</TabsTrigger>
            <TabsTrigger value="expiring">Expiring</TabsTrigger>
            <TabsTrigger value="info">Notifications</TabsTrigger>
          </TabsList>

          <TabsContent value="all" className="space-y-4">
            <MyAlertsList />
          </TabsContent>

          <TabsContent value="action" className="space-y-4">
            <Card>
              <CardHeader>
                <CardTitle>Action Required</CardTitle>
                <CardDescription>Items that need your immediate attention</CardDescription>
              </CardHeader>
              <CardContent>
                <p>This tab would display only alerts requiring your action.</p>
              </CardContent>
            </Card>
          </TabsContent>

          <TabsContent value="expiring" className="space-y-4">
            <Card>
              <CardHeader>
                <CardTitle>Expiring Credentials</CardTitle>
                <CardDescription>Your credentials that are expiring soon</CardDescription>
              </CardHeader>
              <CardContent>
                <p>This tab would display your expiring credentials.</p>
              </CardContent>
            </Card>
          </TabsContent>

          <TabsContent value="info" className="space-y-4">
            <Card>
              <CardHeader>
                <CardTitle>Notifications</CardTitle>
                <CardDescription>General information and updates</CardDescription>
              </CardHeader>
              <CardContent>
                <p>This tab would display general notifications for you.</p>
              </CardContent>
            </Card>
          </TabsContent>
        </Tabs>
      </div>
    )
  }

  // Admin view - all alerts
  return (
    <div className="flex-1 space-y-4 p-6">
      <div className="flex items-center justify-between">
        <h2 className="text-3xl font-bold tracking-tight">Alerts & Notifications</h2>
        <Button variant="outline">
          <BellRing className="mr-2 h-4 w-4" />
          Mark All as Read
        </Button>
      </div>

      <div className="flex items-center space-x-2">
        <div className="relative flex-1">
          <Search className="absolute left-2.5 top-2.5 h-4 w-4 text-muted-foreground" />
          <Input type="search" placeholder="Search alerts..." className="pl-8" />
        </div>
        <Button variant="outline" size="icon">
          <Filter className="h-4 w-4" />
        </Button>
      </div>

      <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Critical Alerts</CardTitle>
            <AlertTriangle className="h-4 w-4 text-red-500" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">2</div>
            <p className="text-xs text-muted-foreground">Require immediate attention</p>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Warnings</CardTitle>
            <AlertTriangle className="h-4 w-4 text-amber-500" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">5</div>
            <p className="text-xs text-muted-foreground">Require attention soon</p>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Notifications</CardTitle>
            <BellRing className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">12</div>
            <p className="text-xs text-muted-foreground">General information</p>
          </CardContent>
        </Card>
      </div>

      <Tabs defaultValue="all" className="space-y-4">
        <TabsList>
          <TabsTrigger value="all">All Alerts</TabsTrigger>
          <TabsTrigger value="critical">Critical</TabsTrigger>
          <TabsTrigger value="warnings">Warnings</TabsTrigger>
          <TabsTrigger value="info">Notifications</TabsTrigger>
        </TabsList>

        <TabsContent value="all" className="space-y-4">
          <AlertsList />
        </TabsContent>

        <TabsContent value="critical" className="space-y-4">
          <Card>
            <CardHeader>
              <CardTitle>Critical Alerts</CardTitle>
              <CardDescription>Issues requiring immediate attention</CardDescription>
            </CardHeader>
            <CardContent>
              <p>This tab would display only critical alerts that need immediate attention.</p>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="warnings" className="space-y-4">
          <Card>
            <CardHeader>
              <CardTitle>Warnings</CardTitle>
              <CardDescription>Issues requiring attention soon</CardDescription>
            </CardHeader>
            <CardContent>
              <p>This tab would display warning alerts that need attention soon.</p>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="info" className="space-y-4">
          <Card>
            <CardHeader>
              <CardTitle>Notifications</CardTitle>
              <CardDescription>General information and updates</CardDescription>
            </CardHeader>
            <CardContent>
              <p>This tab would display general information notifications.</p>
            </CardContent>
          </Card>
        </TabsContent>
      </Tabs>
    </div>
  )
}
