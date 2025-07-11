"use client"

import type React from "react"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Checkbox } from "@/components/ui/checkbox"
import { Alert, AlertDescription } from "@/components/ui/alert"
import { Eye, EyeOff, Loader2, AlertCircle, Shield } from "lucide-react"
import Link from "next/link"
import { useRouter } from "next/navigation"
import Image from "next/image"

export default function LoginPage() {
  const router = useRouter()
  const [formData, setFormData] = useState({
    email: "",
    password: "",
    rememberMe: false,
  })
  const [showPassword, setShowPassword] = useState(false)
  const [isSubmitting, setIsSubmitting] = useState(false)
  const [error, setError] = useState("")
  const [loginStep, setLoginStep] = useState<"credentials" | "2fa">("credentials")
  const [twoFactorCode, setTwoFactorCode] = useState("")
  const [twoFactorError, setTwoFactorError] = useState("")
  const [loginAttempts, setLoginAttempts] = useState(0)

  const handleCredentialsSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setIsSubmitting(true)
    setError("")

    try {
      await new Promise((resolve) => setTimeout(resolve, 1500))

      if (!formData.email || !formData.password) {
        setError("Please enter both email and password")
        return
      }

      // Role-based authentication
      if (formData.email === "admin@carelumi.com") {
        // Set admin role in localStorage for demo purposes
        localStorage.setItem("userRole", "admin")
        localStorage.setItem("userEmail", formData.email)
        localStorage.setItem("userName", "Jane Smith")
        router.push("/dashboard")
        return
      } else if (formData.email === "staff@carelumi.com") {
        // Set staff role in localStorage for demo purposes
        localStorage.setItem("userRole", "staff")
        localStorage.setItem("userEmail", formData.email)
        localStorage.setItem("userName", "Sarah Miller")
        router.push("/dashboard")
        return
      }

      // Simulate invalid credentials for other emails
      setLoginAttempts((prev) => prev + 1)
      if (loginAttempts >= 4) {
        setError("Too many failed attempts. Account locked for 15 minutes.")
      } else {
        setError("Invalid email or password. Please try admin@carelumi.com or staff@carelumi.com")
      }
    } catch (error) {
      setError("Login failed. Please try again.")
    } finally {
      setIsSubmitting(false)
    }
  }

  const handleTwoFactorSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setTwoFactorError("")

    if (!twoFactorCode || twoFactorCode.length !== 6) {
      setTwoFactorError("Please enter a valid 6-digit code")
      return
    }

    try {
      await new Promise((resolve) => setTimeout(resolve, 1500))

      // Simulate 2FA validation (90% success rate)
      if (Math.random() < 0.9) {
        router.push("/dashboard")
      } else {
        setTwoFactorError("Invalid code. Please try again.")
      }
    } catch (error) {
      setTwoFactorError("Verification failed. Please try again.")
    }
  }

  const resendTwoFactorCode = async () => {
    await new Promise((resolve) => setTimeout(resolve, 1000))
    setTwoFactorError("")
  }

  if (loginStep === "2fa") {
    return (
      <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-[#FEBC89]/20 to-[#CD9BD2]/20 p-4">
        <Card className="w-full max-w-md border-0 shadow-xl" role="main">
          <CardHeader className="text-center">
            <div className="mb-4 flex justify-center">
              <div className="h-12 w-12 rounded-full bg-gradient-to-r from-[#BC4E82] to-[#505691] flex items-center justify-center shadow-lg">
                <Shield className="h-6 w-6 text-white" aria-hidden="true" />
              </div>
            </div>
            <CardTitle className="text-2xl text-[#212121]" id="2fa-title">
              Two-Factor Authentication
            </CardTitle>
            <p className="text-gray-600" id="2fa-description">
              We've sent a 6-digit verification code to {formData.email}
            </p>
          </CardHeader>
          <CardContent>
            <form
              onSubmit={handleTwoFactorSubmit}
              className="space-y-4"
              aria-labelledby="2fa-title"
              aria-describedby="2fa-description"
            >
              {twoFactorError && (
                <Alert variant="destructive" className="border-red-200 bg-red-50" role="alert" aria-live="assertive">
                  <AlertCircle className="h-4 w-4" aria-hidden="true" />
                  <AlertDescription className="text-red-800">{twoFactorError}</AlertDescription>
                </Alert>
              )}

              <div className="space-y-2">
                <Label htmlFor="twoFactorCode" className="text-[#212121] font-medium">
                  Verification Code{" "}
                  <span className="text-red-600" aria-label="required">
                    *
                  </span>
                </Label>
                <Input
                  id="twoFactorCode"
                  type="text"
                  value={twoFactorCode}
                  onChange={(e) => setTwoFactorCode(e.target.value.replace(/\D/g, "").slice(0, 6))}
                  placeholder="Enter 6-digit code"
                  className="text-center text-lg tracking-widest border-[#CD9BD2]/30 focus:border-[#505691] focus:ring-[#505691]/20"
                  maxLength={6}
                  required
                  aria-required="true"
                  aria-describedby={twoFactorError ? "2fa-error" : undefined}
                  autoComplete="one-time-code"
                />
                {twoFactorError && (
                  <div id="2fa-error" className="sr-only">
                    {twoFactorError}
                  </div>
                )}
              </div>

              <Button
                type="submit"
                className="w-full bg-gradient-to-r from-[#BC4E82] to-[#505691] hover:from-[#BC4E82]/90 hover:to-[#505691]/90 text-white font-medium shadow-lg gradient-button"
                aria-describedby="verify-button-desc"
              >
                <span id="verify-button-desc" className="sr-only">
                  Verify your account with the 6-digit code
                </span>
                Verify & Sign In
              </Button>

              <div className="text-center">
                <button
                  type="button"
                  onClick={resendTwoFactorCode}
                  className="text-sm text-[#BC4E82] hover:underline focus:underline focus:outline-none focus:ring-2 focus:ring-[#505691] focus:ring-offset-2 rounded px-2 py-1"
                  aria-describedby="resend-desc"
                >
                  <span id="resend-desc" className="sr-only">
                    Request a new verification code to be sent to your email
                  </span>
                  Didn't receive the code? Resend
                </button>
              </div>

              <div className="text-center">
                <button
                  type="button"
                  onClick={() => setLoginStep("credentials")}
                  className="text-sm text-gray-600 hover:underline focus:underline focus:outline-none focus:ring-2 focus:ring-[#505691] focus:ring-offset-2 rounded px-2 py-1"
                >
                  Back to login
                </button>
              </div>
            </form>
          </CardContent>
        </Card>
      </div>
    )
  }

  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-[#FEBC89]/20 to-[#CD9BD2]/20 p-4">
      <Card className="w-full max-w-md border-0 shadow-xl" role="main">
        <CardHeader className="text-center pb-6">
          <div className="mb-6 flex justify-center">
            <Image
              src="/images/carelumi-logo.png"
              alt="CareLumi Logo - Compliance Automation Platform"
              width={280}
              height={80}
              className="h-20 w-auto"
            />
          </div>
          <CardTitle className="text-2xl text-[#212121] font-semibold" id="login-title">
            Welcome Back
          </CardTitle>
        </CardHeader>
        <CardContent className="px-6 pb-6">
          <form onSubmit={handleCredentialsSubmit} className="space-y-4" aria-labelledby="login-title">
            {error && (
              <Alert variant="destructive" className="border-red-200 bg-red-50" role="alert" aria-live="assertive">
                <AlertCircle className="h-4 w-4" aria-hidden="true" />
                <AlertDescription className="text-red-800">{error}</AlertDescription>
              </Alert>
            )}

            <div className="space-y-2">
              <Label htmlFor="email" className="text-[#212121] font-medium">
                Email Address{" "}
                <span className="text-red-600" aria-label="required">
                  *
                </span>
              </Label>
              <Input
                id="email"
                type="email"
                value={formData.email}
                onChange={(e) => setFormData((prev) => ({ ...prev, email: e.target.value }))}
                placeholder="Enter your email"
                className="h-12 rounded-lg border-2 border-[#CD9BD2]/30 focus:border-[#505691] focus:ring-[#505691]/20"
                required
                aria-required="true"
                autoComplete="email"
                aria-describedby="email-desc"
              />
              <div id="email-desc" className="sr-only">
                Enter the email address associated with your CareLumi account
              </div>
            </div>

            <div className="space-y-2">
              <Label htmlFor="password" className="text-[#212121] font-medium">
                Password{" "}
                <span className="text-red-600" aria-label="required">
                  *
                </span>
              </Label>
              <div className="relative">
                <Input
                  id="password"
                  type={showPassword ? "text" : "password"}
                  value={formData.password}
                  onChange={(e) => setFormData((prev) => ({ ...prev, password: e.target.value }))}
                  className="h-12 rounded-lg border-2 border-[#CD9BD2]/30 focus:border-[#505691] focus:ring-[#505691]/20 pr-12"
                  placeholder="Enter your password"
                  required
                  aria-required="true"
                  autoComplete="current-password"
                  aria-describedby="password-toggle-desc"
                />
                <Button
                  type="button"
                  variant="ghost"
                  size="icon"
                  className="absolute right-0 top-0 h-12 px-3 hover:bg-transparent focus:bg-gray-100"
                  onClick={() => setShowPassword(!showPassword)}
                  aria-label={showPassword ? "Hide password" : "Show password"}
                  aria-describedby="password-toggle-desc"
                  tabIndex={0}
                >
                  {showPassword ? (
                    <EyeOff className="h-4 w-4 text-gray-500" aria-hidden="true" />
                  ) : (
                    <Eye className="h-4 w-4 text-gray-500" aria-hidden="true" />
                  )}
                </Button>
                <div id="password-toggle-desc" className="sr-only">
                  Toggle password visibility
                </div>
              </div>
            </div>

            <div className="flex items-center justify-between">
              <div className="flex items-center space-x-2">
                <Checkbox
                  id="rememberMe"
                  checked={formData.rememberMe}
                  onCheckedChange={(checked) => setFormData((prev) => ({ ...prev, rememberMe: checked as boolean }))}
                  className="border-[#CD9BD2] data-[state=checked]:bg-[#505691] data-[state=checked]:border-[#505691] w-4 h-4 rounded-sm"
                  aria-describedby="remember-desc"
                />
                <Label htmlFor="rememberMe" className="text-sm text-[#212121] cursor-pointer">
                  Remember me
                </Label>
                <div id="remember-desc" className="sr-only">
                  Keep me signed in on this device
                </div>
              </div>
              <Link
                href="/forgot-password"
                className="text-sm text-[#BC4E82] hover:underline font-medium focus:underline focus:outline-none focus:ring-2 focus:ring-[#505691] focus:ring-offset-2 rounded px-2 py-1"
              >
                Forgot password?
              </Link>
            </div>

            <Button
              type="submit"
              className="w-full h-12 bg-gradient-to-r from-[#BC4E82] to-[#505691] hover:from-[#BC4E82]/90 hover:to-[#505691]/90 text-white font-medium text-base rounded-lg shadow-lg gradient-button"
              disabled={isSubmitting}
              aria-describedby="signin-button-desc"
            >
              <span id="signin-button-desc" className="sr-only">
                Sign in to your CareLumi account
              </span>
              {isSubmitting ? (
                <>
                  <Loader2 className="mr-2 h-5 w-5 animate-spin" aria-hidden="true" />
                  <span aria-live="polite">Signing In...</span>
                </>
              ) : (
                "Sign In"
              )}
            </Button>

            <div className="text-center space-y-3 text-sm text-gray-600">
              <div>
                New administrator?{" "}
                <Link
                  href="/register-admin"
                  className="text-[#BC4E82] hover:underline font-medium focus:underline focus:outline-none focus:ring-2 focus:ring-[#505691] focus:ring-offset-2 rounded px-1"
                >
                  Create account
                </Link>
              </div>
              <div>
                Staff member?{" "}
                <Link
                  href="/register-staff"
                  className="text-[#BC4E82] hover:underline font-medium focus:underline focus:outline-none focus:ring-2 focus:ring-[#505691] focus:ring-offset-2 rounded px-1"
                >
                  Join with organization link
                </Link>
              </div>
              <div className="text-xs text-gray-500 mt-4 pt-2 border-t border-gray-200">
                New user? Contact your administrator.
              </div>
            </div>
          </form>
        </CardContent>
        <div className="px-6 pb-6">
          <div className="text-center text-xs text-gray-500 border-t border-gray-200 pt-4">
            © 2025 CareLumi. All rights reserved.
          </div>
        </div>
      </Card>
    </div>
  )
}
