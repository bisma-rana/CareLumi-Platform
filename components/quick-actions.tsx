"use client"
import { Card, CardContent } from "@/components/ui/card"
import { UserPlus, FolderPlus, FileText, Download } from "lucide-react"
import { useRouter } from "next/navigation"

export default function QuickActions() {
  const router = useRouter()

  const actions = [
    {
      icon: UserPlus,
      label: "Add Staff",
      description: "Invite new team member",
      color: "from-[#F4A2B9] to-[#CD9BD2]",
      onClick: () => router.push("/settings?tab=team"),
    },
    {
      icon: FolderPlus,
      label: "Create Folder",
      description: "Generate compliance folder",
      color: "from-[#FEBC89] to-[#FDD683]",
      onClick: () => router.push("/compliance-folders"),
    },
    {
      icon: FileText,
      label: "Upload Documents",
      description: "Add staff documentation",
      color: "from-[#8E94DC] to-[#505691]",
      onClick: () => router.push("/compliance-folders"),
    },
    {
      icon: Download,
      label: "Export Report",
      description: "Download missing credentials",
      color: "from-[#BC4E82] to-[#505691]",
      onClick: () => {
        // Simulate CSV download
        const csvContent =
          "data:text/csv;charset=utf-8,Staff Name,Missing Credentials,Expiry Date\nDavid Smith,CPR Certification,N/A\nMaria Johnson,First Aid,2025-05-12"
        const encodedUri = encodeURI(csvContent)
        const link = document.createElement("a")
        link.setAttribute("href", encodedUri)
        link.setAttribute("download", "missing_credentials_report.csv")
        document.body.appendChild(link)
        link.click()
        document.body.removeChild(link)
      },
    },
  ]

  return (
    <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
      {actions.map((action, index) => (
        <Card
          key={index}
          className="border-[#CD9BD2]/20 hover:shadow-lg transition-all cursor-pointer group"
          onClick={action.onClick}
        >
          <CardContent className="p-4 text-center">
            <div
              className={`h-12 w-12 rounded-full bg-gradient-to-r ${action.color} flex items-center justify-center mx-auto mb-3 group-hover:scale-110 transition-transform`}
            >
              <action.icon className="h-6 w-6 text-white" />
            </div>
            <h3 className="font-medium text-[#212121] mb-1">{action.label}</h3>
            <p className="text-xs text-gray-600">{action.description}</p>
          </CardContent>
        </Card>
      ))}
    </div>
  )
}
