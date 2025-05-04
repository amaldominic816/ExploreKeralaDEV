import Link from "next/link"
import { getSession } from "@/lib/auth"
import { LogoutButton } from "@/components/logout-button"
import { Button } from "@/components/ui/button"
import { Building2, Package, Sailboat, Car, Compass, User } from "lucide-react"

export async function UserHeader() {
  const session = await getSession()

  return (
    <header className="bg-white border-b">
      <div className="container mx-auto px-4">
        <div className="flex justify-between items-center h-16">
          <Link href="/" className="text-xl font-bold text-green-600">
            Explore Kerala
          </Link>

          <nav className="hidden md:flex items-center space-x-6">
            <Link href="/hotels" className="flex items-center gap-1 text-gray-600 hover:text-green-600">
              <Building2 className="h-4 w-4" />
              <span>Hotels</span>
            </Link>
            <Link href="/packages" className="flex items-center gap-1 text-gray-600 hover:text-green-600">
              <Package className="h-4 w-4" />
              <span>Packages</span>
            </Link>
            <Link href="/houseboats" className="flex items-center gap-1 text-gray-600 hover:text-green-600">
              <Sailboat className="h-4 w-4" />
              <span>Houseboats</span>
            </Link>
            <Link href="/taxis" className="flex items-center gap-1 text-gray-600 hover:text-green-600">
              <Car className="h-4 w-4" />
              <span>Taxis</span>
            </Link>
            <Link href="/activities" className="flex items-center gap-1 text-gray-600 hover:text-green-600">
              <Compass className="h-4 w-4" />
              <span>Activities</span>
            </Link>
          </nav>

          <div className="flex items-center gap-2">
            <Link href="/dashboard">
              <Button variant="ghost" size="sm" className="flex items-center gap-1">
                <User className="h-4 w-4" />
                <span>{session?.user.name}</span>
              </Button>
            </Link>
            <LogoutButton />
          </div>
        </div>
      </div>
    </header>
  )
}
