import Link from "next/link"
import { Building2, Package, Sailboat, Car, Compass } from "lucide-react"

const options = [
  {
    title: "Book Hotels",
    icon: <Building2 className="h-8 w-8" />,
    href: "/hotels",
    color: "bg-blue-100 text-blue-600",
    description: "Find the perfect place to stay",
  },
  {
    title: "Tour Packages",
    icon: <Package className="h-8 w-8" />,
    href: "/packages",
    color: "bg-green-100 text-green-600",
    description: "Explore curated travel experiences",
  },
  {
    title: "Houseboats",
    icon: <Sailboat className="h-8 w-8" />,
    href: "/houseboats",
    color: "bg-amber-100 text-amber-600",
    description: "Experience Kerala's backwaters",
  },
  {
    title: "Taxis",
    icon: <Car className="h-8 w-8" />,
    href: "/taxis",
    color: "bg-purple-100 text-purple-600",
    description: "Convenient transportation options",
  },
  {
    title: "Activities",
    icon: <Compass className="h-8 w-8" />,
    href: "/activities",
    color: "bg-rose-100 text-rose-600",
    description: "Discover exciting things to do",
  },
]

export function QuickOptions() {
  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-5 gap-6">
      {options.map((option, index) => (
        <Link
          key={index}
          href={option.href}
          className="flex flex-col items-center text-center p-6 rounded-xl shadow-sm hover:shadow-md transition-all bg-white border border-gray-100"
        >
          <div className={`p-4 rounded-full mb-4 ${option.color}`}>{option.icon}</div>
          <h3 className="font-semibold text-lg mb-2">{option.title}</h3>
          <p className="text-gray-500 text-sm">{option.description}</p>
        </Link>
      ))}
    </div>
  )
}
