"use client"

import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import { Progress } from "@/components/ui/progress"
import { Avatar, AvatarFallback } from "@/components/ui/avatar"
import { Upload, Download, FileText, CheckCircle2, AlertTriangle, XCircle, Calendar, User, Shield } from "lucide-react"

export default function MyComplianceFolder() {
  const myDocuments = [
    {
      category: "Background Check",
      documents: [
        { name: "DCFS Background Check", status: "complete", uploadDate: "Mar 15, 2025", expiry: "Mar 15, 2027" },
        { name: "Fingerprint Card", status: "complete", uploadDate: "Mar 15, 2025", expiry: "Mar 15, 2027" },
      ],
    },
    {
      category: "Training Certificates",
      documents: [
        { name: "CPR Certification", status: "expiring", uploadDate: "May 12, 2023", expiry: "May 12, 2025" },
        { name: "First Aid Certificate", status: "complete", uploadDate: "Aug 10, 2023", expiry: "Aug 10, 2025" },
        { name: "SIDS Training", status: "complete", uploadDate: "Feb 14, 2024", expiry: "Feb 14, 2026" },
      ],
    },
    {
      category: "Identification",
      documents: [
        { name: "Driver's License", status: "complete", uploadDate: "Jan 20, 2025", expiry: "Jan 20, 2029" },
        { name: "Social Security Card", status: "complete", uploadDate: "Jan 20, 2025", expiry: "N/A" },
      ],
    },
    {
      category: "Education & Employment",
      documents: [
        { name: "High School Diploma", status: "complete", uploadDate: "Jan 20, 2025", expiry: "N/A" },
        { name: "Employment History", status: "complete", uploadDate: "Jan 20, 2025", expiry: "N/A" },
        { name: "Reference Letters", status: "missing", uploadDate: "", expiry: "" },
      ],
    },
  ]

  const getStatusIcon = (status: string) => {
    switch (status) {
      case "complete":
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
      case "complete":
        return <Badge className="bg-green-100 text-green-800">Complete</Badge>
      case "expiring":
        return <Badge className="bg-amber-100 text-amber-800">Expiring Soon</Badge>
      case "missing":
        return <Badge className="bg-red-100 text-red-800">Missing</Badge>
      default:
        return null
    }
  }

  const totalDocuments = myDocuments.reduce((acc, category) => acc + category.documents.length, 0)
  const completeDocuments = myDocuments.reduce(
    (acc, category) => acc + category.documents.filter((doc) => doc.status === "complete").length,
    0,
  )
  const completionPercentage = Math.round((completeDocuments / totalDocuments) * 100)

  return (
    <div className="space-y-6">
      {/* Header Card with Personal Info */}
      <Card className="border-[#CD9BD2]/20">
        <CardHeader>
          <div className="flex items-center gap-4">
            <Avatar className="h-16 w-16">
              <AvatarFallback className="bg-gradient-to-r from-[#F4A2B9] to-[#CD9BD2] text-white text-lg">
                SM
              </AvatarFallback>
            </Avatar>
            <div className="flex-1">
              <h3 className="text-2xl font-bold text-[#212121]">Sarah Miller</h3>
              <p className="text-gray-600">Lead Teacher</p>
              <div className="flex items-center gap-4 mt-2">
                <div className="flex items-center gap-1 text-sm text-gray-600">
                  <User className="h-4 w-4" />
                  Employee ID: EMP-001
                </div>
                <div className="flex items-center gap-1 text-sm text-gray-600">
                  <Calendar className="h-4 w-4" />
                  Hired: Jan 15, 2023
                </div>
              </div>
            </div>
            <div className="text-right">
              <div className="text-3xl font-bold text-[#212121]">{completionPercentage}%</div>
              <p className="text-sm text-gray-600">Complete</p>
              <Progress value={completionPercentage} className="w-24 h-2 mt-2" />
            </div>
          </div>
        </CardHeader>
      </Card>

      {/* Quick Actions */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        <Button className="h-16 bg-gradient-to-r from-[#F4A2B9] to-[#CD9BD2] hover:from-[#F4A2B9]/90 hover:to-[#CD9BD2]/90 text-white">
          <div className="flex items-center gap-3">
            <Upload className="h-5 w-5" />
            <div className="text-left">
              <div className="font-medium">Upload Document</div>
              <div className="text-xs opacity-90">Add new credential</div>
            </div>
          </div>
        </Button>

        <Button variant="outline" className="h-16 border-[#CD9BD2] text-[#BC4E82] hover:bg-[#CD9BD2]/10 bg-transparent">
          <div className="flex items-center gap-3">
            <Download className="h-5 w-5" />
            <div className="text-left">
              <div className="font-medium">Download Folder</div>
              <div className="text-xs">PDF format</div>
            </div>
          </div>
        </Button>

        <Button variant="outline" className="h-16 border-[#CD9BD2] text-[#BC4E82] hover:bg-[#CD9BD2]/10 bg-transparent">
          <div className="flex items-center gap-3">
            <Shield className="h-5 w-5" />
            <div className="text-left">
              <div className="font-medium">Request Review</div>
              <div className="text-xs">Admin verification</div>
            </div>
          </div>
        </Button>
      </div>

      {/* Document Categories */}
      <div className="space-y-6">
        {myDocuments.map((category, categoryIndex) => (
          <Card key={categoryIndex} className="border-[#CD9BD2]/20">
            <CardHeader>
              <CardTitle className="text-[#212121] flex items-center gap-2">
                <FileText className="h-5 w-5 text-[#BC4E82]" />
                {category.category}
              </CardTitle>
              <CardDescription>
                {category.documents.filter((doc) => doc.status === "complete").length} of {category.documents.length}{" "}
                documents complete
              </CardDescription>
            </CardHeader>
            <CardContent>
              <div className="space-y-3">
                {category.documents.map((document, docIndex) => (
                  <div key={docIndex} className="flex items-center justify-between p-3 bg-gray-50 rounded-lg">
                    <div className="flex items-center gap-3">
                      {getStatusIcon(document.status)}
                      <div>
                        <h4 className="font-medium text-[#212121]">{document.name}</h4>
                        <div className="flex items-center gap-4 text-sm text-gray-600">
                          {document.uploadDate && <span>Uploaded: {document.uploadDate}</span>}
                          {document.expiry && document.expiry !== "N/A" && <span>Expires: {document.expiry}</span>}
                        </div>
                      </div>
                    </div>
                    <div className="flex items-center gap-2">
                      {getStatusBadge(document.status)}
                      {document.status === "missing" ? (
                        <Button
                          size="sm"
                          className="bg-gradient-to-r from-[#F4A2B9] to-[#CD9BD2] hover:from-[#F4A2B9]/90 hover:to-[#CD9BD2]/90 text-white"
                        >
                          <Upload className="h-4 w-4 mr-1" />
                          Upload
                        </Button>
                      ) : (
                        <Button
                          variant="outline"
                          size="sm"
                          className="border-[#CD9BD2] text-[#BC4E82] hover:bg-[#CD9BD2]/10 bg-transparent"
                        >
                          <Download className="h-4 w-4 mr-1" />
                          View
                        </Button>
                      )}
                    </div>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>
        ))}
      </div>
    </div>
  )
}
