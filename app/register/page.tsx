"use client"

import type React from "react"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Checkbox } from "@/components/ui/checkbox"
import { Alert, AlertDescription } from "@/components/ui/alert"
import { Eye, EyeOff, CheckCircle2, AlertCircle, Loader2 } from "lucide-react"
import Link from "next/link"
import { useRouter } from "next/navigation"

interface FormData {
  firstName: string
  lastName: string
  title: string
  email: string
  organization: string
  password: string
  confirmPassword: string
  agreeToTerms: boolean
}

interface FormErrors {
  firstName?: string
  lastName?: string
  email?: string
  organization?: string
  password?: string
  confirmPassword?: string
  agreeToTerms?: string
  general?: string
}

export default function RegisterPage() {
  const router = useRouter()
  const [formData, setFormData] = useState<FormData>({
    firstName: "",
    lastName: "",
    title: "",
    email: "",
    organization: "",
    password: "",
    confirmPassword: "",
    agreeToTerms: false,
  })

  const [errors, setErrors] = useState<FormErrors>({})
  const [showPassword, setShowPassword] = useState(false)
  const [showConfirmPassword, setShowConfirmPassword] = useState(false)
  const [isSubmitting, setIsSubmitting] = useState(false)
  const [isSuccess, setIsSuccess] = useState(false)

  const organizations = [
    "Little Learners Academy",
    "Bright Beginnings Center",
    "Sunshine Daycare",
    "Rainbow Children's Center",
    "Happy Hearts Preschool",
    "Growing Minds Academy",
    "Tiny Tots Learning Center",
    "Future Leaders Daycare",
    "Creative Kids Academy",
    "Other (Contact Support)",
  ]

  const titles = [
    "Center Administrator",
    "Center Director",
    "Assistant Director",
    "Lead Teacher",
    "Program Coordinator",
    "Compliance Officer",
    "Other",
  ]

  const validateEmail = (email: string): boolean => {
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/
    const publicDomains = ["gmail.com", "yahoo.com", "hotmail.com", "outlook.com", "aol.com"]
    const domain = email.split("@")[1]?.toLowerCase()

    return emailRegex.test(email) && !publicDomains.includes(domain)
  }

  const validatePassword = (password: string): boolean => {
    const minLength = password.length >= 8
    const hasUppercase = /[A-Z]/.test(password)
    const hasNumber = /\d/.test(password)
    const hasSpecialChar = /[!@#$%^&*(),.?":{}|<>]/.test(password)

    return minLength && hasUppercase && hasNumber && hasSpecialChar
  }

  const validateForm = (): boolean => {
    const newErrors: FormErrors = {}

    // First Name validation
    if (!formData.firstName.trim()) {
      newErrors.firstName = "First name is required"
    } else if (formData.firstName.trim().length < 2) {
      newErrors.firstName = "First name must be at least 2 characters"
    } else if (formData.firstName.trim().length > 50) {
      newErrors.firstName = "First name must be less than 50 characters"
    }

    // Last Name validation
    if (!formData.lastName.trim()) {
      newErrors.lastName = "Last name is required"
    } else if (formData.lastName.trim().length < 2) {
      newErrors.lastName = "Last name must be at least 2 characters"
    } else if (formData.lastName.trim().length > 50) {
      newErrors.lastName = "Last name must be less than 50 characters"
    }

    // Email validation
    if (!formData.email.trim()) {
      newErrors.email = "Email is required"
    } else if (!validateEmail(formData.email)) {
      newErrors.email = "Please enter a valid professional/organization email address"
    }

    // Organization validation
    if (!formData.organization) {
      newErrors.organization = "Organization is required"
    }

    // Password validation
    if (!formData.password) {
      newErrors.password = "Password is required"
    } else if (!validatePassword(formData.password)) {
      newErrors.password = "Password must be at least 8 characters with uppercase, number, and special character"
    }

    // Confirm Password validation
    if (!formData.confirmPassword) {
      newErrors.confirmPassword = "Password confirmation is required"
    } else if (formData.password !== formData.confirmPassword) {
      newErrors.confirmPassword = "Passwords do not match"
    }

    // Terms agreement validation
    if (!formData.agreeToTerms) {
      newErrors.agreeToTerms = "You must agree to the terms and conditions"
    }

    setErrors(newErrors)
    return Object.keys(newErrors).length === 0
  }

  const handleInputChange = (field: keyof FormData, value: string | boolean) => {
    setFormData((prev) => ({ ...prev, [field]: value }))

    // Clear specific field error when user starts typing
    if (errors[field]) {
      setErrors((prev) => ({ ...prev, [field]: undefined }))
    }
  }

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()

    if (!validateForm()) {
      return
    }

    setIsSubmitting(true)
    setErrors({})

    try {
      // Simulate API call
      await new Promise((resolve) => setTimeout(resolve, 2000))

      // Simulate email already exists error (10% chance)
      if (Math.random() < 0.1) {
        setErrors({ email: "An account with this email already exists" })
        setIsSubmitting(false)
        return
      }

      // Simulate organization not found error (5% chance)
      if (formData.organization === "Other (Contact Support)" || Math.random() < 0.05) {
        setErrors({
          organization: "Organization not found. Please contact support for onboarding assistance.",
        })
        setIsSubmitting(false)
        return
      }

      // Success
      setIsSuccess(true)

      // Redirect to dashboard after showing success message
      setTimeout(() => {
        router.push("/dashboard")
      }, 3000)
    } catch (error) {
      setErrors({ general: "Registration failed. Please try again." })
    } finally {
      setIsSubmitting(false)
    }
  }

  if (isSuccess) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-muted/20 p-4">
        <Card className="w-full max-w-md">
          <CardContent className="pt-6">
            <div className="flex flex-col items-center text-center space-y-4">
              <div className="h-12 w-12 rounded-full bg-green-100 flex items-center justify-center">
                <CheckCircle2 className="h-6 w-6 text-green-600" />
              </div>
              <h2 className="text-xl font-semibold">Registration Successful!</h2>
              <p className="text-muted-foreground">
                Welcome to CareLumi! A confirmation email has been sent to {formData.email}. You'll be redirected to
                your dashboard shortly.
              </p>
              <div className="flex items-center gap-2 text-sm text-muted-foreground">
                <Loader2 className="h-4 w-4 animate-spin" />
                Redirecting to dashboard...
              </div>
            </div>
          </CardContent>
        </Card>
      </div>
    )
  }

  return (
    <div className="min-h-screen flex items-center justify-center bg-muted/20 p-4">
      <Card className="w-full max-w-2xl">
        <CardHeader className="text-center">
          <div className="mb-4">
            <h1 className="text-3xl font-bold text-primary">CareLumi</h1>
            <p className="text-sm text-muted-foreground">Compliance Automation Platform</p>
          </div>
          <CardTitle className="text-2xl">Create Your Account</CardTitle>
          <CardDescription>
            Join the pilot program for AI-powered compliance automation in early childhood education
          </CardDescription>
        </CardHeader>
        <CardContent>
          <form onSubmit={handleSubmit} className="space-y-4">
            {errors.general && (
              <Alert variant="destructive">
                <AlertCircle className="h-4 w-4" />
                <AlertDescription>{errors.general}</AlertDescription>
              </Alert>
            )}

            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div className="space-y-2">
                <Label htmlFor="firstName">
                  First Name <span className="text-red-500">*</span>
                </Label>
                <Input
                  id="firstName"
                  type="text"
                  value={formData.firstName}
                  onChange={(e) => handleInputChange("firstName", e.target.value)}
                  className={errors.firstName ? "border-red-500" : ""}
                  placeholder="Enter your first name"
                />
                {errors.firstName && <p className="text-sm text-red-500">{errors.firstName}</p>}
              </div>

              <div className="space-y-2">
                <Label htmlFor="lastName">
                  Last Name <span className="text-red-500">*</span>
                </Label>
                <Input
                  id="lastName"
                  type="text"
                  value={formData.lastName}
                  onChange={(e) => handleInputChange("lastName", e.target.value)}
                  className={errors.lastName ? "border-red-500" : ""}
                  placeholder="Enter your last name"
                />
                {errors.lastName && <p className="text-sm text-red-500">{errors.lastName}</p>}
              </div>
            </div>

            <div className="space-y-2">
              <Label htmlFor="title">Title/Position</Label>
              <Select value={formData.title} onValueChange={(value) => handleInputChange("title", value)}>
                <SelectTrigger>
                  <SelectValue placeholder="Select your title (optional)" />
                </SelectTrigger>
                <SelectContent>
                  {titles.map((title) => (
                    <SelectItem key={title} value={title}>
                      {title}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>

            <div className="space-y-2">
              <Label htmlFor="email">
                Email Address <span className="text-red-500">*</span>
              </Label>
              <Input
                id="email"
                type="email"
                value={formData.email}
                onChange={(e) => handleInputChange("email", e.target.value)}
                className={errors.email ? "border-red-500" : ""}
                placeholder="Enter your professional email"
              />
              {errors.email && <p className="text-sm text-red-500">{errors.email}</p>}
              <p className="text-xs text-muted-foreground">
                Please use your professional or organization email address
              </p>
            </div>

            <div className="space-y-2">
              <Label htmlFor="organization">
                Organization <span className="text-red-500">*</span>
              </Label>
              <Select value={formData.organization} onValueChange={(value) => handleInputChange("organization", value)}>
                <SelectTrigger className={errors.organization ? "border-red-500" : ""}>
                  <SelectValue placeholder="Select your organization" />
                </SelectTrigger>
                <SelectContent>
                  {organizations.map((org) => (
                    <SelectItem key={org} value={org}>
                      {org}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
              {errors.organization && <p className="text-sm text-red-500">{errors.organization}</p>}
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div className="space-y-2">
                <Label htmlFor="password">
                  Password <span className="text-red-500">*</span>
                </Label>
                <div className="relative">
                  <Input
                    id="password"
                    type={showPassword ? "text" : "password"}
                    value={formData.password}
                    onChange={(e) => handleInputChange("password", e.target.value)}
                    className={errors.password ? "border-red-500 pr-10" : "pr-10"}
                    placeholder="Create a password"
                  />
                  <Button
                    type="button"
                    variant="ghost"
                    size="icon"
                    className="absolute right-0 top-0 h-full px-3 py-2 hover:bg-transparent"
                    onClick={() => setShowPassword(!showPassword)}
                  >
                    {showPassword ? (
                      <EyeOff className="h-4 w-4 text-muted-foreground" />
                    ) : (
                      <Eye className="h-4 w-4 text-muted-foreground" />
                    )}
                  </Button>
                </div>
                {errors.password && <p className="text-sm text-red-500">{errors.password}</p>}
              </div>

              <div className="space-y-2">
                <Label htmlFor="confirmPassword">
                  Confirm Password <span className="text-red-500">*</span>
                </Label>
                <div className="relative">
                  <Input
                    id="confirmPassword"
                    type={showConfirmPassword ? "text" : "password"}
                    value={formData.confirmPassword}
                    onChange={(e) => handleInputChange("confirmPassword", e.target.value)}
                    className={errors.confirmPassword ? "border-red-500 pr-10" : "pr-10"}
                    placeholder="Confirm your password"
                  />
                  <Button
                    type="button"
                    variant="ghost"
                    size="icon"
                    className="absolute right-0 top-0 h-full px-3 py-2 hover:bg-transparent"
                    onClick={() => setShowConfirmPassword(!showConfirmPassword)}
                  >
                    {showConfirmPassword ? (
                      <EyeOff className="h-4 w-4 text-muted-foreground" />
                    ) : (
                      <Eye className="h-4 w-4 text-muted-foreground" />
                    )}
                  </Button>
                </div>
                {errors.confirmPassword && <p className="text-sm text-red-500">{errors.confirmPassword}</p>}
              </div>
            </div>

            <div className="space-y-2">
              <div className="text-xs text-muted-foreground">
                Password requirements:
                <ul className="list-disc list-inside mt-1 space-y-1">
                  <li>At least 8 characters long</li>
                  <li>Contains at least one uppercase letter</li>
                  <li>Contains at least one number</li>
                  <li>Contains at least one special character</li>
                </ul>
              </div>
            </div>

            <div className="space-y-2">
              <div className="flex items-center space-x-2">
                <Checkbox
                  id="agreeToTerms"
                  checked={formData.agreeToTerms}
                  onCheckedChange={(checked) => handleInputChange("agreeToTerms", checked as boolean)}
                />
                <Label htmlFor="agreeToTerms" className="text-sm">
                  I agree to the{" "}
                  <Link href="/terms" className="text-primary hover:underline">
                    Terms and Conditions
                  </Link>{" "}
                  and{" "}
                  <Link href="/privacy" className="text-primary hover:underline">
                    Privacy Policy
                  </Link>{" "}
                  <span className="text-red-500">*</span>
                </Label>
              </div>
              {errors.agreeToTerms && <p className="text-sm text-red-500">{errors.agreeToTerms}</p>}
            </div>

            <Button type="submit" className="w-full" disabled={isSubmitting}>
              {isSubmitting ? (
                <>
                  <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                  Creating Account...
                </>
              ) : (
                "Create Account"
              )}
            </Button>

            <div className="text-center text-sm text-muted-foreground">
              Already have an account?{" "}
              <Link href="/login" className="text-primary hover:underline">
                Sign in here
              </Link>
            </div>
          </form>
        </CardContent>
      </Card>
    </div>
  )
}
