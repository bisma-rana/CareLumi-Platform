"use client"

import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import { Clock, Shield, FileText, Users, Zap, Bell, CheckCircle2, ArrowRight } from "lucide-react"

export default function ComingSoonPage() {
  const upcomingFeatures = [
    {
      title: "Background Checks",
      description: "Automated background check processing and tracking with real-time status updates",
      icon: Shield,
      status: "In Development",
      eta: "Q2 2025",
      color: "from-[#8E94DC] to-[#505691]",
      features: [
        "Automated DCFS background check submissions",
        "Real-time processing status updates",
        "Integration with state databases",
        "Automated renewal reminders",
      ],
    },
    {
      title: "Document Templates",
      description: "Pre-built templates for all required compliance documents and forms",
      icon: FileText,
      status: "Planning",
      eta: "Q3 2025",
      color: "from-[#FEBC89] to-[#FDD683]",
      features: [
        "DCFS-approved form templates",
        "Auto-fill with staff information",
        "Digital signature support",
        "Version control and updates",
      ],
    },
    {
      title: "Advanced Analytics",
      description: "Comprehensive reporting and analytics for compliance management",
      icon: Zap,
      status: "Research",
      eta: "Q4 2025",
      color: "from-[#F4A2B9] to-[#CD9BD2]",
      features: [
        "Compliance trend analysis",
        "Predictive expiration alerts",
        "Custom reporting dashboards",
        "Export capabilities",
      ],
    },
    {
      title: "Team Collaboration",
      description: "Enhanced collaboration tools for compliance teams and administrators",
      icon: Users,
      status: "Research",
      eta: "2026",
      color: "from-[#BC4E82] to-[#8E94DC]",
      features: [
        "Team messaging and notifications",
        "Task assignment and tracking",
        "Collaborative document review",
        "Approval workflows",
      ],
    },
  ]

  const productUpdates = [
    {
      date: "April 28, 2025",
      title: "Enhanced Staff Dashboard",
      description: "New compliance overview with improved progress tracking and QR code scanner integration.",
      type: "Feature Update",
    },
    {
      date: "April 25, 2025",
      title: "Mobile Scanner App Beta",
      description: "Beta release of our mobile document scanning app for iOS and Android.",
      type: "New Feature",
    },
    {
      date: "April 20, 2025",
      title: "Automated Renewal Reminders",
      description: "Smart notification system for credential renewals with customizable timing.",
      type: "Enhancement",
    },
    {
      date: "April 15, 2025",
      title: "Gusto Integration",
      description: "Seamless integration with Gusto for HR document synchronization.",
      type: "Integration",
    },
  ]

  const getStatusColor = (status: string) => {
    switch (status) {
      case "In Development":
        return "bg-blue-100 text-blue-800 border-blue-200"
      case "Planning":
        return "bg-yellow-100 text-yellow-800 border-yellow-200"
      case "Research":
        return "bg-purple-100 text-purple-800 border-purple-200"
      default:
        return "bg-gray-100 text-gray-800 border-gray-200"
    }
  }

  const getUpdateTypeColor = (type: string) => {
    switch (type) {
      case "New Feature":
        return "bg-green-100 text-green-800 border-green-200"
      case "Feature Update":
        return "bg-blue-100 text-blue-800 border-blue-200"
      case "Enhancement":
        return "bg-purple-100 text-purple-800 border-purple-200"
      case "Integration":
        return "bg-orange-100 text-orange-800 border-orange-200"
      default:
        return "bg-gray-100 text-gray-800 border-gray-200"
    }
  }

  return (
    <div className="flex-1 space-y-6 p-6">
      <div className="flex items-center justify-between">
        <div>
          <h2 className="text-3xl font-bold tracking-tight text-[#212121]">Coming Soon</h2>
          <p className="text-gray-600">Exciting new features and updates in development</p>
        </div>
        <div className="text-right">
          <p className="text-sm font-medium text-[#212121]">CareLumi Roadmap</p>
          <p className="text-xs text-gray-600">Last updated: Today</p>
        </div>
      </div>

      {/* Upcoming Features */}
      <div className="space-y-6">
        <div>
          <h3 className="text-xl font-semibold text-[#212121] mb-4">Upcoming Features</h3>
          <div className="grid gap-6 md:grid-cols-2">
            {upcomingFeatures.map((feature, index) => (
              <Card key={index} className="border-[#CD9BD2]/20 hover:shadow-lg transition-all">
                <CardHeader>
                  <div className="flex items-start justify-between">
                    <div className="flex items-center gap-3">
                      <div
                        className={`h-12 w-12 rounded-lg bg-gradient-to-r ${feature.color} flex items-center justify-center`}
                      >
                        <feature.icon className="h-6 w-6 text-white" />
                      </div>
                      <div>
                        <CardTitle className="text-[#212121]">{feature.title}</CardTitle>
                        <CardDescription className="text-gray-600">{feature.description}</CardDescription>
                      </div>
                    </div>
                    <Badge className={getStatusColor(feature.status)}>{feature.status}</Badge>
                  </div>
                </CardHeader>
                <CardContent>
                  <div className="space-y-4">
                    <div className="flex items-center gap-2 text-sm text-gray-600">
                      <Clock className="h-4 w-4" />
                      Expected: {feature.eta}
                    </div>

                    <div>
                      <h4 className="font-medium text-[#212121] mb-2">Key Features:</h4>
                      <ul className="space-y-1">
                        {feature.features.map((item, itemIndex) => (
                          <li key={itemIndex} className="flex items-center gap-2 text-sm text-gray-600">
                            <CheckCircle2 className="h-3 w-3 text-green-500 flex-shrink-0" />
                            {item}
                          </li>
                        ))}
                      </ul>
                    </div>

                    <Button
                      variant="outline"
                      className="w-full border-[#CD9BD2] text-[#BC4E82] hover:bg-[#CD9BD2]/10 bg-transparent"
                    >
                      <Bell className="h-4 w-4 mr-2" />
                      Notify Me When Available
                    </Button>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>

        {/* Product Updates */}
        <div>
          <h3 className="text-xl font-semibold text-[#212121] mb-4">Recent Product Updates</h3>
          <Card className="border-[#CD9BD2]/20">
            <CardHeader>
              <CardTitle className="text-[#212121]">What's New</CardTitle>
              <CardDescription>Latest features and improvements to CareLumi</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                {productUpdates.map((update, index) => (
                  <div key={index} className="flex items-start gap-4 p-4 bg-gray-50 rounded-lg">
                    <div className="flex-shrink-0 mt-1">
                      <div className="h-8 w-8 rounded-full bg-gradient-to-r from-[#F4A2B9] to-[#CD9BD2] flex items-center justify-center">
                        <CheckCircle2 className="h-4 w-4 text-white" />
                      </div>
                    </div>
                    <div className="flex-1">
                      <div className="flex items-start justify-between mb-2">
                        <div>
                          <h4 className="font-medium text-[#212121]">{update.title}</h4>
                          <p className="text-sm text-gray-600 mt-1">{update.description}</p>
                        </div>
                        <Badge className={getUpdateTypeColor(update.type)}>{update.type}</Badge>
                      </div>
                      <div className="flex items-center justify-between">
                        <p className="text-xs text-gray-500">{update.date}</p>
                        <Button variant="ghost" size="sm" className="text-[#BC4E82] hover:text-[#BC4E82]/80">
                          Learn More
                          <ArrowRight className="h-3 w-3 ml-1" />
                        </Button>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>
        </div>

        {/* Feedback Section */}
        <Card className="border-[#CD9BD2]/20 bg-gradient-to-r from-[#F4A2B9]/5 to-[#CD9BD2]/5">
          <CardHeader>
            <CardTitle className="text-[#212121]">Have a Feature Request?</CardTitle>
            <CardDescription>
              We'd love to hear your ideas for improving CareLumi. Your feedback helps shape our roadmap.
            </CardDescription>
          </CardHeader>
          <CardContent>
            <div className="flex items-center gap-4">
              <Button className="bg-gradient-to-r from-[#F4A2B9] to-[#CD9BD2] hover:from-[#F4A2B9]/90 hover:to-[#CD9BD2]/90 text-white">
                Submit Feature Request
              </Button>
              <Button
                variant="outline"
                className="border-[#CD9BD2] text-[#BC4E82] hover:bg-[#CD9BD2]/10 bg-transparent"
              >
                Join Beta Program
              </Button>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  )
}
