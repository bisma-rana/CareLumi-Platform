"use client"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Progress } from "@/components/ui/progress"
import { CheckCircle2, Users, FolderPlus, Settings, ArrowRight, ArrowLeft } from "lucide-react"
import { useRouter } from "next/navigation"

export default function OnboardingPage() {
  const router = useRouter()
  const [currentStep, setCurrentStep] = useState(0)
  const [completedSteps, setCompletedSteps] = useState<number[]>([])

  const steps = [
    {
      title: "Welcome to CareLumi",
      description: "Let's get your organization set up for compliance automation",
      icon: CheckCircle2,
      content: (
        <div className="space-y-4">
          <div className="text-center">
            <div className="h-16 w-16 rounded-full bg-gradient-to-r from-purple-500 to-pink-500 flex items-center justify-center mx-auto mb-4">
              <CheckCircle2 className="h-8 w-8 text-white" />
            </div>
            <h3 className="text-xl font-semibold mb-2">Congratulations!</h3>
            <p className="text-muted-foreground">
              Your organization account has been created successfully. Let's walk through the key features to get you
              started.
            </p>
          </div>
          <div className="bg-muted p-4 rounded-lg">
            <h4 className="font-medium mb-2">What you'll accomplish:</h4>
            <ul className="text-sm space-y-1">
              <li>• Invite your staff members</li>
              <li>• Set up compliance folders</li>
              <li>• Configure your preferences</li>
              <li>• Take a quick tour of the dashboard</li>
            </ul>
          </div>
        </div>
      ),
    },
    {
      title: "Invite Staff Members",
      description: "Add your team to start managing their compliance documentation",
      icon: Users,
      content: (
        <div className="space-y-4">
          <div className="text-center">
            <div className="h-16 w-16 rounded-full bg-gradient-to-r from-blue-500 to-cyan-500 flex items-center justify-center mx-auto mb-4">
              <Users className="h-8 w-8 text-white" />
            </div>
            <h3 className="text-xl font-semibold mb-2">Invite Your Team</h3>
            <p className="text-muted-foreground">
              Share your Organization Code with staff members so they can join your CareLumi workspace.
            </p>
          </div>
          <div className="bg-muted p-4 rounded-lg">
            <div className="flex items-center justify-between">
              <div>
                <h4 className="font-medium">Your Organization Code</h4>
                <p className="text-sm text-muted-foreground">Share this with your staff</p>
              </div>
              <div className="text-right">
                <div className="text-lg font-mono font-bold">ORG-123456</div>
                <Button variant="outline" size="sm" className="mt-1 bg-transparent">
                  Copy Code
                </Button>
              </div>
            </div>
          </div>
          <div className="space-y-2">
            <h4 className="font-medium">Staff can register at:</h4>
            <div className="bg-muted p-2 rounded text-sm font-mono">https://carelumi.com/register-staff</div>
          </div>
        </div>
      ),
    },
    {
      title: "Create Compliance Folders",
      description: "Set up digital folders for your staff documentation",
      icon: FolderPlus,
      content: (
        <div className="space-y-4">
          <div className="text-center">
            <div className="h-16 w-16 rounded-full bg-gradient-to-r from-green-500 to-emerald-500 flex items-center justify-center mx-auto mb-4">
              <FolderPlus className="h-8 w-8 text-white" />
            </div>
            <h3 className="text-xl font-semibold mb-2">Compliance Folders</h3>
            <p className="text-muted-foreground">
              Digital folders help organize staff documentation for DCFS inspections and compliance tracking.
            </p>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div className="bg-muted p-4 rounded-lg">
              <h4 className="font-medium mb-2">Key Features:</h4>
              <ul className="text-sm space-y-1">
                <li>• Auto-categorize documents</li>
                <li>• Legibility scanning</li>
                <li>• Missing document alerts</li>
                <li>• PDF export for DCFS</li>
              </ul>
            </div>
            <div className="bg-muted p-4 rounded-lg">
              <h4 className="font-medium mb-2">Document Types:</h4>
              <ul className="text-sm space-y-1">
                <li>• Background checks</li>
                <li>• Training certificates</li>
                <li>• ID documents</li>
                <li>• Medical records</li>
              </ul>
            </div>
          </div>
        </div>
      ),
    },
    {
      title: "Configure Settings",
      description: "Customize your organization preferences and notifications",
      icon: Settings,
      content: (
        <div className="space-y-4">
          <div className="text-center">
            <div className="h-16 w-16 rounded-full bg-gradient-to-r from-orange-500 to-red-500 flex items-center justify-center mx-auto mb-4">
              <Settings className="h-8 w-8 text-white" />
            </div>
            <h3 className="text-xl font-semibold mb-2">Organization Settings</h3>
            <p className="text-muted-foreground">
              Configure notifications, compliance requirements, and other preferences for your organization.
            </p>
          </div>
          <div className="space-y-3">
            <div className="flex items-center justify-between p-3 bg-muted rounded-lg">
              <div>
                <h4 className="font-medium">Email Notifications</h4>
                <p className="text-sm text-muted-foreground">Get alerts for expiring credentials</p>
              </div>
              <div className="w-4 h-4 bg-green-500 rounded-full"></div>
            </div>
            <div className="flex items-center justify-between p-3 bg-muted rounded-lg">
              <div>
                <h4 className="font-medium">2FA Security</h4>
                <p className="text-sm text-muted-foreground">Enhanced account protection</p>
              </div>
              <div className="w-4 h-4 bg-green-500 rounded-full"></div>
            </div>
            <div className="flex items-center justify-between p-3 bg-muted rounded-lg">
              <div>
                <h4 className="font-medium">Auto-backup</h4>
                <p className="text-sm text-muted-foreground">Daily backup of compliance data</p>
              </div>
              <div className="w-4 h-4 bg-green-500 rounded-full"></div>
            </div>
          </div>
        </div>
      ),
    },
  ]

  const handleNext = () => {
    if (currentStep < steps.length - 1) {
      setCompletedSteps([...completedSteps, currentStep])
      setCurrentStep(currentStep + 1)
    } else {
      // Complete onboarding
      setCompletedSteps([...completedSteps, currentStep])
      router.push("/dashboard")
    }
  }

  const handlePrevious = () => {
    if (currentStep > 0) {
      setCurrentStep(currentStep - 1)
    }
  }

  const handleSkip = () => {
    router.push("/dashboard")
  }

  const progress = ((currentStep + 1) / steps.length) * 100

  return (
    <div className="min-h-screen bg-gradient-to-br from-purple-50 to-pink-50 p-4">
      <div className="max-w-4xl mx-auto">
        <div className="mb-8">
          <div className="flex items-center justify-between mb-4">
            <h1 className="text-2xl font-bold">Organization Setup</h1>
            <Button variant="ghost" onClick={handleSkip}>
              Skip Setup
            </Button>
          </div>
          <Progress value={progress} className="h-2" />
          <p className="text-sm text-muted-foreground mt-2">
            Step {currentStep + 1} of {steps.length}
          </p>
        </div>

        <Card className="mb-8">
          <CardHeader>
            <div className="flex items-center gap-3">
              {steps[currentStep].icon({ className: "h-6 w-6 text-purple-600" })}
              <div>
                <CardTitle>{steps[currentStep].title}</CardTitle>
                <CardDescription>{steps[currentStep].description}</CardDescription>
              </div>
            </div>
          </CardHeader>
          <CardContent>{steps[currentStep].content}</CardContent>
        </Card>

        <div className="flex items-center justify-between">
          <Button
            variant="outline"
            onClick={handlePrevious}
            disabled={currentStep === 0}
            className="flex items-center gap-2 bg-transparent"
          >
            <ArrowLeft className="h-4 w-4" />
            Previous
          </Button>

          <div className="flex items-center gap-2">
            {steps.map((step, index) => (
              <div
                key={index}
                className={`w-2 h-2 rounded-full ${
                  completedSteps.includes(index) ? "bg-green-500" : index === currentStep ? "bg-purple-500" : "bg-muted"
                }`}
              />
            ))}
          </div>

          <Button
            onClick={handleNext}
            className="flex items-center gap-2 bg-gradient-to-r from-purple-500 to-pink-500 hover:from-purple-600 hover:to-pink-600"
          >
            {currentStep === steps.length - 1 ? "Complete Setup" : "Next"}
            <ArrowRight className="h-4 w-4" />
          </Button>
        </div>
      </div>
    </div>
  )
}
