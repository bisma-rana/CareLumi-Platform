"use client"

import { useState } from "react"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { CheckSquare, Award, MessageSquare } from "lucide-react"
import OnboardingChecklist from "@/components/onboarding-checklist"
import CredentialsTracker from "@/components/credentials-tracker"
import IncidentReports from "@/components/incident-reports"
import ComplianceOverview from "@/components/compliance-overview"

export default function MyCompliancePage() {
  const [activeTab, setActiveTab] = useState("overview")

  return (
    <div className="flex-1 space-y-6 p-6">
      <div className="flex items-center justify-between">
        <div>
          <h2 className="text-3xl font-bold tracking-tight text-[#212121]">My Compliance Folder</h2>
          <p className="text-gray-600">Manage your onboarding, credentials, and compliance requirements</p>
        </div>
        <div className="text-right">
          <p className="text-sm font-medium text-[#212121]">Sarah Miller</p>
          <p className="text-xs text-gray-600">Lead Teacher • Kemit Academy</p>
        </div>
      </div>

      <Tabs value={activeTab} onValueChange={setActiveTab} className="space-y-6">
        <TabsList className="grid w-full grid-cols-4">
          <TabsTrigger value="overview" className="flex items-center gap-2">
            <CheckSquare className="h-4 w-4" />
            Overview
          </TabsTrigger>
          <TabsTrigger value="onboarding" className="flex items-center gap-2">
            <CheckSquare className="h-4 w-4" />
            Onboarding
          </TabsTrigger>
          <TabsTrigger value="credentials" className="flex items-center gap-2">
            <Award className="h-4 w-4" />
            Credentials
          </TabsTrigger>
          <TabsTrigger value="incidents" className="flex items-center gap-2">
            <MessageSquare className="h-4 w-4" />
            Incidents
          </TabsTrigger>
        </TabsList>

        <TabsContent value="overview" className="space-y-6">
          <ComplianceOverview />
        </TabsContent>

        <TabsContent value="onboarding" className="space-y-6">
          <OnboardingChecklist />
        </TabsContent>

        <TabsContent value="credentials" className="space-y-6">
          <CredentialsTracker />
        </TabsContent>

        <TabsContent value="incidents" className="space-y-6">
          <IncidentReports />
        </TabsContent>
      </Tabs>
    </div>
  )
}
