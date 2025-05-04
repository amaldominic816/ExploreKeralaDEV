import { NextResponse } from "next/server"
import { supabaseAdmin } from "@/lib/supabase"

export async function POST(request: Request) {
  try {
    const { email, password, fullName } = await request.json()

    if (!email || !password || !fullName) {
      return NextResponse.json(
        { success: false, message: "Email, password, and full name are required" },
        { status: 400 },
      )
    }

    // Create the user in Supabase Auth
    const { data: authData, error: authError } = await supabaseAdmin.auth.admin.createUser({
      email,
      password,
      email_confirm: true,
      user_metadata: {
        full_name: fullName,
      },
    })

    if (authError) {
      console.error("Error creating auth user:", authError)
      return NextResponse.json({ success: false, message: authError.message }, { status: 500 })
    }

    // Create the user in the users table with admin role
    const { error: profileError } = await supabaseAdmin.from("users").insert({
      id: authData.user.id,
      full_name: fullName,
      role: "admin",
    })

    if (profileError) {
      console.error("Error creating user profile:", profileError)
      return NextResponse.json({ success: false, message: profileError.message }, { status: 500 })
    }

    return NextResponse.json({
      success: true,
      message: "Admin user created successfully",
    })
  } catch (error) {
    console.error("Error in admin create API:", error)
    return NextResponse.json({ success: false, message: "An unexpected error occurred" }, { status: 500 })
  }
}
