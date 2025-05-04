import Link from "next/link"
import Image from "next/image"
import { getSession } from "@/lib/auth"
import { Button } from "@/components/ui/button"
import { MobileNav } from "@/components/mobile-nav"

export async function MainHeader() {
  const sessionData = await getSession()
  const user = sessionData?.user

  return (
    <header className="bg-gradient-to-r from-green-700 to-green-600 text-white">
      <div className="container mx-auto px-4 py-4">
        <div className="flex justify-between items-center">
          <Link href="/" className="flex items-center gap-2">
            <div className="relative h-10 w-10 rounded-full overflow-hidden border-2 border-white">
              <Image src="/placeholder.svg?key=svrjj" alt="Explore Kerala Logo" fill className="object-cover" />
            </div>
            <span className="text-xl font-bold">Explore Kerala</span>
          </Link>

          <div className="hidden md:flex items-center gap-6">
            <Link href="/destinations" className="hover:text-green-200 transition-colors">
              Destinations
            </Link>
            <Link href="/hotels" className="hover:text-green-200 transition-colors">
              Hotels
            </Link>
            <Link href="/packages" className="hover:text-green-200 transition-colors">
              Packages
            </Link>
            <Link href="/houseboats" className="hover:text-green-200 transition-colors">
              Houseboats
            </Link>
            <Link href="/activities" className="hover:text-green-200 transition-colors">
              Activities
            </Link>
          </div>

          <div className="flex items-center gap-2">
            {user ? (
              <div className="flex items-center gap-2">
                {user.role === "admin" && (
                  <Link href="/admin">
                    <Button variant="outline" className="text-white border-white hover:bg-green-700">
                      Admin
                    </Button>
                  </Link>
                )}
                <Link href="/dashboard">
                  <Button variant="outline" className="text-white border-white hover:bg-green-700">
                    Dashboard
                  </Button>
                </Link>
              </div>
            ) : (
              <div className="flex items-center gap-2">
                <Link href="/login">
                  <Button variant="outline" className="text-white border-white hover:bg-green-700">
                    Login
                  </Button>
                </Link>
                <Link href="/admin-login" className="hidden md:block">
                  <Button variant="outline" className="text-white border-white hover:bg-green-700">
                    Admin Login
                  </Button>
                </Link>
                <Link href="/register" className="hidden md:block">
                  <Button className="bg-white text-green-700 hover:bg-green-100">Sign Up</Button>
                </Link>
              </div>
            )}

            <Link href="/setup" className="ml-2 hidden md:block">
              <Button variant="outline" size="sm" className="text-white border-white hover:bg-green-700">
                Setup Guide
              </Button>
            </Link>

            <div className="md:hidden">
              <MobileNav user={user} />
            </div>
          </div>
        </div>
      </div>
    </header>
  )
}
