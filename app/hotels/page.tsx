import { Suspense } from "react"
import { MainHeader } from "@/components/main-header"
import { MainFooter } from "@/components/main-footer"
import { HotelList } from "@/components/hotels/hotel-list"
import { HotelFilters } from "@/components/hotels/hotel-filters"
import { Skeleton } from "@/components/ui/skeleton"

export default function HotelsPage() {
  return (
    <div className="min-h-screen flex flex-col">
      <MainHeader />

      <main className="flex-1 container mx-auto px-4 py-8">
        <div className="mb-8">
          <h1 className="text-3xl font-bold mb-2">Hotels in Kerala</h1>
          <p className="text-gray-600">Find the perfect accommodation for your stay</p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-4 gap-8">
          <div className="lg:col-span-1">
            <HotelFilters />
          </div>

          <div className="lg:col-span-3">
            <Suspense fallback={<HotelListSkeleton />}>
              <HotelList />
            </Suspense>
          </div>
        </div>
      </main>

      <MainFooter />
    </div>
  )
}

function HotelListSkeleton() {
  return (
    <div className="space-y-6">
      {[1, 2, 3, 4].map((i) => (
        <div key={i} className="flex flex-col md:flex-row gap-4 p-4 border rounded-lg">
          <Skeleton className="h-48 w-full md:w-64 rounded-lg" />
          <div className="flex-1 space-y-2">
            <Skeleton className="h-6 w-3/4" />
            <Skeleton className="h-4 w-1/2" />
            <Skeleton className="h-4 w-1/3" />
            <Skeleton className="h-4 w-2/3" />
            <div className="flex justify-between items-end pt-4">
              <Skeleton className="h-5 w-24" />
              <Skeleton className="h-10 w-28" />
            </div>
          </div>
        </div>
      ))}
    </div>
  )
}
