"use client"

import { useState } from "react"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { Input } from "@/components/ui/input"
import { Textarea } from "@/components/ui/textarea"
import {
  Search,
  Plus,
  Calendar,
  User,
  FileText,
  AlertTriangle,
  CheckCircle2,
  Clock,
  Eye,
  MessageSquare,
} from "lucide-react"
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"

export default function IncidentReports() {
  const [searchTerm, setSearchTerm] = useState("")
  const [filterStatus, setFilterStatus] = useState("all")
  const [isNewReportOpen, setIsNewReportOpen] = useState(false)

  const incidents = [
    {
      id: "INC-2025-001",
      date: "2025-04-28",
      time: "10:30 AM",
      category: "Injury",
      description: "Minor scrape on knee during playground activity",
      childName: "Emma Johnson",
      status: "closed",
      reportedBy: "Sarah Miller",
      reviewedBy: "Maria Johnson",
      followUpRequired: false,
      lastUpdated: "2025-04-29",
    },
    {
      id: "INC-2025-002",
      date: "2025-04-26",
      time: "2:15 PM",
      category: "Behavioral",
      description: "Aggressive behavior during group activity - biting incident",
      childName: "Michael Davis",
      status: "under-review",
      reportedBy: "Sarah Miller",
      reviewedBy: "Maria Johnson",
      followUpRequired: true,
      lastUpdated: "2025-04-27",
    },
    {
      id: "INC-2025-003",
      date: "2025-04-25",
      time: "11:45 AM",
      category: "Safety",
      description: "Child found outside designated play area",
      childName: "Sophia Wilson",
      status: "closed",
      reportedBy: "Sarah Miller",
      reviewedBy: "Maria Johnson",
      followUpRequired: false,
      lastUpdated: "2025-04-25",
    },
    {
      id: "INC-2025-004",
      date: "2025-04-24",
      time: "9:20 AM",
      category: "Medical",
      description: "Child complained of stomach ache, parent contacted",
      childName: "Lucas Brown",
      status: "submitted",
      reportedBy: "Sarah Miller",
      reviewedBy: "",
      followUpRequired: false,
      lastUpdated: "2025-04-24",
    },
    {
      id: "INC-2025-005",
      date: "2025-04-22",
      time: "3:45 PM",
      category: "Injury",
      description: "Bumped head on table corner during free play",
      childName: "Ava Martinez",
      status: "closed",
      reportedBy: "Sarah Miller",
      reviewedBy: "Maria Johnson",
      followUpRequired: false,
      lastUpdated: "2025-04-23",
    },
  ]

  const getStatusBadge = (status: string) => {
    switch (status) {
      case "submitted":
        return <Badge className="bg-blue-100 text-blue-800 border-blue-200">📝 Submitted</Badge>
      case "under-review":
        return <Badge className="bg-yellow-100 text-yellow-800 border-yellow-200">👀 Under Review</Badge>
      case "closed":
        return <Badge className="bg-green-100 text-green-800 border-green-200">✅ Closed</Badge>
      default:
        return <Badge className="bg-gray-100 text-gray-800 border-gray-200">❓ Unknown</Badge>
    }
  }

  const getStatusIcon = (status: string) => {
    switch (status) {
      case "submitted":
        return <FileText className="h-4 w-4 text-blue-500" />
      case "under-review":
        return <Clock className="h-4 w-4 text-yellow-500" />
      case "closed":
        return <CheckCircle2 className="h-4 w-4 text-green-500" />
      default:
        return <AlertTriangle className="h-4 w-4 text-gray-500" />
    }
  }

  const getCategoryColor = (category: string) => {
    switch (category) {
      case "Injury":
        return "bg-red-100 text-red-800 border-red-200"
      case "Behavioral":
        return "bg-orange-100 text-orange-800 border-orange-200"
      case "Safety":
        return "bg-yellow-100 text-yellow-800 border-yellow-200"
      case "Medical":
        return "bg-blue-100 text-blue-800 border-blue-200"
      default:
        return "bg-gray-100 text-gray-800 border-gray-200"
    }
  }

  const filteredIncidents = incidents.filter((incident) => {
    const matchesSearch =
      incident.description.toLowerCase().includes(searchTerm.toLowerCase()) ||
      incident.childName.toLowerCase().includes(searchTerm.toLowerCase()) ||
      incident.category.toLowerCase().includes(searchTerm.toLowerCase())

    if (filterStatus === "all") return matchesSearch
    return matchesSearch && incident.status === filterStatus
  })

  const statusCounts = {
    submitted: incidents.filter((i) => i.status === "submitted").length,
    underReview: incidents.filter((i) => i.status === "under-review").length,
    closed: incidents.filter((i) => i.status === "closed").length,
  }

  return (
    <div className="space-y-6">
      {/* Overview Cards */}
      <div className="grid gap-4 md:grid-cols-4">
        <Card className="border-blue-200 bg-blue-50">
          <CardContent className="p-4">
            <div className="flex items-center gap-2">
              <FileText className="h-5 w-5 text-blue-600" />
              <div>
                <div className="text-2xl font-bold text-blue-800">{statusCounts.submitted}</div>
                <div className="text-sm text-blue-600">Submitted</div>
              </div>
            </div>
          </CardContent>
        </Card>

        <Card className="border-yellow-200 bg-yellow-50">
          <CardContent className="p-4">
            <div className="flex items-center gap-2">
              <Clock className="h-5 w-5 text-yellow-600" />
              <div>
                <div className="text-2xl font-bold text-yellow-800">{statusCounts.underReview}</div>
                <div className="text-sm text-yellow-600">Under Review</div>
              </div>
            </div>
          </CardContent>
        </Card>

        <Card className="border-green-200 bg-green-50">
          <CardContent className="p-4">
            <div className="flex items-center gap-2">
              <CheckCircle2 className="h-5 w-5 text-green-600" />
              <div>
                <div className="text-2xl font-bold text-green-800">{statusCounts.closed}</div>
                <div className="text-sm text-green-600">Closed</div>
              </div>
            </div>
          </CardContent>
        </Card>

        <Card className="border-gray-200 bg-gray-50">
          <CardContent className="p-4">
            <div className="flex items-center gap-2">
              <MessageSquare className="h-5 w-5 text-gray-600" />
              <div>
                <div className="text-2xl font-bold text-gray-800">{incidents.length}</div>
                <div className="text-sm text-gray-600">Total Reports</div>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Main Content */}
      <Card className="border-[#CD9BD2]/20">
        <CardHeader>
          <div className="flex items-center justify-between">
            <div>
              <CardTitle className="text-[#212121]">Incident Reports</CardTitle>
              <CardDescription>View and manage incident reports you've filed or been involved in</CardDescription>
            </div>
            <Dialog open={isNewReportOpen} onOpenChange={setIsNewReportOpen}>
              <DialogTrigger asChild>
                <Button className="bg-gradient-to-r from-[#F4A2B9] to-[#CD9BD2] text-white">
                  <Plus className="h-4 w-4 mr-2" />
                  New Report
                </Button>
              </DialogTrigger>
              <DialogContent className="max-w-2xl">
                <DialogHeader>
                  <DialogTitle>Submit New Incident Report</DialogTitle>
                  <DialogDescription>
                    Fill out the details of the incident. All fields marked with * are required.
                  </DialogDescription>
                </DialogHeader>
                <div className="space-y-4">
                  <div className="grid grid-cols-2 gap-4">
                    <div>
                      <label className="text-sm font-medium">Date *</label>
                      <Input type="date" />
                    </div>
                    <div>
                      <label className="text-sm font-medium">Time *</label>
                      <Input type="time" />
                    </div>
                  </div>
                  <div>
                    <label className="text-sm font-medium">Category *</label>
                    <Select>
                      <SelectTrigger>
                        <SelectValue placeholder="Select incident category" />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="injury">Injury</SelectItem>
                        <SelectItem value="behavioral">Behavioral</SelectItem>
                        <SelectItem value="safety">Safety</SelectItem>
                        <SelectItem value="medical">Medical</SelectItem>
                        <SelectItem value="other">Other</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>
                  <div>
                    <label className="text-sm font-medium">Child Name *</label>
                    <Input placeholder="Enter child's name" />
                  </div>
                  <div>
                    <label className="text-sm font-medium">Description *</label>
                    <Textarea placeholder="Provide detailed description of the incident..." rows={4} />
                  </div>
                  <div className="flex justify-end gap-2">
                    <Button variant="outline" onClick={() => setIsNewReportOpen(false)}>
                      Cancel
                    </Button>
                    <Button className="bg-gradient-to-r from-[#F4A2B9] to-[#CD9BD2] text-white">Submit Report</Button>
                  </div>
                </div>
              </DialogContent>
            </Dialog>
          </div>
        </CardHeader>
        <CardContent>
          <div className="flex items-center gap-4 mb-6">
            <div className="relative flex-1">
              <Search className="absolute left-2.5 top-2.5 h-4 w-4 text-muted-foreground" />
              <Input
                placeholder="Search incidents..."
                className="pl-8"
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
              />
            </div>
            <div className="flex gap-2">
              <Button
                variant={filterStatus === "all" ? "default" : "outline"}
                size="sm"
                onClick={() => setFilterStatus("all")}
              >
                All
              </Button>
              <Button
                variant={filterStatus === "submitted" ? "default" : "outline"}
                size="sm"
                onClick={() => setFilterStatus("submitted")}
                className="text-blue-600 border-blue-300"
              >
                Submitted
              </Button>
              <Button
                variant={filterStatus === "under-review" ? "default" : "outline"}
                size="sm"
                onClick={() => setFilterStatus("under-review")}
                className="text-yellow-600 border-yellow-300"
              >
                Under Review
              </Button>
              <Button
                variant={filterStatus === "closed" ? "default" : "outline"}
                size="sm"
                onClick={() => setFilterStatus("closed")}
                className="text-green-600 border-green-300"
              >
                Closed
              </Button>
            </div>
          </div>

          {/* Incidents List */}
          <div className="space-y-4">
            {filteredIncidents.map((incident, index) => (
              <div key={index} className="flex items-start gap-4 p-4 bg-gray-50 rounded-lg border">
                <div className="flex-shrink-0 mt-1">{getStatusIcon(incident.status)}</div>

                <div className="flex-1">
                  <div className="flex items-start justify-between mb-2">
                    <div>
                      <div className="flex items-center gap-2 mb-1">
                        <h4 className="font-medium text-[#212121]">{incident.id}</h4>
                        <Badge className={getCategoryColor(incident.category)}>{incident.category}</Badge>
                      </div>
                      <p className="text-sm text-gray-600 mb-2">{incident.description}</p>
                    </div>
                    {getStatusBadge(incident.status)}
                  </div>

                  <div className="flex items-center gap-6 text-sm text-gray-600 mb-3">
                    <div className="flex items-center gap-1">
                      <Calendar className="h-4 w-4" />
                      {incident.date} at {incident.time}
                    </div>
                    <div className="flex items-center gap-1">
                      <User className="h-4 w-4" />
                      Child: {incident.childName}
                    </div>
                    <div className="flex items-center gap-1">
                      <FileText className="h-4 w-4" />
                      Reported by: {incident.reportedBy}
                    </div>
                    {incident.reviewedBy && (
                      <div className="flex items-center gap-1">
                        <CheckCircle2 className="h-4 w-4" />
                        Reviewed by: {incident.reviewedBy}
                      </div>
                    )}
                  </div>

                  {incident.followUpRequired && (
                    <div className="text-sm text-orange-600 bg-orange-50 p-2 rounded mb-3">⚠️ Follow-up required</div>
                  )}

                  <div className="flex items-center justify-between">
                    <div className="text-xs text-gray-500">Last updated: {incident.lastUpdated}</div>
                    <div className="flex items-center gap-2">
                      <Button size="sm" variant="outline" className="border-[#CD9BD2] text-[#BC4E82] bg-transparent">
                        <Eye className="h-4 w-4 mr-1" />
                        View Full Report
                      </Button>
                      {incident.status === "under-review" && (
                        <Button size="sm" variant="outline" className="border-blue-300 text-blue-700 bg-transparent">
                          <MessageSquare className="h-4 w-4 mr-1" />
                          Add Follow-up
                        </Button>
                      )}
                    </div>
                  </div>
                </div>
              </div>
            ))}
          </div>

          {filteredIncidents.length === 0 && (
            <div className="text-center py-8 text-gray-500">
              No incident reports found matching your search criteria.
            </div>
          )}
        </CardContent>
      </Card>
    </div>
  )
}
