import { getSession, signOut } from "@/lib/auth"
import { Bell, ChevronDown, Settings } from "lucide-react"
import { Button } from "@/components/ui/button"
import Image from "next/image"
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu"

export async function AdminHeader() {
  const sessionData = await getSession()
  const user = sessionData?.user

  if (!user) return null

  return (
    <header className="border-b bg-white p-4 shadow-sm">
      <div className="flex justify-between items-center">
        <h2 className="text-xl font-semibold">Admin Dashboard</h2>

        <div className="flex items-center gap-4">
          <Button variant="ghost" size="icon" className="relative">
            <Bell className="h-5 w-5" />
            <span className="absolute top-1 right-1 h-2 w-2 rounded-full bg-red-500"></span>
          </Button>

          <DropdownMenu>
            <DropdownMenuTrigger asChild>
              <Button variant="ghost" className="flex items-center gap-2">
                <div className="relative h-8 w-8 rounded-full overflow-hidden">
                  <Image src="/placeholder.svg?key=trwm9" alt="User" fill className="object-cover" />
                </div>
                <div className="hidden md:block text-left">
                  <p className="text-sm font-medium">{user.full_name}</p>
                  <p className="text-xs text-gray-500">Administrator</p>
                </div>
                <ChevronDown className="h-4 w-4" />
              </Button>
            </DropdownMenuTrigger>
            <DropdownMenuContent align="end" className="w-56">
              <DropdownMenuLabel>My Account</DropdownMenuLabel>
              <DropdownMenuSeparator />
              <DropdownMenuItem>
                <Settings className="mr-2 h-4 w-4" />
                <span>Settings</span>
              </DropdownMenuItem>
              <DropdownMenuItem>
                <form
                  action={async () => {
                    const result = await signOut()
                    if (result?.redirectUrl) {
                      window.location.href = result.redirectUrl
                    }
                  }}
                  className="w-full"
                >
                  <Button type="submit" variant="ghost" className="w-full justify-start p-0 h-auto font-normal">
                    Sign out
                  </Button>
                </form>
              </DropdownMenuItem>
            </DropdownMenuContent>
          </DropdownMenu>
        </div>
      </div>
    </header>
  )
}
