"use client"

import type React from "react"

import { useState } from "react"
import { useRouter } from "next/navigation"
import { signIn } from "@/lib/auth"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Alert, AlertDescription } from "@/components/ui/alert"
import { AlertCircle } from "lucide-react"

interface LoginFormProps {
  role?: "user" | "admin"
}

export function LoginForm({ role = "user" }: LoginFormProps) {
  const router = useRouter()
  const [isLoading, setIsLoading] = useState(false)
  const [error, setError] = useState<string | null>(null)
  const [debugInfo, setDebugInfo] = useState<string | null>(null)

  async function handleSubmit(event: React.FormEvent<HTMLFormElement>) {
    event.preventDefault()
    setIsLoading(true)
    setError(null)
    setDebugInfo("Processing login...")

    const formData = new FormData(event.currentTarget)
    formData.append("role", role) // Add role to form data

    try {
      const result = await signIn(formData)
      console.log("Login result:", result) // Debug log
      setDebugInfo(`Login result: ${JSON.stringify(result)}`)

      if (result.success) {
        setDebugInfo(`Login successful, redirecting to ${role === "admin" ? "/admin/dashboard" : "/dashboard"}...`)

        // Use window.location for a hard redirect instead of Next.js router
        // This ensures a full page reload which can help with session issues
        if (role === "admin") {
          window.location.href = "/admin/dashboard"
        } else {
          window.location.href = "/dashboard"
        }
      } else {
        setError(result.message || "Login failed")
        setDebugInfo(`Login failed: ${result.message || "Unknown error"}`)
        setIsLoading(false)
      }
    } catch (err) {
      console.error("Login error:", err)
      setError("An unexpected error occurred")
      setDebugInfo(`Error: ${err instanceof Error ? err.message : String(err)}`)
      setIsLoading(false)
    }
  }

  return (
    <form onSubmit={handleSubmit} className="space-y-4">
      {error && (
        <Alert variant="destructive">
          <AlertCircle className="h-4 w-4" />
          <AlertDescription>
            {error && error.includes("Email not confirmed")
              ? "Login failed. Please try registering again or contact support."
              : error || "Login failed. Please check your credentials and try again."}
          </AlertDescription>
        </Alert>
      )}

      {debugInfo && (
        <Alert className="bg-blue-50 text-blue-800 border-blue-200">
          <AlertDescription className="font-mono text-xs">{debugInfo}</AlertDescription>
        </Alert>
      )}

      <div className="space-y-2">
        <Label htmlFor="email">Email</Label>
        <Input id="email" name="email" type="email" placeholder="you@example.com" required />
      </div>

      <div className="space-y-2">
        <div className="flex items-center justify-between">
          <Label htmlFor="password">Password</Label>
          <a href="/forgot-password" className="text-sm text-green-600 hover:underline">
            Forgot password?
          </a>
        </div>
        <Input id="password" name="password" type="password" required />
      </div>

      <Button type="submit" className="w-full bg-green-600 hover:bg-green-700" disabled={isLoading}>
        {isLoading ? "Signing in..." : `Sign In${role === "admin" ? " as Admin" : ""}`}
      </Button>
    </form>
  )
}
