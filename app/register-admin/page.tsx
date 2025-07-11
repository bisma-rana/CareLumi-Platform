"use client"

import type React from "react"

import { useState, useEffect } from "react"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Checkbox } from "@/components/ui/checkbox"
import { Alert, AlertDescription } from "@/components/ui/alert"
import { Eye, EyeOff, CheckCircle2, AlertCircle, Loader2, Shield, Check, X } from "lucide-react"
import Link from "next/link"
import { useRouter } from "next/navigation"
import Image from "next/image"

interface AdminFormData {
  firstName: string
  lastName: string
  title: string
  email: string
  organizationName: string
  password: string
  confirmPassword: string
  agreeToTerms: boolean
}

interface FormErrors {
  firstName?: string
  lastName?: string
  title?: string
  email?: string
  organizationName?: string
  password?: string
  confirmPassword?: string
  agreeToTerms?: string
  general?: string
}

interface PasswordRequirement {
  id: string
  label: string
  test: (password: string) => boolean
  met: boolean
}

export default function RegisterAdminPage() {
  const router = useRouter()
  const [formData, setFormData] = useState<AdminFormData>({
    firstName: "",
    lastName: "",
    title: "",
    email: "",
    organizationName: "",
    password: "",
    confirmPassword: "",
    agreeToTerms: false,
  })

  const [errors, setErrors] = useState<FormErrors>({})
  const [showPassword, setShowPassword] = useState(false)
  const [showConfirmPassword, setShowConfirmPassword] = useState(false)
  const [isSubmitting, setIsSubmitting] = useState(false)
  const [registrationStep, setRegistrationStep] = useState<"form" | "2fa" | "success">("form")
  const [organizationId, setOrganizationId] = useState("")
  const [twoFactorCode, setTwoFactorCode] = useState("")
  const [twoFactorError, setTwoFactorError] = useState("")

  const [passwordRequirements, setPasswordRequirements] = useState<PasswordRequirement[]>([
    { id: "length", label: "At least 8 characters long", test: (p) => p.length >= 8, met: false },
    { id: "uppercase", label: "Contains at least one uppercase letter", test: (p) => /[A-Z]/.test(p), met: false },
    { id: "number", label: "Contains at least one number", test: (p) => /\d/.test(p), met: false },
    {
      id: "special",
      label: "Contains at least one special character",
      test: (p) => /[!@#$%^&*(),.?":{}|<>]/.test(p),
      met: false,
    },
  ])

  const titles = [
    "Center Director",
    "Center Administrator",
    "Executive Director",
    "Program Director",
    "Owner/Operator",
    "Assistant Director",
    "Regional Manager",
    "Operations Manager",
    "Other",
  ]

  // Real-time password validation
  useEffect(() => {
    setPasswordRequirements((prev) =>
      prev.map((req) => ({
        ...req,
        met: req.test(formData.password),
      })),
    )
  }, [formData.password])

  const validateEmail = (email: string): boolean => {
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/
    const publicDomains = ["gmail.com", "yahoo.com", "hotmail.com", "outlook.com", "aol.com"]
    const domain = email.split("@")[1]?.toLowerCase()
    return emailRegex.test(email) && !publicDomains.includes(domain)
  }

  const validatePassword = (password: string): boolean => {
    return passwordRequirements.every((req) => req.test(password))
  }

  const validateForm = (): boolean => {
    const newErrors: FormErrors = {}

    if (!formData.firstName.trim()) {
      newErrors.firstName = "First name is required"
    } else if (formData.firstName.trim().length < 2 || formData.firstName.trim().length > 50) {
      newErrors.firstName = "First name must be 2-50 characters"
    }

    if (!formData.lastName.trim()) {
      newErrors.lastName = "Last name is required"
    } else if (formData.lastName.trim().length < 2 || formData.lastName.trim().length > 50) {
      newErrors.lastName = "Last name must be 2-50 characters"
    }

    if (!formData.title.trim()) {
      newErrors.title = "Title is required"
    }

    if (!formData.email.trim()) {
      newErrors.email = "Email is required"
    } else if (!validateEmail(formData.email)) {
      newErrors.email = "Please enter a valid professional/organization email address"
    }

    if (!formData.organizationName.trim()) {
      newErrors.organizationName = "Organization name is required"
    }

    if (!formData.password) {
      newErrors.password = "Password is required"
    } else if (!validatePassword(formData.password)) {
      newErrors.password = "Password must meet all requirements listed below"
    }

    if (!formData.confirmPassword) {
      newErrors.confirmPassword = "Password confirmation is required"
    } else if (formData.password !== formData.confirmPassword) {
      newErrors.confirmPassword = "Passwords do not match"
    }

    if (!formData.agreeToTerms) {
      newErrors.agreeToTerms = "You must agree to the terms and conditions"
    }

    setErrors(newErrors)
    return Object.keys(newErrors).length === 0
  }

  const handleInputChange = (field: keyof AdminFormData, value: string | boolean) => {
    setFormData((prev) => ({ ...prev, [field]: value }))
    if (errors[field]) {
      setErrors((prev) => ({ ...prev, [field]: undefined }))
    }
  }

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    if (!validateForm()) return

    setIsSubmitting(true)
    setErrors({})

    try {
      await new Promise((resolve) => setTimeout(resolve, 2000))

      // Simulate email already exists error (10% chance)
      if (Math.random() < 0.1) {
        setErrors({ email: "An account with this email already exists" })
        setIsSubmitting(false)
        return
      }

      // Generate Organization ID and proceed to 2FA
      const orgId = `ORG-${Date.now().toString().slice(-6)}`
      setOrganizationId(orgId)
      setRegistrationStep("2fa")
    } catch (error) {
      setErrors({ general: "Registration failed. Please try again." })
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
        setRegistrationStep("success")
        setTimeout(() => {
          router.push("/dashboard/onboarding")
        }, 3000)
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

  if (registrationStep === "success") {
    return (
      <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-[#FEBC89]/20 to-[#CD9BD2]/20 p-4">
        <Card className="w-full max-w-md border-0 shadow-xl" role="main">
          <CardContent className="pt-6">
            <div className="flex flex-col items-center text-center space-y-4">
              <div className="h-16 w-16 rounded-full bg-gradient-to-r from-[#BC4E82] to-[#505691] flex items-center justify-center shadow-lg">
                <CheckCircle2 className="h-8 w-8 text-white" aria-hidden="true" />
              </div>
              <h1 className="text-2xl font-bold text-[#212121]">Welcome to CareLumi!</h1>
              <div className="space-y-2">
                <p className="text-gray-600">Your admin account has been created successfully.</p>
                <div className="bg-gradient-to-r from-[#FEBC89]/10 to-[#CD9BD2]/10 p-4 rounded-lg border border-[#CD9BD2]/20">
                  <p className="text-sm font-medium text-[#212121]">Organization ID: {organizationId}</p>
                  <p className="text-xs text-gray-600 mt-1">Share this ID with staff members for registration</p>
                </div>
              </div>
              <div className="flex items-center gap-2 text-sm text-gray-600" aria-live="polite">
                <Loader2 className="h-4 w-4 animate-spin" aria-hidden="true" />
                Redirecting to onboarding...
              </div>
            </div>
          </CardContent>
        </Card>
      </div>
    )
  }

  if (registrationStep === "2fa") {
    return (
      <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-[#FEBC89]/20 to-[#CD9BD2]/20 p-4">
        <Card className="w-full max-w-md border-0 shadow-xl" role="main">
          <CardHeader className="text-center">
            <div className="mb-4 flex justify-center">
              <div className="h-12 w-12 rounded-full bg-gradient-to-r from-[#BC4E82] to-[#505691] flex items-center justify-center shadow-lg">
                <Shield className="h-6 w-6 text-white" aria-hidden="true" />
              </div>
            </div>
            <CardTitle className="text-2xl text-[#212121]" id="verify-title">
              Verify Your Account
            </CardTitle>
            <p className="text-gray-600" id="verify-description">
              We've sent a 6-digit verification code to {formData.email}
            </p>
          </CardHeader>
          <CardContent>
            <form
              onSubmit={handleTwoFactorSubmit}
              className="space-y-4"
              aria-labelledby="verify-title"
              aria-describedby="verify-description"
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
                  autoComplete="one-time-code"
                />
              </div>

              <Button
                type="submit"
                className="w-full bg-gradient-to-r from-[#BC4E82] to-[#505691] hover:from-[#BC4E82]/90 hover:to-[#505691]/90 text-white font-medium shadow-lg gradient-button"
              >
                Verify Account
              </Button>

              <div className="text-center">
                <button
                  type="button"
                  onClick={resendTwoFactorCode}
                  className="text-sm text-[#BC4E82] hover:underline focus:underline focus:outline-none focus:ring-2 focus:ring-[#505691] focus:ring-offset-2 rounded px-2 py-1"
                >
                  Didn't receive the code? Resend
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
      <Card className="w-full max-w-4xl border-0 shadow-xl" role="main">
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
          <CardTitle className="text-2xl text-[#212121] font-semibold" id="register-title">
            Create Admin Account
          </CardTitle>
        </CardHeader>
        <CardContent className="px-8 pb-8">
          <form onSubmit={handleSubmit} className="space-y-6" aria-labelledby="register-title">
            {errors.general && (
              <Alert variant="destructive" className="border-red-200 bg-red-50" role="alert" aria-live="assertive">
                <AlertCircle className="h-4 w-4" aria-hidden="true" />
                <AlertDescription className="text-red-800">{errors.general}</AlertDescription>
              </Alert>
            )}

            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div className="space-y-2">
                <Label htmlFor="firstName" className="text-[#212121] font-medium">
                  First Name{" "}
                  <span className="text-red-600" aria-label="required">
                    *
                  </span>
                </Label>
                <Input
                  id="firstName"
                  type="text"
                  value={formData.firstName}
                  onChange={(e) => handleInputChange("firstName", e.target.value)}
                  className={`h-12 rounded-lg border-2 ${errors.firstName ? "error-field" : "border-[#CD9BD2]/30"} focus:border-[#505691] focus:ring-[#505691]/20`}
                  placeholder="Enter your first name"
                  required
                  aria-required="true"
                  aria-describedby={errors.firstName ? "firstName-error" : undefined}
                  autoComplete="given-name"
                />
                {errors.firstName && (
                  <div id="firstName-error" className="text-sm text-[#D32F2F] flex items-center gap-1" role="alert">
                    <AlertCircle className="h-3 w-3" aria-hidden="true" />
                    {errors.firstName}
                  </div>
                )}
              </div>

              <div className="space-y-2">
                <Label htmlFor="lastName" className="text-[#212121] font-medium">
                  Last Name{" "}
                  <span className="text-red-600" aria-label="required">
                    *
                  </span>
                </Label>
                <Input
                  id="lastName"
                  type="text"
                  value={formData.lastName}
                  onChange={(e) => handleInputChange("lastName", e.target.value)}
                  className={`h-12 rounded-lg border-2 ${errors.lastName ? "error-field" : "border-[#CD9BD2]/30"} focus:border-[#505691] focus:ring-[#505691]/20`}
                  placeholder="Enter your last name"
                  required
                  aria-required="true"
                  aria-describedby={errors.lastName ? "lastName-error" : undefined}
                  autoComplete="family-name"
                />
                {errors.lastName && (
                  <div id="lastName-error" className="text-sm text-[#D32F2F] flex items-center gap-1" role="alert">
                    <AlertCircle className="h-3 w-3" aria-hidden="true" />
                    {errors.lastName}
                  </div>
                )}
              </div>
            </div>

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
                onChange={(e) => handleInputChange("email", e.target.value)}
                className={`h-12 rounded-lg border-2 ${errors.email ? "error-field" : "border-[#CD9BD2]/30"} focus:border-[#505691] focus:ring-[#505691]/20`}
                placeholder="Enter your professional email"
                required
                aria-required="true"
                aria-describedby={errors.email ? "email-error" : "email-help"}
                autoComplete="email"
              />
              {errors.email && (
                <div id="email-error" className="text-sm text-[#D32F2F] flex items-center gap-1" role="alert">
                  <AlertCircle className="h-3 w-3" aria-hidden="true" />
                  {errors.email}
                </div>
              )}
              <p id="email-help" className="text-xs text-gray-600">
                Must be a professional or organization email address
              </p>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div className="space-y-2">
                <Label htmlFor="organizationName" className="text-[#212121] font-medium">
                  Organization Name{" "}
                  <span className="text-red-600" aria-label="required">
                    *
                  </span>
                </Label>
                <Input
                  id="organizationName"
                  type="text"
                  value={formData.organizationName}
                  onChange={(e) => handleInputChange("organizationName", e.target.value)}
                  className={`h-12 rounded-lg border-2 ${errors.organizationName ? "error-field" : "border-[#CD9BD2]/30"} focus:border-[#505691] focus:ring-[#505691]/20`}
                  placeholder="Enter your organization name"
                  required
                  aria-required="true"
                  aria-describedby={errors.organizationName ? "organizationName-error" : "organizationName-help"}
                  autoComplete="organization"
                />
                {errors.organizationName && (
                  <div
                    id="organizationName-error"
                    className="text-sm text-[#D32F2F] flex items-center gap-1"
                    role="alert"
                  >
                    <AlertCircle className="h-3 w-3" aria-hidden="true" />
                    {errors.organizationName}
                  </div>
                )}
                <p id="organizationName-help" className="text-xs text-gray-600">
                  This will create a new organization or link to an existing one
                </p>
              </div>

              <div className="space-y-2">
                <Label htmlFor="title" className="text-[#212121] font-medium">
                  Role/Title{" "}
                  <span className="text-red-600" aria-label="required">
                    *
                  </span>
                </Label>
                <Select value={formData.title} onValueChange={(value) => handleInputChange("title", value)} required>
                  <SelectTrigger
                    className={`h-12 rounded-lg border-2 ${errors.title ? "error-field" : "border-[#CD9BD2]/30"} focus:border-[#505691] focus:ring-[#505691]/20`}
                    aria-describedby={errors.title ? "title-error" : undefined}
                  >
                    <SelectValue placeholder="Select your title" />
                  </SelectTrigger>
                  <SelectContent>
                    {titles.map((title) => (
                      <SelectItem key={title} value={title}>
                        {title}
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
                {errors.title && (
                  <div id="title-error" className="text-sm text-[#D32F2F] flex items-center gap-1" role="alert">
                    <AlertCircle className="h-3 w-3" aria-hidden="true" />
                    {errors.title}
                  </div>
                )}
              </div>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
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
                    onChange={(e) => handleInputChange("password", e.target.value)}
                    className={`h-12 rounded-lg border-2 pr-12 ${errors.password ? "error-field" : "border-[#CD9BD2]/30"} focus:border-[#505691] focus:ring-[#505691]/20`}
                    placeholder="Create a password"
                    required
                    aria-required="true"
                    aria-describedby="password-requirements"
                    autoComplete="new-password"
                  />
                  <Button
                    type="button"
                    variant="ghost"
                    size="icon"
                    className="absolute right-0 top-0 h-12 px-3 hover:bg-transparent focus:bg-gray-100"
                    onClick={() => setShowPassword(!showPassword)}
                    aria-label={showPassword ? "Hide password" : "Show password"}
                    tabIndex={0}
                  >
                    {showPassword ? (
                      <EyeOff className="h-4 w-4 text-gray-500" aria-hidden="true" />
                    ) : (
                      <Eye className="h-4 w-4 text-gray-500" aria-hidden="true" />
                    )}
                  </Button>
                </div>
                {errors.password && (
                  <div className="text-sm text-[#D32F2F] flex items-center gap-1" role="alert">
                    <AlertCircle className="h-3 w-3" aria-hidden="true" />
                    {errors.password}
                  </div>
                )}
              </div>

              <div className="space-y-2">
                <Label htmlFor="confirmPassword" className="text-[#212121] font-medium">
                  Confirm Password{" "}
                  <span className="text-red-600" aria-label="required">
                    *
                  </span>
                </Label>
                <div className="relative">
                  <Input
                    id="confirmPassword"
                    type={showConfirmPassword ? "text" : "password"}
                    value={formData.confirmPassword}
                    onChange={(e) => handleInputChange("confirmPassword", e.target.value)}
                    className={`h-12 rounded-lg border-2 pr-12 ${errors.confirmPassword ? "error-field" : "border-[#CD9BD2]/30"} focus:border-[#505691] focus:ring-[#505691]/20`}
                    placeholder="Confirm your password"
                    required
                    aria-required="true"
                    aria-describedby={errors.confirmPassword ? "confirmPassword-error" : undefined}
                    autoComplete="new-password"
                  />
                  <Button
                    type="button"
                    variant="ghost"
                    size="icon"
                    className="absolute right-0 top-0 h-12 px-3 hover:bg-transparent focus:bg-gray-100"
                    onClick={() => setShowConfirmPassword(!showConfirmPassword)}
                    aria-label={showConfirmPassword ? "Hide confirm password" : "Show confirm password"}
                    tabIndex={0}
                  >
                    {showConfirmPassword ? (
                      <EyeOff className="h-4 w-4 text-gray-500" aria-hidden="true" />
                    ) : (
                      <Eye className="h-4 w-4 text-gray-500" aria-hidden="true" />
                    )}
                  </Button>
                </div>
                {errors.confirmPassword && (
                  <div
                    id="confirmPassword-error"
                    className="text-sm text-[#D32F2F] flex items-center gap-1"
                    role="alert"
                  >
                    <AlertCircle className="h-3 w-3" aria-hidden="true" />
                    {errors.confirmPassword}
                  </div>
                )}
              </div>
            </div>

            <div className="bg-gradient-to-r from-[#FEBC89]/10 to-[#CD9BD2]/10 p-4 rounded-lg border border-[#CD9BD2]/20">
              <div className="text-xs text-gray-700">
                <strong>Password requirements:</strong>
                <ul id="password-requirements" className="mt-2 space-y-1" aria-live="polite">
                  {passwordRequirements.map((req) => (
                    <li key={req.id} className="flex items-center gap-2">
                      {req.met ? (
                        <Check className="h-4 w-4 text-green-600" aria-hidden="true" />
                      ) : (
                        <X className="h-4 w-4 text-red-600" aria-hidden="true" />
                      )}
                      <span className={req.met ? "text-green-700" : "text-gray-700"}>{req.label}</span>
                      <span className="sr-only">{req.met ? "Requirement met" : "Requirement not met"}</span>
                    </li>
                  ))}
                </ul>
              </div>
            </div>

            <div className="space-y-2">
              <div className="flex items-start space-x-3">
                <Checkbox
                  id="agreeToTerms"
                  checked={formData.agreeToTerms}
                  onCheckedChange={(checked) => handleInputChange("agreeToTerms", checked as boolean)}
                  className="mt-1 border-[#CD9BD2] data-[state=checked]:bg-[#505691] data-[state=checked]:border-[#505691] w-4 h-4 rounded-sm"
                  required
                  aria-required="true"
                  aria-describedby={errors.agreeToTerms ? "terms-error" : "terms-desc"}
                />
                <Label htmlFor="agreeToTerms" className="text-sm text-[#212121] leading-relaxed cursor-pointer">
                  I agree to the{" "}
                  <Link
                    href="/terms"
                    className="text-[#BC4E82] hover:underline font-medium focus:underline focus:outline-none focus:ring-2 focus:ring-[#505691] focus:ring-offset-2 rounded px-1"
                    target="_blank"
                    rel="noopener noreferrer"
                  >
                    Terms and Conditions
                  </Link>{" "}
                  and{" "}
                  <Link
                    href="/privacy"
                    className="text-[#BC4E82] hover:underline font-medium focus:underline focus:outline-none focus:ring-2 focus:ring-[#505691] focus:ring-offset-2 rounded px-1"
                    target="_blank"
                    rel="noopener noreferrer"
                  >
                    Privacy Policy
                  </Link>{" "}
                  <span className="text-red-600" aria-label="required">
                    *
                  </span>
                </Label>
                <div id="terms-desc" className="sr-only">
                  You must agree to our terms and privacy policy to create an account
                </div>
              </div>
              {errors.agreeToTerms && (
                <div id="terms-error" className="text-sm text-[#D32F2F] flex items-center gap-1 ml-8" role="alert">
                  <AlertCircle className="h-3 w-3" aria-hidden="true" />
                  {errors.agreeToTerms}
                </div>
              )}
            </div>

            <Button
              type="submit"
              className="w-full h-12 bg-gradient-to-r from-[#BC4E82] to-[#505691] hover:from-[#BC4E82]/90 hover:to-[#505691]/90 text-white font-medium text-base rounded-lg shadow-lg gradient-button"
              disabled={isSubmitting}
              aria-describedby="submit-desc"
            >
              <span id="submit-desc" className="sr-only">
                Create your administrator account for CareLumi
              </span>
              {isSubmitting ? (
                <>
                  <Loader2 className="mr-2 h-5 w-5 animate-spin" aria-hidden="true" />
                  <span aria-live="polite">Creating Account...</span>
                </>
              ) : (
                "Create Admin Account"
              )}
            </Button>

            <div className="text-center space-y-2 text-sm text-gray-600">
              <div>
                Already have an account?{" "}
                <Link
                  href="/login"
                  className="text-[#BC4E82] hover:underline font-medium focus:underline focus:outline-none focus:ring-2 focus:ring-[#505691] focus:ring-offset-2 rounded px-1"
                >
                  Sign in here
                </Link>
              </div>
              <div>
                Staff member?{" "}
                <Link
                  href="/register-staff"
                  className="text-[#BC4E82] hover:underline font-medium focus:underline focus:outline-none focus:ring-2 focus:ring-[#505691] focus:ring-offset-2 rounded px-1"
                >
                  Register with Organization Code
                </Link>
              </div>
            </div>
          </form>
        </CardContent>
      </Card>
    </div>
  )
}
