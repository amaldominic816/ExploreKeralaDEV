"use client"

import Link from "next/link"
import Image from "next/image"
import { usePathname } from "next/navigation"
import { cn } from "@/lib/utils"
import {
  LayoutDashboard,
  Building2,
  Package,
  Sailboat,
  Car,
  Compass,
  Users,
  Settings,
  BarChart,
  Map,
} from "lucide-react"

const navItems = [
  { href: "/admin/dashboard", label: "Dashboard", icon: LayoutDashboard },
  { href: "/admin/destinations", label: "Destinations", icon: Map },
  { href: "/admin/hotels", label: "Hotels", icon: Building2 },
  { href: "/admin/packages", label: "Tour Packages", icon: Package },
  { href: "/admin/houseboats", label: "Houseboats", icon: Sailboat },
  { href: "/admin/taxis", label: "Taxis", icon: Car },
  { href: "/admin/activities", label: "Activities", icon: Compass },
  { href: "/admin/users", label: "Users", icon: Users },
  { href: "/admin/reports", label: "Reports", icon: BarChart },
  { href: "/admin/settings", label: "Settings", icon: Settings },
]

export function AdminSidebar() {
  const pathname = usePathname()

  return (
    <aside className="bg-gray-900 text-white w-64 flex-shrink-0 hidden md:flex flex-col">
      <div className="p-6 border-b border-gray-800">
        <Link href="/" className="flex items-center gap-2">
          <div className="relative h-8 w-8 rounded-full overflow-hidden">
            <Image src="/placeholder.svg?key=vydoy" alt="Explore Kerala Logo" fill className="object-cover" />
          </div>
          <div>
            <h1 className="text-lg font-bold">Explore Kerala</h1>
            <p className="text-xs text-gray-400">Admin Panel</p>
          </div>
        </Link>
      </div>

      <nav className="flex-1 overflow-y-auto py-6">
        <ul className="space-y-1 px-3">
          {navItems.map((item) => {
            const Icon = item.icon
            const isActive = pathname === item.href || pathname.startsWith(`${item.href}/`)

            return (
              <li key={item.href}>
                <Link
                  href={item.href}
                  className={cn(
                    "flex items-center gap-3 px-4 py-3 rounded-lg transition-colors",
                    isActive ? "bg-green-600 text-white" : "text-gray-400 hover:text-white hover:bg-gray-800",
                  )}
                >
                  <Icon className="h-5 w-5" />
                  <span>{item.label}</span>
                </Link>
              </li>
            )
          })}
        </ul>
      </nav>

      <div className="p-4 border-t border-gray-800">
        <div className="bg-gray-800 rounded-lg p-3 text-xs text-gray-400">
          <p>Need help with the admin panel?</p>
          <Link href="/admin/help" className="text-green-400 hover:underline block mt-1">
            View Documentation
          </Link>
        </div>
      </div>
    </aside>
  )
}
