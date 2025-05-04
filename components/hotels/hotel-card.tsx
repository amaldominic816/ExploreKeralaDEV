import type React from "react"
import Link from "next/link"
import Image from "next/image"
import { MapPin, Wifi, Coffee, Utensils, Waves } from "lucide-react"
import type { Hotel } from "@/types/database"
import { Button } from "@/components/ui/button"
import { Rating } from "@/components/ui/rating"
import { PriceTag } from "@/components/ui/price-tag"

interface HotelCardProps {
  hotel: Hotel
}

export function HotelCard({ hotel }: HotelCardProps) {
  // Map amenities to icons
  const amenityIcons: Record<string, React.ReactNode> = {
    WiFi: <Wifi className="h-4 w-4" />,
    Restaurant: <Utensils className="h-4 w-4" />,
    "Swimming Pool": <Waves className="h-4 w-4" />,
    Breakfast: <Coffee className="h-4 w-4" />,
  }

  return (
    <div className="flex flex-col md:flex-row gap-4 p-4 border rounded-lg bg-white shadow-sm hover:shadow-md transition-shadow">
      <div className="relative h-48 md:h-auto md:w-64 rounded-lg overflow-hidden">
        <Image
          src={hotel.images?.[0] || `/placeholder.svg?height=400&width=300&query=${hotel.name}+hotel+kerala`}
          alt={hotel.name}
          fill
          className="object-cover"
        />
      </div>

      <div className="flex-1 flex flex-col">
        <div>
          <h2 className="text-xl font-semibold">{hotel.name}</h2>

          <div className="flex items-center gap-1 text-gray-500 text-sm mt-1">
            <MapPin className="h-4 w-4" />
            <span>{hotel.address || hotel.destination?.name || "Kerala"}</span>
          </div>

          {hotel.star_rating && <Rating value={hotel.star_rating} className="mt-2" />}

          <p className="text-gray-600 mt-2 line-clamp-2">
            {hotel.description || "Experience a comfortable stay at this beautiful hotel in Kerala."}
          </p>

          {hotel.amenities && hotel.amenities.length > 0 && (
            <div className="flex flex-wrap gap-3 mt-3">
              {hotel.amenities.slice(0, 4).map((amenity) => (
                <div key={amenity} className="flex items-center gap-1 text-sm text-gray-600">
                  {amenityIcons[amenity] || null}
                  <span>{amenity}</span>
                </div>
              ))}
            </div>
          )}
        </div>

        <div className="flex justify-between items-end mt-auto pt-4">
          <PriceTag price={hotel.price_per_night} size="lg" />

          <Link href={`/hotels/${hotel.id}`}>
            <Button className="bg-green-600 hover:bg-green-700">View Details</Button>
          </Link>
        </div>
      </div>
    </div>
  )
}
