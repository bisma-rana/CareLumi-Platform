"use client"

import { useState } from "react"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { Input } from "@/components/ui/input"
import {
  Search,
  Upload,
  ExternalLink,
  Calendar,
  AlertTriangle,
  CheckCircle2,
  Clock,
  FileText,
  Award,
  RefreshCw,
} from "lucide-react"

export default function CredentialsTracker() {
  const [searchTerm, setSearchTerm] = useState("")
  const [filterStatus, setFilterStatus] = useState("all")

  const credentials = [
    {
      name: "CDA Certificate",
      authority: "Council for Professional Recognition",
      issueDate: "Mar 15, 2022",
      expirationDate: "Mar 15, 2027",
      status: "valid",
      daysUntilExpiry: 730,
      category: "Education",
      renewalUrl: "https://cdacouncil.org/renew",
    },
    {
      name: "CPR Certification",
      authority: "American Red Cross",
      issueDate: "May 12, 2023",
      expirationDate: "May 12, 2025",
      status: "expiring",
      daysUntilExpiry: 14,
      category: "Safety",
      renewalUrl: "https://redcross.org/cpr",
    },
    {
      name: "First Aid Certificate",
      authority: "American Red Cross",
      issueDate: "Aug 10, 2023",
      expirationDate: "Aug 10, 2025",
      status: "valid",
      daysUntilExpiry: 105,
      category: "Safety",
      renewalUrl: "https://redcross.org/firstaid",
    },
    {
      name: "SIDS Training Certificate",
      authority: "Illinois Department of Children and Family Services",
      issueDate: "Feb 14, 2024",
      expirationDate: "Feb 14, 2026",
      status: "valid",
      daysUntilExpiry: 365,
      category: "Training",
      renewalUrl: "https://dcfs.illinois.gov/training",
    },
    {
      name: "Mandated Reporter Certificate",
      authority: "Illinois Department of Children and Family Services",
      issueDate: "Jan 20, 2024",
      expirationDate: "Jan 20, 2027",
      status: "valid",
      daysUntilExpiry: 1095,
      category: "Training",
      renewalUrl: "https://dcfs.illinois.gov/mandated-reporter",
    },
    {
      name: "Food Safety Training",
      authority: "ServSafe (National Restaurant Association)",
      issueDate: "",
      expirationDate: "",
      status: "missing",
      daysUntilExpiry: 0,
      category: "Safety",
      renewalUrl: "https://servsafe.com",
    },
    {
      name: "Background Check",
      authority: "Illinois State Police",
      issueDate: "Mar 15, 2023",
      expirationDate: "Mar 15, 2026",
      status: "valid",
      daysUntilExpiry: 365,
      category: "Background",
      renewalUrl: null,
    },
    {
      name: "Tuberculosis Test",
      authority: "Kemit Academy Health Services",
      issueDate: "Aug 16, 2024",
      expirationDate: "Aug 16, 2025",
      status: "expiring",
      daysUntilExpiry: 30,
      category: "Medical",
      renewalUrl: null,
    },
    {
      name: "Physical Examination",
      authority: "Dr. Smith Family Medicine",
      issueDate: "Aug 15, 2024",
      expirationDate: "Aug 15, 2025",
      status: "expiring",
      daysUntilExpiry: 29,
      category: "Medical",
      renewalUrl: null,
    },
  ]

  const getStatusBadge = (status: string, daysUntilExpiry: number) => {
    switch (status) {
      case "valid":
        if (daysUntilExpiry <= 30) {
          return <Badge className="bg-yellow-100 text-yellow-800 border-yellow-200">⚠️ Expires Soon</Badge>
        }
        return <Badge className="bg-green-100 text-green-800 border-green-200">✅ Valid</Badge>
      case "expiring":
        return <Badge className="bg-orange-100 text-orange-800 border-orange-200">🟠 Expiring</Badge>
      case "expired":
        return <Badge className="bg-red-100 text-red-800 border-red-200">🔴 Expired</Badge>
      case "missing":
        return <Badge className="bg-red-100 text-red-800 border-red-200">❌ Missing</Badge>
      default:
        return <Badge className="bg-gray-100 text-gray-800 border-gray-200">⚪ Unknown</Badge>
    }
  }

  const getStatusIcon = (status: string, daysUntilExpiry: number) => {
    if (status === "valid" && daysUntilExpiry <= 30) {
      return <AlertTriangle className="h-4 w-4 text-yellow-500" />
    }
    switch (status) {
      case "valid":
        return <CheckCircle2 className="h-4 w-4 text-green-500" />
      case "expiring":
        return <Clock className="h-4 w-4 text-orange-500" />
      case "expired":
      case "missing":
        return <AlertTriangle className="h-4 w-4 text-red-500" />
      default:
        return <FileText className="h-4 w-4 text-gray-500" />
    }
  }

  const getExpirationText = (status: string, expirationDate: string, daysUntilExpiry: number) => {
    if (status === "missing") return "Not obtained"
    if (!expirationDate) return "No expiration"

    if (daysUntilExpiry <= 0) return "Expired"
    if (daysUntilExpiry <= 7) return `Expires in ${daysUntilExpiry} days`
    if (daysUntilExpiry <= 30) return `Expires in ${daysUntilExpiry} days`

    return `Expires: ${expirationDate}`
  }

  const filteredCredentials = credentials.filter((credential) => {
    const matchesSearch =
      credential.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
      credential.authority.toLowerCase().includes(searchTerm.toLowerCase())

    if (filterStatus === "all") return matchesSearch
    if (filterStatus === "expiring")
      return matchesSearch && (credential.status === "expiring" || credential.daysUntilExpiry <= 30)
    if (filterStatus === "missing") return matchesSearch && credential.status === "missing"
    if (filterStatus === "valid")
      return matchesSearch && credential.status === "valid" && credential.daysUntilExpiry > 30

    return matchesSearch
  })

  const statusCounts = {
    valid: credentials.filter((c) => c.status === "valid" && c.daysUntilExpiry > 30).length,
    expiring: credentials.filter((c) => c.status === "expiring" || c.daysUntilExpiry <= 30).length,
    missing: credentials.filter((c) => c.status === "missing").length,
    expired: credentials.filter((c) => c.status === "expired").length,
  }

  return (
    <div className="space-y-6">
      {/* Overview Cards */}
      <div className="grid gap-4 md:grid-cols-4">
        <Card className="border-green-200 bg-green-50">
          <CardContent className="p-4">
            <div className="flex items-center gap-2">
              <CheckCircle2 className="h-5 w-5 text-green-600" />
              <div>
                <div className="text-2xl font-bold text-green-800">{statusCounts.valid}</div>
                <div className="text-sm text-green-600">Valid</div>
              </div>
            </div>
          </CardContent>
        </Card>

        <Card className="border-orange-200 bg-orange-50">
          <CardContent className="p-4">
            <div className="flex items-center gap-2">
              <Clock className="h-5 w-5 text-orange-600" />
              <div>
                <div className="text-2xl font-bold text-orange-800">{statusCounts.expiring}</div>
                <div className="text-sm text-orange-600">Expiring Soon</div>
              </div>
            </div>
          </CardContent>
        </Card>

        <Card className="border-red-200 bg-red-50">
          <CardContent className="p-4">
            <div className="flex items-center gap-2">
              <AlertTriangle className="h-5 w-5 text-red-600" />
              <div>
                <div className="text-2xl font-bold text-red-800">{statusCounts.missing}</div>
                <div className="text-sm text-red-600">Missing</div>
              </div>
            </div>
          </CardContent>
        </Card>

        <Card className="border-gray-200 bg-gray-50">
          <CardContent className="p-4">
            <div className="flex items-center gap-2">
              <Award className="h-5 w-5 text-gray-600" />
              <div>
                <div className="text-2xl font-bold text-gray-800">{credentials.length}</div>
                <div className="text-sm text-gray-600">Total</div>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Search and Filter */}
      <Card className="border-[#CD9BD2]/20">
        <CardHeader>
          <CardTitle className="text-[#212121]">Credentials & Certificates</CardTitle>
          <CardDescription>Manage your professional credentials and track renewal dates</CardDescription>
        </CardHeader>
        <CardContent>
          <div className="flex items-center gap-4 mb-6">
            <div className="relative flex-1">
              <Search className="absolute left-2.5 top-2.5 h-4 w-4 text-muted-foreground" />
              <Input
                placeholder="Search credentials..."
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
                variant={filterStatus === "expiring" ? "default" : "outline"}
                size="sm"
                onClick={() => setFilterStatus("expiring")}
                className="text-orange-600 border-orange-300"
              >
                Expiring
              </Button>
              <Button
                variant={filterStatus === "missing" ? "default" : "outline"}
                size="sm"
                onClick={() => setFilterStatus("missing")}
                className="text-red-600 border-red-300"
              >
                Missing
              </Button>
              <Button
                variant={filterStatus === "valid" ? "default" : "outline"}
                size="sm"
                onClick={() => setFilterStatus("valid")}
                className="text-green-600 border-green-300"
              >
                Valid
              </Button>
            </div>
          </div>

          {/* Credentials List */}
          <div className="space-y-4">
            {filteredCredentials.map((credential, index) => (
              <div key={index} className="flex items-center gap-4 p-4 bg-gray-50 rounded-lg border">
                <div className="flex-shrink-0">{getStatusIcon(credential.status, credential.daysUntilExpiry)}</div>

                <div className="flex-1">
                  <div className="flex items-start justify-between mb-2">
                    <div>
                      <h4 className="font-medium text-[#212121]">{credential.name}</h4>
                      <p className="text-sm text-gray-600">{credential.authority}</p>
                    </div>
                    {getStatusBadge(credential.status, credential.daysUntilExpiry)}
                  </div>

                  <div className="flex items-center gap-6 text-sm text-gray-600 mb-3">
                    {credential.issueDate && (
                      <div className="flex items-center gap-1">
                        <Calendar className="h-4 w-4" />
                        Issued: {credential.issueDate}
                      </div>
                    )}
                    <div className="flex items-center gap-1">
                      <Clock className="h-4 w-4" />
                      {getExpirationText(credential.status, credential.expirationDate, credential.daysUntilExpiry)}
                    </div>
                    <Badge variant="outline" className="text-xs">
                      {credential.category}
                    </Badge>
                  </div>

                  <div className="flex items-center gap-2">
                    {credential.status === "missing" ? (
                      <Button size="sm" className="bg-gradient-to-r from-[#F4A2B9] to-[#CD9BD2] text-white">
                        <Upload className="h-4 w-4 mr-1" />
                        Upload
                      </Button>
                    ) : (
                      <Button size="sm" variant="outline" className="border-[#CD9BD2] text-[#BC4E82] bg-transparent">
                        <FileText className="h-4 w-4 mr-1" />
                        View
                      </Button>
                    )}

                    {credential.renewalUrl &&
                      (credential.status === "expiring" || credential.daysUntilExpiry <= 30) && (
                        <Button
                          size="sm"
                          variant="outline"
                          className="border-orange-300 text-orange-700 bg-transparent"
                        >
                          <RefreshCw className="h-4 w-4 mr-1" />
                          Renew
                        </Button>
                      )}

                    {credential.renewalUrl && credential.status === "valid" && credential.daysUntilExpiry > 30 && (
                      <Button size="sm" variant="outline" className="border-blue-300 text-blue-700 bg-transparent">
                        <ExternalLink className="h-4 w-4 mr-1" />
                        Info
                      </Button>
                    )}
                  </div>
                </div>
              </div>
            ))}
          </div>

          {filteredCredentials.length === 0 && (
            <div className="text-center py-8 text-gray-500">No credentials found matching your search criteria.</div>
          )}
        </CardContent>
      </Card>
    </div>
  )
}
