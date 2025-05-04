import type React from "react"
import { UserHeader } from "@/components/user/header"
import { UserFooter } from "@/components/user/footer"
import { requireAuth } from "@/lib/auth"

export default async function DashboardLayout({
  children,
}: {
  children: React.ReactNode
}) {
  // Check if user is authenticated
  await requireAuth("user")

  return (
    <div className="min-h-screen flex flex-col">
      <UserHeader />
      <main className="flex-1 bg-gray-50">{children}</main>
      <UserFooter />
    </div>
  )
}
