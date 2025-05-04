import { LoginForm } from "@/components/login-form"
import Link from "next/link"

export default function AdminLoginPage() {
  return (
    <div className="min-h-screen flex flex-col">
      <header className="bg-gray-800 text-white p-4">
        <div className="container mx-auto">
          <Link href="/" className="text-xl font-bold">
            Explore Kerala - Admin
          </Link>
        </div>
      </header>

      <main className="flex-1 flex items-center justify-center p-4">
        <div className="w-full max-w-md">
          <h1 className="text-2xl font-bold text-center mb-6">Admin Login</h1>
          <LoginForm role="admin" />
          <div className="mt-4 text-center space-y-2">
            <p>
              <Link href="/login" className="text-gray-600 hover:underline">
                User Login
              </Link>
            </p>
            <p>
              <Link href="/admin-setup" className="text-green-600 hover:underline">
                Create Admin User
              </Link>
            </p>
          </div>
        </div>
      </main>

      <footer className="bg-gray-800 text-white p-4">
        <div className="container mx-auto text-center">
          <p>© 2024 Explore Kerala. All rights reserved.</p>
        </div>
      </footer>
    </div>
  )
}
