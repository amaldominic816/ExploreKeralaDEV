"use client"

import { useRouter } from "next/navigation"
import { Button } from "@/components/ui/button"
import { LogOut } from "lucide-react"
import type { ButtonProps } from "@/components/ui/button"
import { signOut } from "@/lib/auth"

interface LogoutButtonProps extends ButtonProps {}

export function LogoutButton({ variant = "ghost", size, ...props }: LogoutButtonProps) {
  const router = useRouter()

  async function handleLogout() {
    try {
      const result = await signOut()

      // If we have a redirect URL, navigate to it
      if (result?.redirectUrl) {
        window.location.href = result.redirectUrl
      } else {
        // Fallback to API route if server action doesn't provide a redirect
        const response = await fetch("/api/auth/logout", {
          method: "POST",
        })

        if (response.ok) {
          router.push("/")
          router.refresh()
        }
      }
    } catch (error) {
      console.error("Logout failed", error)
      // Fallback to client-side navigation
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
