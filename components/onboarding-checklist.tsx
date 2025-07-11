"use client"

import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { Progress } from "@/components/ui/progress"
import { Clock, Upload, ExternalLink, FileText, User, Shield, GraduationCap, Briefcase, Calendar } from "lucide-react"

export default function OnboardingChecklist() {
  const categories = [
    {
      title: "Medical Requirements",
      icon: User,
      color: "from-[#F4A2B9] to-[#CD9BD2]",
      tasks: [
        {
          name: "Medical Report (CFS 602)",
          status: "completed",
          dueDate: "Aug 30, 2025",
          description: "Physical examination and health clearance",
          actions: ["view"],
          completedDate: "Aug 15, 2025",
        },
        {
          name: "TB Test Results",
          status: "completed",
          dueDate: "Aug 30, 2025",
          description: "Tuberculosis screening documentation",
          actions: ["view"],
          completedDate: "Aug 16, 2025",
        },
        {
          name: "Immunization Records",
          status: "completed",
          dueDate: "Aug 30, 2025",
          description: "Current vaccination documentation",
          actions: ["view"],
          completedDate: "Aug 16, 2025",
        },
      ],
    },
    {
      title: "Background Check",
      icon: Shield,
      color: "from-[#8E94DC] to-[#505691]",
      tasks: [
        {
          name: "Background Check Authorization (CFS 718-B)",
          status: "completed",
          dueDate: "Completed",
          description: "DCFS background check authorization form",
          actions: ["view"],
          completedDate: "Aug 10, 2025",
        },
        {
          name: "Fingerprint Card",
          status: "completed",
          dueDate: "Completed",
          description: "State police fingerprint submission",
          actions: ["view"],
          completedDate: "Aug 12, 2025",
        },
        {
          name: "Criminal Background Check",
          status: "in-progress",
          dueDate: "Processing",
          description: "State and federal background verification",
          actions: ["status"],
          note: "Processing - typically takes 2-3 weeks",
        },
      ],
    },
    {
      title: "Training & Certification",
      icon: GraduationCap,
      color: "from-[#FEBC89] to-[#FDD683]",
      tasks: [
        {
          name: "SIDS Certification",
          status: "completed",
          dueDate: "Aug 15, 2025",
          description: "Sudden Infant Death Syndrome training",
          actions: ["view"],
          completedDate: "Aug 14, 2025",
        },
        {
          name: "Mandated Reporter Training",
          status: "completed",
          dueDate: "Aug 15, 2025",
          description: "Child abuse and neglect reporting training",
          actions: ["view", "course"],
          completedDate: "Aug 13, 2025",
        },
        {
          name: "Food Safety Training (ANSI)",
          status: "in-progress",
          dueDate: "Sep 1, 2025",
          description: "Food handling and safety certification",
          actions: ["continue", "upload"],
          progress: 75,
        },
      ],
    },
    {
      title: "HR Documentation",
      icon: Briefcase,
      color: "from-[#BC4E82] to-[#8E94DC]",
      tasks: [
        {
          name: "I-9 Employment Eligibility",
          status: "completed",
          dueDate: "Synced via Gusto",
          description: "Employment authorization verification",
          actions: ["gusto"],
          completedDate: "Aug 5, 2025",
          isGusto: true,
        },
        {
          name: "W-4 Tax Form",
          status: "completed",
          dueDate: "Synced via Gusto",
          description: "Federal tax withholding form",
          actions: ["gusto"],
          completedDate: "Aug 5, 2025",
          isGusto: true,
        },
        {
          name: "IL-W-4 State Tax Form",
          status: "completed",
          dueDate: "Synced via Gusto",
          description: "Illinois state tax withholding form",
          actions: ["gusto"],
          completedDate: "Aug 5, 2025",
          isGusto: true,
        },
        {
          name: "Reference Letters",
          status: "missing",
          dueDate: "Sep 1, 2025",
          description: "Professional references from previous employers",
          actions: ["upload", "form"],
          overdue: 5,
        },
      ],
    },
  ]

  const getStatusBadge = (status: string, overdue?: number) => {
    switch (status) {
      case "completed":
        return <Badge className="bg-green-100 text-green-800 border-green-200">✅ Completed</Badge>
      case "in-progress":
        return <Badge className="bg-yellow-100 text-yellow-800 border-yellow-200">🟡 In Progress</Badge>
      case "missing":
        return (
          <Badge className="bg-red-100 text-red-800 border-red-200">
            {overdue ? `🔴 Overdue ${overdue} days` : "❌ Not Started"}
          </Badge>
        )
      default:
        return <Badge className="bg-gray-100 text-gray-800 border-gray-200">⚪ Not Started</Badge>
    }
  }

  const getActionButtons = (actions: string[], task: any) => {
    return actions.map((action, index) => {
      switch (action) {
        case "upload":
          return (
            <Button key={index} size="sm" className="bg-gradient-to-r from-[#F4A2B9] to-[#CD9BD2] text-white">
              <Upload className="h-4 w-4 mr-1" />
              Upload
            </Button>
          )
        case "view":
          return (
            <Button key={index} size="sm" variant="outline" className="border-[#CD9BD2] text-[#BC4E82] bg-transparent">
              <FileText className="h-4 w-4 mr-1" />
              View
            </Button>
          )
        case "course":
          return (
            <Button key={index} size="sm" variant="outline" className="border-blue-300 text-blue-700 bg-transparent">
              <ExternalLink className="h-4 w-4 mr-1" />
              Course
            </Button>
          )
        case "continue":
          return (
            <Button key={index} size="sm" className="bg-blue-600 text-white">
              <ExternalLink className="h-4 w-4 mr-1" />
              Continue
            </Button>
          )
        case "form":
          return (
            <Button key={index} size="sm" variant="outline" className="border-gray-300 text-gray-700 bg-transparent">
              <FileText className="h-4 w-4 mr-1" />
              Form
            </Button>
          )
        case "status":
          return (
            <Button key={index} size="sm" variant="outline" className="border-blue-300 text-blue-700 bg-transparent">
              <Clock className="h-4 w-4 mr-1" />
              Status
            </Button>
          )
        case "gusto":
          return (
            <Badge key={index} className="bg-blue-100 text-blue-800 border-blue-200">
              📊 Gusto Synced
            </Badge>
          )
        default:
          return null
      }
    })
  }

  const totalTasks = categories.reduce((acc, cat) => acc + cat.tasks.length, 0)
  const completedTasks = categories.reduce(
    (acc, cat) => acc + cat.tasks.filter((task) => task.status === "completed").length,
    0,
  )
  const completionPercentage = Math.round((completedTasks / totalTasks) * 100)

  return (
    <div className="space-y-6">
      {/* Progress Overview */}
      <Card className="border-[#CD9BD2]/20">
        <CardHeader>
          <div className="flex items-center justify-between">
            <div>
              <CardTitle className="text-[#212121]">Onboarding Progress</CardTitle>
              <CardDescription>
                {completedTasks} of {totalTasks} tasks completed
              </CardDescription>
            </div>
            <div className="text-right">
              <div className="text-2xl font-bold text-[#212121]">{completionPercentage}%</div>
              <Progress value={completionPercentage} className="w-32 mt-2" />
            </div>
          </div>
        </CardHeader>
      </Card>

      {/* Task Categories */}
      <div className="space-y-6">
        {categories.map((category, categoryIndex) => {
          const categoryCompleted = category.tasks.filter((task) => task.status === "completed").length
          const categoryTotal = category.tasks.length
          const categoryProgress = Math.round((categoryCompleted / categoryTotal) * 100)

          return (
            <Card key={categoryIndex} className="border-[#CD9BD2]/20">
              <CardHeader>
                <div className="flex items-center gap-3">
                  <div
                    className={`h-10 w-10 rounded-lg bg-gradient-to-r ${category.color} flex items-center justify-center`}
                  >
                    <category.icon className="h-5 w-5 text-white" />
                  </div>
                  <div className="flex-1">
                    <CardTitle className="text-[#212121]">{category.title}</CardTitle>
                    <CardDescription>
                      {categoryCompleted} of {categoryTotal} completed ({categoryProgress}%)
                    </CardDescription>
                  </div>
                  <Progress value={categoryProgress} className="w-24" />
                </div>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  {category.tasks.map((task, taskIndex) => (
                    <div key={taskIndex} className="flex items-start gap-4 p-4 bg-gray-50 rounded-lg">
                      <div className="flex-1">
                        <div className="flex items-start justify-between mb-2">
                          <div>
                            <h4 className="font-medium text-[#212121] mb-1">{task.name}</h4>
                            <p className="text-sm text-gray-600 mb-2">{task.description}</p>
                          </div>
                          {getStatusBadge(task.status, task.overdue)}
                        </div>

                        <div className="flex items-center gap-4 text-sm text-gray-600 mb-3">
                          <div className="flex items-center gap-1">
                            <Calendar className="h-4 w-4" />
                            {task.status === "completed" && task.completedDate
                              ? `Completed: ${task.completedDate}`
                              : `Due: ${task.dueDate}`}
                          </div>
                          {task.progress && (
                            <div className="flex items-center gap-2">
                              <span>Progress: {task.progress}%</span>
                              <Progress value={task.progress} className="w-16 h-2" />
                            </div>
                          )}
                        </div>

                        {task.note && (
                          <div className="text-sm text-blue-600 bg-blue-50 p-2 rounded mb-3">ℹ️ {task.note}</div>
                        )}

                        <div className="flex items-center gap-2">{getActionButtons(task.actions, task)}</div>
                      </div>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>
          )
        })}
      </div>
    </div>
  )
}
