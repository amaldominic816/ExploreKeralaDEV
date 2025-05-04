import Link from "next/link"
import Image from "next/image"
import { MapPin } from "lucide-react"
import type { Destination } from "@/types/database"

interface DestinationCardProps {
  destination: Destination
}

export function DestinationCard({ destination }: DestinationCardProps) {
  return (
    <Link href={`/destinations/${destination.id}`}>
      <div className="group relative overflow-hidden rounded-lg shadow-md transition-all hover:shadow-lg">
        <div className="aspect-[4/3] relative">
          <Image
            src={destination.image_url || `/placeholder.svg?height=400&width=600&query=${destination.name}+kerala`}
            alt={destination.name}
            fill
            className="object-cover transition-transform duration-300 group-hover:scale-105"
          />
          <div className="absolute inset-0 bg-gradient-to-t from-black/70 to-transparent" />
        </div>

        <div className="absolute bottom-0 left-0 right-0 p-4 text-white">
          <h3 className="text-xl font-bold mb-1">{destination.name}</h3>
          {destination.location && (
            <div className="flex items-center text-sm">
              <MapPin className="h-4 w-4 mr-1" />
              <span>{destination.location}</span>
            </div>
          )}
        </div>
      </div>
    </Link>
  )
}
