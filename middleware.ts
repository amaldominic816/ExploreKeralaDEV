import { NextResponse } from "next/server"
import type { NextRequest } from "next/server"
import { createClient } from "@supabase/supabase-js"

export async function middleware(request: NextRequest) {
  // Check if the request is for the admin routes
  if (request.nextUrl.pathname.startsWith("/admin")) {
    // Skip for admin login page
    if (request.nextUrl.pathname === "/admin-login") {
      return NextResponse.next()
    }

    // Get the session from the request
    const supabase = createClient(process.env.NEXT_PUBLIC_SUPABASE_URL!, process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!, {
      auth: {
        persistSession: false,
      },
    })

    // Get the session from the request cookie
    const {
      data: { session },
    } = await supabase.auth.getSession()

    // If no session, redirect to login
    if (!session) {
      const url = new URL("/admin-login", request.url)
      url.searchParams.set("redirect", request.nextUrl.pathname)
      return NextResponse.redirect(url)
    }

    // Continue with the request
    return NextResponse.next()
  }

  // For non-admin routes, just continue
  return NextResponse.next()
}

export const config = {
  matcher: ["/admin/:path*"],
}
