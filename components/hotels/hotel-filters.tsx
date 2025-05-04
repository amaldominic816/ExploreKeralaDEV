"use client"

import { useState } from "react"
import { useRouter, useSearchParams } from "next/navigation"
import { Slider } from "@/components/ui/slider"
import { Checkbox } from "@/components/ui/checkbox"
import { Button } from "@/components/ui/button"
import { Label } from "@/components/ui/label"
import { Input } from "@/components/ui/input"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"

export function HotelFilters() {
  const router = useRouter()
  const searchParams = useSearchParams()

  const [priceRange, setPriceRange] = useState([1000, 20000])
  const [starRating, setStarRating] = useState<number[]>([])
  const [amenities, setAmenities] = useState<string[]>([])

  const handleStarRatingChange = (rating: number) => {
    setStarRating((prev) => (prev.includes(rating) ? prev.filter((r) => r !== rating) : [...prev, rating]))
  }

  const handleAmenityChange = (amenity: string) => {
    setAmenities((prev) => (prev.includes(amenity) ? prev.filter((a) => a !== amenity) : [...prev, amenity]))
  }

  const handleApplyFilters = () => {
    // Build query string
    const params = new URLSearchParams(searchParams)

    params.set("minPrice", priceRange[0].toString())
    params.set("maxPrice", priceRange[1].toString())

    if (starRating.length > 0) {
      params.set("stars", starRating.join(","))
    } else {
      params.delete("stars")
    }

    if (amenities.length > 0) {
      params.set("amenities", amenities.join(","))
    } else {
      params.delete("amenities")
    }

    router.push(`/hotels?${params.toString()}`)
  }

  const handleResetFilters = () => {
    setPriceRange([1000, 20000])
    setStarRating([])
    setAmenities([])
    router.push("/hotels")
  }

  return (
    <div className="space-y-6">
      <Card>
        <CardHeader>
          <CardTitle>Filters</CardTitle>
        </CardHeader>
        <CardContent className="space-y-6">
          <div className="space-y-4">
            <h3 className="font-medium">Price Range (₹)</h3>
            <Slider value={priceRange} min={1000} max={20000} step={500} onValueChange={setPriceRange} />
            <div className="flex items-center justify-between">
              <div className="border rounded px-2 py-1 text-sm">₹{priceRange[0]}</div>
              <div className="border rounded px-2 py-1 text-sm">₹{priceRange[1]}</div>
            </div>
          </div>

          <div className="space-y-3">
            <h3 className="font-medium">Star Rating</h3>
            {[5, 4, 3, 2, 1].map((rating) => (
              <div key={rating} className="flex items-center space-x-2">
                <Checkbox
                  id={`star-${rating}`}
                  checked={starRating.includes(rating)}
                  onCheckedChange={() => handleStarRatingChange(rating)}
                />
                <Label htmlFor={`star-${rating}`} className="flex items-center">
                  {rating} {rating === 1 ? "Star" : "Stars"}
                </Label>
              </div>
            ))}
          </div>

          <div className="space-y-3">
            <h3 className="font-medium">Amenities</h3>
            {["WiFi", "Swimming Pool", "Restaurant", "Spa", "Gym", "Breakfast"].map((amenity) => (
              <div key={amenity} className="flex items-center space-x-2">
                <Checkbox
                  id={`amenity-${amenity}`}
                  checked={amenities.includes(amenity)}
                  onCheckedChange={() => handleAmenityChange(amenity)}
                />
                <Label htmlFor={`amenity-${amenity}`}>{amenity}</Label>
              </div>
            ))}
          </div>

          <div className="space-y-3">
            <h3 className="font-medium">Location</h3>
            <Input placeholder="Search location" />
          </div>

          <div className="flex flex-col gap-2">
            <Button onClick={handleApplyFilters} className="w-full bg-green-600 hover:bg-green-700">
              Apply Filters
            </Button>
            <Button onClick={handleResetFilters} variant="outline" className="w-full">
              Reset Filters
            </Button>
          </div>
        </CardContent>
      </Card>
    </div>
  )
}
