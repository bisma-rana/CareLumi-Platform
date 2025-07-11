import type React from "react"
import "./globals.css"
import { Inter } from "next/font/google"
import { ThemeProvider } from "@/components/theme-provider"
import Sidebar from "@/components/sidebar"

const inter = Inter({ subsets: ["latin"] })

export const metadata = {
  title: "CareLumi - Compliance Automation Platform",
  description: "AI-powered compliance and workforce automation for early childhood education providers",
    generator: 'v0.dev'
}

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode
}>) {
  return (
    <html lang="en" suppressHydrationWarning>
      <body className={inter.className}>
        <ThemeProvider attribute="class" defaultTheme="light" enableSystem disableTransitionOnChange>
          <AuthenticatedLayout>{children}</AuthenticatedLayout>
        </ThemeProvider>
      </body>
    </html>
  )
}

function AuthenticatedLayout({ children }: { children: React.ReactNode }) {
  // In a real app, you'd check authentication status here
  // For this mockup, we'll check the pathname
  if (typeof window !== "undefined") {
    const pathname = window.location.pathname
    const authPages = ["/login", "/register-admin", "/register-staff", "/forgot-password", "/terms", "/privacy"]
    const isAuthPage = authPages.some((page) => pathname.startsWith(page))

    if (isAuthPage) {
      return <main className="min-h-screen">{children}</main>
    }
  }

  return (
    <div className="flex h-screen overflow-hidden">
      <Sidebar />
      <main className="flex-1 overflow-y-auto bg-muted/20">{children}</main>
    </div>
  )
}
