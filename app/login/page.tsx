import Link from "next/link"
import Image from "next/image"
import { MainHeader } from "@/components/main-header"
import { MainFooter } from "@/components/main-footer"
import { LoginForm } from "@/components/login-form"

export default function LoginPage() {
  return (
    <div className="min-h-screen flex flex-col">
      <MainHeader />

      <main className="flex-1 flex">
        <div className="flex flex-col md:flex-row w-full">
          <div className="w-full md:w-1/2 flex items-center justify-center p-8">
            <div className="max-w-md w-full">
              <div className="text-center mb-8">
                <h1 className="text-3xl font-bold">Welcome Back</h1>
                <p className="text-gray-500 mt-2">Sign in to your account to continue</p>
              </div>

              <LoginForm />

              <div className="mt-6 text-center">
                <p className="text-gray-500">
                  Don't have an account?{" "}
                  <Link href="/register" className="text-green-600 hover:underline">
                    Sign up
                  </Link>
                </p>
              </div>
            </div>
          </div>

          <div className="hidden md:block md:w-1/2 relative">
            <Image src="/placeholder.svg?key=7fh0d" alt="Kerala Landscape" fill className="object-cover" />
            <div className="absolute inset-0 bg-green-900/30" />
            <div className="absolute inset-0 flex items-center justify-center p-8">
              <div className="bg-white/90 p-8 rounded-lg max-w-md text-center">
                <h2 className="text-2xl font-bold text-green-800 mb-4">Explore Kerala</h2>
                <p className="text-gray-700">
                  Discover the beauty of God's Own Country with our comprehensive tourism platform.
                </p>
              </div>
            </div>
          </div>
        </div>
      </main>

      <MainFooter />
    </div>
  )
}
