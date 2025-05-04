import Link from "next/link"
import Image from "next/image"
import { Clock } from "lucide-react"
import type { Package } from "@/types/database"
import { PriceTag } from "@/components/ui/price-tag"
import { Badge } from "@/components/ui/badge"

interface PackageCardProps {
  package: Package
}

export function PackageCard({ package: pkg }: PackageCardProps) {
  const discountedPrice = pkg.discount_percentage > 0 ? pkg.price * (1 - pkg.discount_percentage / 100) : pkg.price

  return (
    <Link href={`/packages/${pkg.id}`}>
      <div className="group bg-white rounded-lg overflow-hidden shadow-md transition-all hover:shadow-lg">
        <div className="relative aspect-[16/9]">
          <Image
            src={pkg.images?.[0] || `/placeholder.svg?height=400&width=600&query=${pkg.name}+kerala+package`}
            alt={pkg.name}
            fill
            className="object-cover transition-transform duration-300 group-hover:scale-105"
          />

          {pkg.discount_percentage > 0 && (
            <Badge className="absolute top-2 right-2 bg-green-600">{pkg.discount_percentage}% OFF</Badge>
          )}
        </div>

        <div className="p-4">
          <h3 className="text-lg font-semibold mb-1">{pkg.name}</h3>

          <div className="flex items-center text-gray-500 mb-2">
            <Clock className="h-4 w-4 mr-1" />
            <span>{pkg.duration}</span>
          </div>

          <PriceTag price={discountedPrice} originalPrice={pkg.discount_percentage > 0 ? pkg.price : undefined} />
        </div>
      </div>
    </Link>
  )
}
