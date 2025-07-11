import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import Link from "next/link"
import { ArrowLeft } from "lucide-react"

export default function TermsPage() {
  return (
    <div className="min-h-screen bg-muted/20 p-4">
      <div className="max-w-4xl mx-auto">
        <div className="mb-6">
          <Link href="/register">
            <Button variant="ghost" className="mb-4">
              <ArrowLeft className="mr-2 h-4 w-4" />
              Back to Registration
            </Button>
          </Link>
        </div>

        <Card>
          <CardHeader>
            <CardTitle className="text-2xl">Terms and Conditions</CardTitle>
            <p className="text-muted-foreground">Last updated: April 25, 2025</p>
          </CardHeader>
          <CardContent className="prose max-w-none">
            <h3 className="text-lg font-semibold mb-3">1. Acceptance of Terms</h3>
            <p className="mb-4">
              By accessing and using the CareLumi Compliance Automation Platform ("Service"), you accept and agree to be
              bound by the terms and provision of this agreement.
            </p>

            <h3 className="text-lg font-semibold mb-3">2. Use License</h3>
            <p className="mb-4">
              Permission is granted to temporarily use the CareLumi platform for personal, non-commercial transitory
              viewing only. This is the grant of a license, not a transfer of title, and under this license you may not:
            </p>
            <ul className="list-disc list-inside mb-4 space-y-1">
              <li>modify or copy the materials</li>
              <li>use the materials for any commercial purpose or for any public display</li>
              <li>attempt to reverse engineer any software contained on the platform</li>
              <li>remove any copyright or other proprietary notations from the materials</li>
            </ul>

            <h3 className="text-lg font-semibold mb-3">3. Data Privacy and Security</h3>
            <p className="mb-4">
              CareLumi is committed to protecting your privacy and the confidentiality of staff and organizational data.
              All data is encrypted and stored securely in compliance with applicable regulations including FERPA and
              state privacy laws.
            </p>

            <h3 className="text-lg font-semibold mb-3">4. Pilot Program Terms</h3>
            <p className="mb-4">
              This platform is currently in pilot phase with the Illinois Department of Early Childhood (ILDEC).
              Participation in the pilot program is subject to additional terms and conditions as outlined in your
              organization's pilot agreement.
            </p>

            <h3 className="text-lg font-semibold mb-3">5. User Responsibilities</h3>
            <p className="mb-4">Users are responsible for:</p>
            <ul className="list-disc list-inside mb-4 space-y-1">
              <li>Maintaining the confidentiality of their account credentials</li>
              <li>Ensuring accuracy of uploaded documentation</li>
              <li>Complying with all applicable laws and regulations</li>
              <li>Reporting any security concerns immediately</li>
            </ul>

            <h3 className="text-lg font-semibold mb-3">6. Limitation of Liability</h3>
            <p className="mb-4">
              In no event shall CareLumi or its suppliers be liable for any damages (including, without limitation,
              damages for loss of data or profit, or due to business interruption) arising out of the use or inability
              to use the platform.
            </p>

            <h3 className="text-lg font-semibold mb-3">7. Contact Information</h3>
            <p className="mb-4">If you have any questions about these Terms and Conditions, please contact us at:</p>
            <p className="mb-4">
              Email: support@carelumi.com
              <br />
              Phone: (555) 123-4567
              <br />
              Address: 123 Innovation Drive, Chicago, IL 60601
            </p>
          </CardContent>
        </Card>
      </div>
    </div>
  )
}
