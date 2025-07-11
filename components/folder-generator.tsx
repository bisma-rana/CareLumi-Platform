"use client"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Label } from "@/components/ui/label"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Checkbox } from "@/components/ui/checkbox"
import { Progress } from "@/components/ui/progress"
import { Alert, AlertDescription } from "@/components/ui/alert"
import { FileText, Upload, CheckCircle2, Loader2, RefreshCw } from "lucide-react"

export default function FolderGenerator() {
  const [selectedStaff, setSelectedStaff] = useState("")
  const [selectedDocuments, setSelectedDocuments] = useState<string[]>([])
  const [isGenerating, setIsGenerating] = useState(false)
  const [generationProgress, setGenerationProgress] = useState(0)
  const [generationComplete, setGenerationComplete] = useState(false)

  const staffMembers = ["Sarah Miller", "John Davis", "Maria Johnson", "David Smith", "Lisa Wong", "Emily Chen"]

  const documentTypes = [
    { id: "background-check", label: "Background Check", required: true },
    { id: "cpr-cert", label: "CPR Certification", required: true },
    { id: "first-aid", label: "First Aid Training", required: true },
    { id: "sids-training", label: "SIDS Training", required: true },
    { id: "mandated-reporter", label: "Mandated Reporter Training", required: true },
    { id: "child-development", label: "Child Development Training", required: false },
    { id: "references", label: "Reference Letters", required: true },
    { id: "medical-exam", label: "Medical Examination", required: true },
    { id: "tb-test", label: "TB Test", required: true },
    { id: "immunization", label: "Immunization Records", required: false },
  ]

  const handleDocumentToggle = (documentId: string) => {
    setSelectedDocuments((prev) =>
      prev.includes(documentId) ? prev.filter((id) => id !== documentId) : [...prev, documentId],
    )
  }

  const handleUpdateFolder = async () => {
    if (!selectedStaff) return

    setIsGenerating(true)
    setGenerationProgress(0)
    setGenerationComplete(false)

    // Simulate folder generation progress
    const interval = setInterval(() => {
      setGenerationProgress((prev) => {
        if (prev >= 100) {
          clearInterval(interval)
          setIsGenerating(false)
          setGenerationComplete(true)
          return 100
        }
        return prev + 10
      })
    }, 300)
  }

  const resetForm = () => {
    setSelectedStaff("")
    setSelectedDocuments([])
    setGenerationProgress(0)
    setGenerationComplete(false)
  }

  return (
    <div className="space-y-6">
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <FileText className="h-5 w-5" />
            Add Staff Documents
          </CardTitle>
          <CardDescription>Upload and organize compliance documents for staff members</CardDescription>
        </CardHeader>
        <CardContent className="space-y-6">
          {generationComplete ? (
            <Alert className="border-green-200 bg-green-50">
              <CheckCircle2 className="h-4 w-4 text-green-600" />
              <AlertDescription className="text-green-800">
                Documents successfully added for {selectedStaff}! The compliance folder has been updated.
              </AlertDescription>
            </Alert>
          ) : null}

          <div className="space-y-4">
            <div className="space-y-2">
              <Label htmlFor="staff-select">Select Staff Member</Label>
              <Select value={selectedStaff} onValueChange={setSelectedStaff}>
                <SelectTrigger>
                  <SelectValue placeholder="Choose a staff member" />
                </SelectTrigger>
                <SelectContent>
                  {staffMembers.map((staff) => (
                    <SelectItem key={staff} value={staff}>
                      {staff}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>

            {selectedStaff && (
              <div className="space-y-4">
                <div className="space-y-2">
                  <Label>Document Types to Include</Label>
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
                    {documentTypes.map((doc) => (
                      <div key={doc.id} className="flex items-center space-x-2">
                        <Checkbox
                          id={doc.id}
                          checked={selectedDocuments.includes(doc.id)}
                          onCheckedChange={() => handleDocumentToggle(doc.id)}
                        />
                        <Label htmlFor={doc.id} className="text-sm">
                          {doc.label}
                          {doc.required && <span className="text-red-500 ml-1">*</span>}
                        </Label>
                      </div>
                    ))}
                  </div>
                  <p className="text-xs text-gray-600">* Required documents</p>
                </div>

                <div className="space-y-4">
                  <Label>Upload Documents</Label>
                  <div className="border-2 border-dashed border-gray-300 rounded-lg p-6 text-center">
                    <Upload className="h-8 w-8 text-gray-400 mx-auto mb-2" />
                    <p className="text-sm text-gray-600 mb-2">Drag and drop files here, or click to browse</p>
                    <Button variant="outline" size="sm">
                      Choose Files
                    </Button>
                  </div>
                </div>

                {isGenerating && (
                  <div className="space-y-2">
                    <div className="flex items-center justify-between text-sm">
                      <span>Updating folder...</span>
                      <span>{generationProgress}%</span>
                    </div>
                    <Progress value={generationProgress} className="h-2" />
                  </div>
                )}

                <div className="flex gap-3">
                  <Button
                    onClick={handleUpdateFolder}
                    disabled={!selectedStaff || selectedDocuments.length === 0 || isGenerating}
                    className="bg-gradient-to-r from-[#F4A2B9] to-[#CD9BD2] hover:from-[#F4A2B9]/90 hover:to-[#CD9BD2]/90 text-white"
                  >
                    {isGenerating ? (
                      <>
                        <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                        Updating...
                      </>
                    ) : (
                      <>
                        <RefreshCw className="mr-2 h-4 w-4" />
                        Update Folder
                      </>
                    )}
                  </Button>

                  {generationComplete && (
                    <Button variant="outline" onClick={resetForm}>
                      Add More Documents
                    </Button>
                  )}
                </div>
              </div>
            )}
          </div>
        </CardContent>
      </Card>
    </div>
  )
}
