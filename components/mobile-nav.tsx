"use client"

import { useState } from "react"
import Link from "next/link"
import { Menu, X } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Sheet, SheetContent, SheetTrigger } from "@/components/ui/sheet"
import type { User } from "@/types/database"

interface MobileNavProps {
  user?: User | null
}

export function MobileNav({ user }: MobileNavProps) {
  const [open, setOpen] = useState(false)

  async function handleSignOut() {
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
    <Sheet open={open} onOpenChange={setOpen}>
      <SheetTrigger asChild>
        <Button variant="ghost" size="icon" className="text-white">
          <Menu className="h-6 w-6" />
          <span className="sr-only">Toggle menu</span>
        </Button>
      </SheetTrigger>
      <SheetContent side="right" className="w-[300px] sm:w-[400px]">
        <div className="flex flex-col h-full">
          <div className="flex items-center justify-between border-b pb-4">
            <h2 className="text-lg font-semibold">Menu</h2>
            <Button variant="ghost" size="icon" onClick={() => setOpen(false)}>
              <X className="h-5 w-5" />
            </Button>
          </div>

          <nav className="flex flex-col gap-4 py-6">
            <Link
              href="/destinations"
              className="px-2 py-1 hover:text-green-600 transition-colors"
              onClick={() => setOpen(false)}
            >
              Destinations
            </Link>
            <Link
              href="/hotels"
              className="px-2 py-1 hover:text-green-600 transition-colors"
              onClick={() => setOpen(false)}
            >
              Hotels
            </Link>
            <Link
              href="/packages"
              className="px-2 py-1 hover:text-green-600 transition-colors"
              onClick={() => setOpen(false)}
            >
              Packages
            </Link>
            <Link
              href="/houseboats"
              className="px-2 py-1 hover:text-green-600 transition-colors"
              onClick={() => setOpen(false)}
            >
              Houseboats
            </Link>
            <Link
              href="/activities"
              className="px-2 py-1 hover:text-green-600 transition-colors"
              onClick={() => setOpen(false)}
            >
              Activities
            </Link>
            <Link
              href="/setup"
              className="px-2 py-1 hover:text-green-600 transition-colors"
              onClick={() => setOpen(false)}
            >
              Setup Guide
            </Link>
          </nav>

          <div className="mt-auto border-t pt-4">
            {user ? (
              <div className="space-y-3">
                <p className="text-sm text-gray-500">
                  Signed in as <span className="font-medium text-gray-900">{user.full_name}</span>
                </p>

                <div className="grid gap-2">
                  {user.role === "admin" && (
                    <Link href="/admin" onClick={() => setOpen(false)}>
                      <Button variant="outline" className="w-full">
                        Admin Dashboard
                      </Button>
                    </Link>
                  )}
                  <Link href="/dashboard" onClick={() => setOpen(false)}>
                    <Button variant="outline" className="w-full">
                      My Dashboard
                    </Button>
                  </Link>
                  <Button onClick={handleSignOut} variant="ghost" className="w-full">
                    Sign Out
                  </Button>
                </div>
              </div>
            ) : (
              <div className="grid gap-2">
                <Link href="/login" onClick={() => setOpen(false)}>
                  <Button variant="outline" className="w-full">
                    Login
                  </Button>
                </Link>
                <Link href="/admin-login" onClick={() => setOpen(false)}>
                  <Button variant="outline" className="w-full">
                    Admin Login
                  </Button>
                </Link>
                <Link href="/register" onClick={() => setOpen(false)}>
                  <Button className="w-full">Sign Up</Button>
                </Link>
              </div>
            )}
          </div>
        </div>
      </SheetContent>
    </Sheet>
  )
}
