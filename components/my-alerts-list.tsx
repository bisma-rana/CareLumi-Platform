import { Card, CardContent } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import { AlertTriangle, Clock, BellRing, FileText, CheckCircle2, MoreHorizontal } from "lucide-react"
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu"

export default function MyAlertsList() {
  const myAlerts = [
    {
      title: "CPR Certification Expiring",
      description: "Your CPR certification expires on May 12, 2025 (14 days).",
      type: "warning",
      category: "training",
      time: "10 minutes ago",
      icon: FileText,
    },
    {
      title: "Missing Document",
      description: "Please upload your updated reference letters to complete your file.",
      type: "warning",
      category: "compliance",
      time: "1 hour ago",
      icon: FileText,
    },
    {
      title: "Training Completed",
      description: "Your SIDS training has been successfully completed and verified.",
      type: "info",
      category: "training",
      time: "Yesterday at 2:15 PM",
      icon: CheckCircle2,
    },
    {
      title: "Profile Updated",
      description: "Your profile information has been successfully updated.",
      type: "info",
      category: "profile",
      time: "Yesterday at 3:30 PM",
      icon: BellRing,
    },
    {
      title: "Document Approved",
      description: "Your First Aid certificate has been reviewed and approved.",
      type: "info",
      category: "compliance",
      time: "Apr 22, 2025",
      icon: CheckCircle2,
    },
  ]

  const getTypeIcon = (type: string) => {
    switch (type) {
      case "warning":
        return <AlertTriangle className="h-5 w-5 text-amber-500" />
      case "info":
        return <BellRing className="h-5 w-5 text-blue-500" />
      default:
        return null
    }
  }

  const getTypeBadge = (type: string) => {
    switch (type) {
      case "warning":
        return <Badge className="bg-amber-100 text-amber-800">Action Required</Badge>
      case "info":
        return <Badge className="bg-blue-100 text-blue-800">Info</Badge>
      default:
        return null
    }
  }

  const getCategoryBadge = (category: string) => {
    switch (category) {
      case "training":
        return <Badge variant="outline">Training</Badge>
      case "compliance":
        return <Badge variant="outline">Compliance</Badge>
      case "profile":
        return <Badge variant="outline">Profile</Badge>
      default:
        return null
    }
  }

  return (
    <div className="grid gap-4">
      {myAlerts.map((alert, index) => (
        <Card
          key={index}
          className={`overflow-hidden ${alert.type === "warning" ? "border-amber-200 bg-amber-50" : ""}`}
        >
          <CardContent className="p-6">
            <div className="flex items-start gap-4">
              <div className="mt-0.5">{getTypeIcon(alert.type)}</div>

              <div className="flex-1">
                <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2">
                  <h3 className="font-medium">{alert.title}</h3>
                  <div className="flex items-center gap-2">
                    {getTypeBadge(alert.type)}
                    {getCategoryBadge(alert.category)}
                  </div>
                </div>

                <p className="text-sm text-muted-foreground mt-1">{alert.description}</p>

                <div className="flex items-center justify-between mt-4">
                  <div className="flex items-center text-xs text-muted-foreground">
                    <Clock className="h-3 w-3 mr-1" />
                    {alert.time}
                  </div>

                  <div className="flex items-center gap-2">
                    <Button variant="ghost" size="sm">
                      Dismiss
                    </Button>
                    <Button variant="outline" size="sm">
                      View Details
                    </Button>

                    <DropdownMenu>
                      <DropdownMenuTrigger asChild>
                        <Button variant="ghost" size="icon">
                          <MoreHorizontal className="h-4 w-4" />
                        </Button>
                      </DropdownMenuTrigger>
                      <DropdownMenuContent align="end">
                        <DropdownMenuLabel>Actions</DropdownMenuLabel>
                        <DropdownMenuSeparator />
                        <DropdownMenuItem>Mark as Read</DropdownMenuItem>
                        <DropdownMenuItem>Snooze</DropdownMenuItem>
                        <DropdownMenuItem>Take Action</DropdownMenuItem>
                      </DropdownMenuContent>
                    </DropdownMenu>
                  </div>
                </div>
              </div>
            </div>
          </CardContent>
        </Card>
      ))}
    </div>
  )
}
