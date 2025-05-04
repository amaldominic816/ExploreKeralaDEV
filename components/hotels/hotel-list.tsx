import { getAllHotels } from "@/lib/api"
import { HotelCard } from "@/components/hotels/hotel-card"

export async function HotelList() {
  const hotels = await getAllHotels()

  if (hotels.length === 0) {
    return (
      <div className="text-center py-12">
        <h3 className="text-lg font-medium">No hotels found</h3>
        <p className="text-gray-500">Try adjusting your filters or check back later</p>
      </div>
    )
  }

  return (
    <div className="space-y-6">
      {hotels.map((hotel) => (
        <HotelCard key={hotel.id} hotel={hotel} />
      ))}
    </div>
  )
}
