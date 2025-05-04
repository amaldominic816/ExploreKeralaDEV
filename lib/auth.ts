"use server"

import { cookies } from "next/headers"
import { redirect } from "next/navigation"
import { createClient } from "@supabase/supabase-js"
import { supabaseAdmin } from "./supabase"
import type { User } from "@/types/database"

export async function signUp(formData: FormData) {
  const email = formData.get("email") as string
  const password = formData.get("password") as string
  const fullName = formData.get("fullName") as string

  if (!email || !password || !fullName) {
    return { success: false, message: "All fields are required" }
  }

  try {
    // Create a Supabase client using cookies
    const cookieStore = cookies()
    const supabase = createClient(process.env.NEXT_PUBLIC_SUPABASE_URL!, process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!, {
      cookies: {
        get(name: string) {
          return cookieStore.get(name)?.value
        },
        set(name: string, value: string, options: any) {
          cookieStore.set({ name, value, ...options })
        },
        remove(name: string, options: any) {
          cookieStore.set({ name, value: "", ...options })
        },
      },
    })

    // Sign up the user
    const { data, error } = await supabase.auth.signUp({
      email,
      password,
      options: {
        data: {
          full_name: fullName,
        },
      },
    })

    if (error) {
      return { success: false, message: error.message }
    }

    // Create a record in the users table
    if (data.user) {
      const { error: profileError } = await supabaseAdmin.from("users").insert({
        id: data.user.id,
        full_name: fullName,
        role: "user",
      })

      if (profileError) {
        return { success: false, message: profileError.message }
      }
    }

    // Since email confirmation is disabled, we can return a success message
    // without mentioning email confirmation
    return {
      success: true,
      message: "Registration successful! You can now log in.",
    }
  } catch (error) {
    console.error("Error in signUp:", error)
    return { success: false, message: "An unexpected error occurred" }
  }
}

export async function signIn(formData: FormData) {
  const email = formData.get("email") as string
  const password = formData.get("password") as string
  const role = (formData.get("role") as "user" | "admin") || "user"

  if (!email || !password) {
    return { success: false, message: "Email and password are required" }
  }

  try {
    console.log(`Attempting to sign in as ${role} with email: ${email}`)

    // Create a Supabase client using cookies
    const cookieStore = cookies()
    const supabase = createClient(process.env.NEXT_PUBLIC_SUPABASE_URL!, process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!, {
      cookies: {
        get(name: string) {
          return cookieStore.get(name)?.value
        },
        set(name: string, value: string, options: any) {
          cookieStore.set({ name, value, ...options })
        },
        remove(name: string, options: any) {
          cookieStore.set({ name, value: "", ...options })
        },
      },
    })

    // First, sign in the user
    const { data, error } = await supabase.auth.signInWithPassword({
      email,
      password,
    })

    if (error) {
      console.error("Supabase auth error:", error.message)

      // If the error is about email confirmation, we'll try to handle it
      if (error.message.includes("Email not confirmed")) {
        // Try to get the user by email
        const { data: userData } = await supabaseAdmin.from("auth.users").select("*").eq("email", email).single()

        if (userData) {
          // If we found the user, try to update their email_confirmed_at field
          try {
            await supabaseAdmin.auth.admin.updateUserById(userData.id, {
              email_confirmed_at: new Date().toISOString(),
            })

            // Try signing in again
            const { data: retryData, error: retryError } = await supabase.auth.signInWithPassword({
              email,
              password,
            })

            if (!retryError) {
              // Check role after successful retry
              if (role === "admin") {
                return await checkAdminRole(supabase, retryData.user.id)
              }
              return { success: true }
            }
          } catch (updateError) {
            console.error("Failed to update user:", updateError)
          }
        }

        return { success: false, message: "Login failed. Please register again or contact support." }
      }

      return { success: false, message: error.message }
    }

    // If we're here, the sign-in was successful
    console.log("Sign in successful, user ID:", data.user.id)

    // For admin role, check if the user actually has admin privileges
    if (role === "admin") {
      return await checkAdminRole(supabase, data.user.id)
    }

    // For regular users, just return success
    return { success: true }
  } catch (error) {
    console.error("Error in signIn:", error)
    return { success: false, message: "An unexpected error occurred" }
  }
}

// Helper function to check admin role
async function checkAdminRole(supabase: any, userId: string) {
  try {
    console.log("Checking admin role for user:", userId)

    // First try to get the user from the users table
    const { data: userData, error: userError } = await supabase.from("users").select("role").eq("id", userId).single()

    if (userError) {
      console.error("Error fetching user role:", userError.message)

      // If the users table doesn't exist or has other issues, create an admin user
      if (process.env.NODE_ENV === "development") {
        console.log("Development mode: Creating admin user")
        try {
          await supabaseAdmin.from("users").upsert({
            id: userId,
            role: "admin",
            full_name: "Admin User",
          })
          return { success: true, message: "Admin access granted (development mode)" }
        } catch (insertError) {
          console.error("Failed to create admin user:", insertError)
        }
      }

      await supabase.auth.signOut()
      return { success: false, message: "User not found or database error" }
    }

    console.log("User role:", userData?.role)

    if (!userData || userData.role !== "admin") {
      console.log("User does not have admin role")
      await supabase.auth.signOut()
      return { success: false, message: "You do not have admin privileges" }
    }

    console.log("Admin role confirmed")
    return { success: true }
  } catch (error) {
    console.error("Error in checkAdminRole:", error)
    await supabase.auth.signOut()
    return { success: false, message: "Error checking admin privileges" }
  }
}

// Modified signOut function to handle redirect properly
export async function signOut() {
  // Create a Supabase client using cookies
  const cookieStore = cookies()
  const supabase = createClient(process.env.NEXT_PUBLIC_SUPABASE_URL!, process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!, {
    cookies: {
      get(name: string) {
        return cookieStore.get(name)?.value
      },
      set(name: string, value: string, options: any) {
        cookieStore.set({ name, value, ...options })
      },
      remove(name: string, options: any) {
        cookieStore.set({ name, value: "", ...options })
      },
    },
  })

  // Sign out the user
  await supabase.auth.signOut()

  // Return a redirect URL instead of calling redirect directly
  return { redirectUrl: "/" }
}

export async function getSession() {
  try {
    // Create a Supabase client using cookies
    const cookieStore = cookies()
    const supabase = createClient(process.env.NEXT_PUBLIC_SUPABASE_URL!, process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!, {
      cookies: {
        get(name: string) {
          return cookieStore.get(name)?.value
        },
        set(name: string, value: string, options: any) {
          cookieStore.set({ name, value, ...options })
        },
        remove(name: string, options: any) {
          cookieStore.set({ name, value: "", ...options })
        },
      },
    })

    const { data, error } = await supabase.auth.getSession()

    if (error || !data.session) {
      return null
    }

    // Get user profile data
    try {
      const { data: userData } = await supabase.from("users").select("*").eq("id", data.session.user.id).single()

      return {
        session: data.session,
        user: userData as User,
      }
    } catch (err) {
      console.error("Error fetching user data:", err)
      // Return a mock user if the users table doesn't exist yet
      return {
        session: data.session,
        user: {
          id: data.session.user.id,
          full_name: data.session.user.user_metadata.full_name || "User",
          phone_number: null,
          address: null,
          city: null,
          state: null,
          country: null,
          postal_code: null,
          role: "user",
          created_at: new Date().toISOString(),
          updated_at: new Date().toISOString(),
        } as User,
      }
    }
  } catch (error) {
    console.error("Error in getSession:", error)
    return null
  }
}

export async function requireAuth(role?: "admin" | "user") {
  const sessionData = await getSession()

  if (!sessionData?.session) {
    redirect("/login")
  }

  if (role && sessionData.user.role !== role) {
    if (role === "admin") {
      redirect("/")
    } else {
      redirect("/admin")
    }
  }

  return sessionData
}
