"use client"

import type React from "react"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Alert, AlertDescription } from "@/components/ui/alert"
import { ArrowLeft, CheckCircle2, AlertCircle, Loader2 } from "lucide-react"
import Link from "next/link"
import Image from "next/image"

export default function ForgotPasswordPage() {
  const [email, setEmail] = useState("")
  const [isSubmitting, setIsSubmitting] = useState(false)
  const [isSuccess, setIsSuccess] = useState(false)
  const [error, setError] = useState("")

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setIsSubmitting(true)
    setError("")

    if (!email) {
      setError("Please enter your email address")
      setIsSubmitting(false)
      return
    }

    try {
      // Simulate API call
      await new Promise((resolve) => setTimeout(resolve, 2000))

      // Simulate success (90% chance)
      if (Math.random() < 0.9) {
        setIsSuccess(true)
      } else {
        setError("Email address not found. Please check and try again.")
      }
    } catch (error) {
      setError("Failed to send reset email. Please try again.")
    } finally {
      setIsSubmitting(false)
    }
  }

  if (isSuccess) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-[#FEBC89]/20 to-[#CD9BD2]/20 p-4">
        <Card className="w-full max-w-md border-0 shadow-xl">
          <CardContent className="pt-6">
            <div className="flex flex-col items-center text-center space-y-4">
              <div className="h-16 w-16 rounded-full bg-gradient-to-r from-[#FEBC89] to-[#FDD683] flex items-center justify-center shadow-lg">
                <CheckCircle2 className="h-8 w-8 text-white" />
              </div>
              <h2 className="text-2xl font-bold text-[#212121]">Check Your Email</h2>
              <p className="text-gray-600">We've sent password reset instructions to {email}</p>
              <div className="bg-gradient-to-r from-[#FEBC89]/10 to-[#FDD683]/10 p-4 rounded-lg w-full border border-[#FEBC89]/20">
                <p className="text-sm text-gray-700">
                  <strong>Didn't receive the email?</strong>
                  <br />
                  Check your spam folder or contact support if you continue to have issues.
                </p>
              </div>
              <Link href="/login">
                <Button className="bg-gradient-to-r from-[#F4A2B9] to-[#CD9BD2] hover:from-[#F4A2B9]/90 hover:to-[#CD9BD2]/90 text-white font-medium shadow-lg">
                  Back to Sign In
                </Button>
              </Link>
            </div>
          </CardContent>
        </Card>
      </div>
    )
  }

  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-[#FEBC89]/20 to-[#CD9BD2]/20 p-4">
      <Card className="w-full max-w-md border-0 shadow-xl">
        <CardHeader className="text-center">
          <div className="mb-4 flex justify-center">
            <Image src="/images/carelumi-icon.png" alt="CareLumi Icon" width={48} height={48} className="h-12 w-12" />
          </div>
          <CardTitle className="text-2xl text-[#212121] font-semibold">Reset Your Password</CardTitle>
          <CardDescription className="text-gray-600">
            Enter your email address and we'll send you instructions to reset your password
          </CardDescription>
        </CardHeader>
        <CardContent>
          <form onSubmit={handleSubmit} className="space-y-4">
            {error && (
              <Alert variant="destructive" className="border-red-200 bg-red-50">
                <AlertCircle className="h-4 w-4" />
                <AlertDescription className="text-red-800">{error}</AlertDescription>
              </Alert>
            )}

            <div className="space-y-2">
              <Label htmlFor="email" className="text-[#212121] font-medium">
                Email Address
              </Label>
              <Input
                id="email"
                type="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                placeholder="Enter your email address"
                className="h-12 rounded-lg border-2 border-[#CD9BD2]/30 focus:border-[#CD9BD2] focus:ring-[#CD9BD2]/20"
                required
              />
            </div>

            <Button
              type="submit"
              className="w-full h-12 bg-gradient-to-r from-[#F4A2B9] to-[#CD9BD2] hover:from-[#F4A2B9]/90 hover:to-[#CD9BD2]/90 text-white font-medium text-base rounded-lg shadow-lg"
              disabled={isSubmitting}
            >
              {isSubmitting ? (
                <>
                  <Loader2 className="mr-2 h-5 w-5 animate-spin" />
                  Sending Instructions...
                </>
              ) : (
                "Send Reset Instructions"
              )}
            </Button>

            <div className="text-center">
              <Link
                href="/login"
                className="inline-flex items-center text-sm text-[#BC4E82] hover:underline font-medium"
              >
                <ArrowLeft className="mr-1 h-4 w-4" />
                Back to Sign In
              </Link>
            </div>
          </form>
        </CardContent>
      </Card>
    </div>
  )
}
