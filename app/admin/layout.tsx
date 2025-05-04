import type React from "react"
import { AdminSidebar } from "@/components/admin/sidebar"
import { AdminHeader } from "@/components/admin/header"
import { cookies } from "next/headers"
import { createClient } from "@supabase/supabase-js"
import { redirect } from "next/navigation"

export default async function AdminLayout({
  children,
}: {
  children: React.ReactNode
}) {
  // Check if user is authenticated and has admin role
  const cookieStore = cookies()
  const supabase = createClient(process.env.NEXT_PUBLIC_SUPABASE_URL!, process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!, {
    cookies: {
      get(name: string) {
        return cookieStore.get(name)?.value
      },
    },
  })

  const { data: sessionData } = await supabase.auth.getSession()

  // If no session, redirect to login
  if (!sessionData?.session) {
    redirect("/admin-login")
  }

  // Check if user has admin role
  try {
    const { data: userData, error } = await supabase
      .from("users")
      .select("role")
      .eq("id", sessionData.session.user.id)
      .single()

    // If error or not admin, redirect
    if (error || !userData || userData.role !== "admin") {
      // Sign out and redirect
      await supabase.auth.signOut()
      redirect("/admin-login?error=not_admin")
    }
  } catch (error) {
    console.error("Error checking admin role:", error)
    redirect("/admin-login?error=server_error")
  }

  return (
    <div className="min-h-screen flex flex-col md:flex-row bg-gray-50">
      <AdminSidebar />
      <div className="flex-1 flex flex-col">
        <AdminHeader />
        <main className="flex-1 p-6 overflow-auto">{children}</main>
      </div>
    </div>
  )
}
