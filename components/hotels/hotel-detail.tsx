"use client"

import { useState } from "react"
import { useRouter } from "next/navigation"
import { MapPin } from "lucide-react"
import { format, addDays } from "date-fns"
import type { Hotel } from "@/types/database"
import { ImageGallery } from "@/components/ui/image-gallery"
import { Rating } from "@/components/ui/rating"
import { PriceTag } from "@/components/ui/price-tag"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { DatePicker } from "@/components/ui/date-picker"

interface HotelDetailProps {
  hotel: Hotel
}

export function HotelDetail({ hotel }: HotelDetailProps) {
  const router = useRouter()
  const [checkIn, setCheckIn] = useState<Date | undefined>(new Date())
  const [checkOut, setCheckOut] = useState<Date | undefined>(addDays(new Date(), 1))
  const [adults, setAdults] = useState(2)
  const [children, setChildren] = useState(0)

  const nights = checkIn && checkOut ? Math.ceil((checkOut.getTime() - checkIn.getTime()) / (1000 * 60 * 60 * 24)) : 1

  const totalPrice = hotel.price_per_night * nights

  const handleBookNow = () => {
    // Format dates for URL parameters
    const formattedCheckIn = checkIn ? format(checkIn, "yyyy-MM-dd") : ""
    const formattedCheckOut = checkOut ? format(checkOut, "yyyy-MM-dd") : ""

    // Create booking URL with all necessary parameters
    const bookingUrl = `/booking?type=hotel&id=${hotel.id}&startDate=${formattedCheckIn}&endDate=${formattedCheckOut}&adults=${adults}&children=${children}&totalAmount=${totalPrice}`

    // Navigate to booking page
    router.push(bookingUrl)
  }

  return (
    <div className="space-y-8">
      <div>
        <h1 className="text-3xl font-bold mb-2">{hotel.name}</h1>
        <div className="flex items-center gap-2 text-gray-600">
          <MapPin className="h-4 w-4" />
          <span>{hotel.address || hotel.destination?.name || "Kerala"}</span>
          {hotel.star_rating && (
            <>
              <span className="mx-2">•</span>
              <Rating value={hotel.star_rating} showValue />
            </>
          )}
        </div>
      </div>

      <ImageGallery
        images={
          hotel.images || [
            `/placeholder.svg?height=600&width=800&query=${hotel.name}+hotel+room`,
            `/placeholder.svg?height=600&width=800&query=${hotel.name}+hotel+exterior`,
            `/placeholder.svg?height=600&width=800&query=${hotel.name}+hotel+lobby`,
            `/placeholder.svg?height=600&width=800&query=${hotel.name}+hotel+amenities`,
          ]
        }
        alt={hotel.name}
      />

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        <div className="lg:col-span-2 space-y-8">
          <div>
            <h2 className="text-xl font-semibold mb-3">About This Hotel</h2>
            <p className="text-gray-600">
              {hotel.description ||
                `
                Experience a comfortable stay at this beautiful hotel in Kerala. 
                Located in the heart of ${hotel.destination?.name || "Kerala"}, 
                this hotel offers modern amenities and excellent service to make your stay memorable.
              `}
            </p>
          </div>

          {hotel.amenities && hotel.amenities.length > 0 && (
            <div>
              <h2 className="text-xl font-semibold mb-3">Amenities</h2>
              <div className="grid grid-cols-2 gap-4">
                {hotel.amenities.map((amenity) => (
                  <div key={amenity} className="flex items-center gap-2">
                    <div className="h-2 w-2 rounded-full bg-green-600" />
                    <span>{amenity}</span>
                  </div>
                ))}
              </div>
            </div>
          )}

          <div>
            <h2 className="text-xl font-semibold mb-3">Location</h2>
            <div className="aspect-video bg-gray-200 rounded-lg relative">
              {/* Map would go here */}
              <div className="absolute inset-0 flex items-center justify-center">
                <p className="text-gray-500">Map loading...</p>
              </div>
            </div>
          </div>
        </div>

        <div>
          <Card>
            <CardHeader>
              <CardTitle>Book This Hotel</CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <PriceTag price={hotel.price_per_night} size="lg" />
              <p className="text-sm text-gray-500">per night</p>

              <div className="space-y-3">
                <div className="grid grid-cols-2 gap-3">
                  <div className="space-y-2">
                    <Label htmlFor="check-in">Check-in</Label>
                    <DatePicker id="check-in" selected={checkIn} onSelect={setCheckIn} minDate={new Date()} />
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="check-out">Check-out</Label>
                    <DatePicker
                      id="check-out"
                      selected={checkOut}
                      onSelect={setCheckOut}
                      minDate={checkIn ? addDays(checkIn, 1) : addDays(new Date(), 1)}
                    />
                  </div>
                </div>

                <div className="grid grid-cols-2 gap-3">
                  <div className="space-y-2">
                    <Label htmlFor="adults">Adults</Label>
                    <Input
                      id="adults"
                      type="number"
                      min={1}
                      value={adults}
                      onChange={(e) => setAdults(Number.parseInt(e.target.value))}
                    />
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="children">Children</Label>
                    <Input
                      id="children"
                      type="number"
                      min={0}
                      value={children}
                      onChange={(e) => setChildren(Number.parseInt(e.target.value))}
                    />
                  </div>
                </div>
              </div>

              <div className="border-t pt-4 mt-4">
                <div className="flex justify-between mb-2">
                  <span>
                    ₹{hotel.price_per_night.toLocaleString()} x {nights} nights
                  </span>
                  <span>₹{totalPrice.toLocaleString()}</span>
                </div>
                <div className="flex justify-between font-bold text-lg">
                  <span>Total</span>
                  <span>₹{totalPrice.toLocaleString()}</span>
                </div>
              </div>

              <Button onClick={handleBookNow} className="w-full bg-green-600 hover:bg-green-700">
                Book Now
              </Button>
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  )
}
