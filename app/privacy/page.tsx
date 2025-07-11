import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import Link from "next/link"
import { ArrowLeft } from "lucide-react"

export default function PrivacyPage() {
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
            <CardTitle className="text-2xl">Privacy Policy</CardTitle>
            <p className="text-muted-foreground">Last updated: April 25, 2025</p>
          </CardHeader>
          <CardContent className="prose max-w-none">
            <h3 className="text-lg font-semibold mb-3">1. Information We Collect</h3>
            <p className="mb-4">
              We collect information you provide directly to us, such as when you create an account, upload documents,
              or contact us for support. This includes:
            </p>
            <ul className="list-disc list-inside mb-4 space-y-1">
              <li>Personal information (name, email address, phone number)</li>
              <li>Professional information (job title, organization)</li>
              <li>Staff documentation and compliance records</li>
              <li>Usage data and platform interactions</li>
            </ul>

            <h3 className="text-lg font-semibold mb-3">2. How We Use Your Information</h3>
            <p className="mb-4">We use the information we collect to:</p>
            <ul className="list-disc list-inside mb-4 space-y-1">
              <li>Provide, maintain, and improve our services</li>
              <li>Process and organize compliance documentation</li>
              <li>Send you technical notices and support messages</li>
              <li>Respond to your comments and questions</li>
              <li>Analyze usage patterns to improve the platform</li>
            </ul>

            <h3 className="text-lg font-semibold mb-3">3. Information Sharing</h3>
            <p className="mb-4">
              We do not sell, trade, or otherwise transfer your personal information to third parties except:
            </p>
            <ul className="list-disc list-inside mb-4 space-y-1">
              <li>With your explicit consent</li>
              <li>To comply with legal obligations</li>
              <li>To authorized DCFS representatives as part of compliance processes</li>
              <li>To service providers who assist in platform operations (under strict confidentiality agreements)</li>
            </ul>

            <h3 className="text-lg font-semibold mb-3">4. Data Security</h3>
            <p className="mb-4">
              We implement appropriate technical and organizational measures to protect your personal information
              against unauthorized access, alteration, disclosure, or destruction. This includes:
            </p>
            <ul className="list-disc list-inside mb-4 space-y-1">
              <li>Encryption of data in transit and at rest</li>
              <li>Regular security assessments and updates</li>
              <li>Access controls and authentication measures</li>
              <li>Staff training on data protection practices</li>
            </ul>

            <h3 className="text-lg font-semibold mb-3">5. Data Retention</h3>
            <p className="mb-4">
              We retain your information for as long as necessary to provide our services and comply with legal
              obligations. Staff compliance records may be retained according to state and federal requirements for
              early childhood education providers.
            </p>

            <h3 className="text-lg font-semibold mb-3">6. Your Rights</h3>
            <p className="mb-4">You have the right to:</p>
            <ul className="list-disc list-inside mb-4 space-y-1">
              <li>Access and update your personal information</li>
              <li>Request deletion of your data (subject to legal requirements)</li>
              <li>Opt out of non-essential communications</li>
              <li>Request a copy of your data</li>
            </ul>

            <h3 className="text-lg font-semibold mb-3">7. Contact Us</h3>
            <p className="mb-4">If you have questions about this Privacy Policy, please contact us at:</p>
            <p className="mb-4">
              Email: privacy@carelumi.com
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
