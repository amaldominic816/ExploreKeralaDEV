"use client"

import { Button } from "@/components/ui/button"
import { LogOut } from "lucide-react"
import type { ButtonProps } from "@/components/ui/button"

interface AdminLogoutButtonProps extends ButtonProps {}

export function AdminLogoutButton({ variant = "ghost", size, ...props }: AdminLogoutButtonProps) {
  async function handleLogout() {
    try {
      // Use the API route for client-side logout
      const response = await fetch("/api/auth/logout", {
        method: "POST",
      })

      if (response.ok) {
        window.location.href = "/"
      }
    } catch (error) {
      console.error("Logout failed", error)
      // Fallback to direct navigation
      window.location.href = "/"
    }
  }

  return (
    <Button variant={variant} size={size} onClick={handleLogout} {...props}>
      <LogOut className="h-4 w-4 mr-2" />
      <span>Logout</span>
    </Button>
  )
}
