import { Card, CardContent } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import { AlertTriangle, Clock, BellRing, FileText, User, Fingerprint, MoreHorizontal } from "lucide-react"
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu"

export default function AlertsList() {
  const alerts = [
    {
      title: "CPR Certification Expiring",
      description: "Maria Johnson's CPR certification expires in 14 days.",
      type: "critical",
      category: "training",
      time: "10 minutes ago",
      icon: FileText,
    },
    {
      title: "Background Check Delayed",
      description: "David Smith's background check has been pending for 12 days.",
      type: "warning",
      category: "background",
      time: "1 hour ago",
      icon: Fingerprint,
    },
    {
      title: "Missing Documentation",
      description: "3 staff members have incomplete training documentation.",
      type: "warning",
      category: "compliance",
      time: "3 hours ago",
      icon: FileText,
    },
    {
      title: "New Staff Member Added",
      description: "Emily Chen has been added to the system.",
      type: "info",
      category: "staff",
      time: "Yesterday at 4:30 PM",
      icon: User,
    },
    {
      title: "Compliance Folder Generated",
      description: "Sarah Miller's compliance folder has been generated successfully.",
      type: "info",
      category: "compliance",
      time: "Yesterday at 2:15 PM",
      icon: FileText,
    },
    {
      title: "Annual Inspection Scheduled",
      description: "Annual compliance inspection scheduled for May 15, 2025. Ensure all folders are ready.",
      type: "warning",
      category: "compliance",
      time: "Apr 22, 2025",
      icon: BellRing,
    },
    {
      title: "First Aid Training Completed",
      description: "John Davis completed First Aid training.",
      type: "info",
      category: "training",
      time: "Apr 21, 2025",
      icon: FileText,
    },
  ]

  const getTypeIcon = (type: string) => {
    switch (type) {
      case "critical":
        return <AlertTriangle className="h-5 w-5 text-red-500" />
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
      case "critical":
        return <Badge className="bg-red-100 text-red-800">Critical</Badge>
      case "warning":
        return <Badge className="bg-amber-100 text-amber-800">Warning</Badge>
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
      case "background":
        return <Badge variant="outline">Background Check</Badge>
      case "compliance":
        return <Badge variant="outline">Compliance</Badge>
      case "staff":
        return <Badge variant="outline">Staff</Badge>
      default:
        return null
    }
  }

  return (
    <div className="grid gap-4">
      {alerts.map((alert, index) => (
        <Card key={index} className={`overflow-hidden ${alert.type === "critical" ? "border-red-200 bg-red-50" : ""}`}>
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
                        <DropdownMenuItem>Assign to...</DropdownMenuItem>
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
