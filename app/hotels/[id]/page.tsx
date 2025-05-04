import { Suspense } from "react"
import { notFound } from "next/navigation"
import { MainHeader } from "@/components/main-header"
import { MainFooter } from "@/components/main-footer"
import { HotelDetail } from "@/components/hotels/hotel-detail"
import { Skeleton } from "@/components/ui/skeleton"
import { getHotel } from "@/lib/api"

interface HotelDetailPageProps {
  params: {
    id: string
  }
}

export default function HotelDetailPage({ params }: HotelDetailPageProps) {
  return (
    <div className="min-h-screen flex flex-col">
      <MainHeader />

      <main className="flex-1 container mx-auto px-4 py-8">
        <Suspense fallback={<HotelDetailSkeleton />}>
          <HotelDetailContent id={params.id} />
        </Suspense>
      </main>

      <MainFooter />
    </div>
  )
}

async function HotelDetailContent({ id }: { id: string }) {
  try {
    const hotel = await getHotel(id)
    return <HotelDetail hotel={hotel} />
  } catch (error) {
    console.error("Error loading hotel details:", error)
    notFound()
  }
}

function HotelDetailSkeleton() {
  return (
    <div className="space-y-8">
      <div>
        <Skeleton className="h-8 w-1/3 mb-2" />
        <Skeleton className="h-4 w-1/4" />
      </div>

      <Skeleton className="h-[400px] w-full rounded-lg" />

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        <div className="lg:col-span-2 space-y-6">
          <div className="space-y-2">
            <Skeleton className="h-6 w-1/4" />
            <Skeleton className="h-4 w-full" />
            <Skeleton className="h-4 w-full" />
            <Skeleton className="h-4 w-2/3" />
          </div>

          <div className="space-y-2">
            <Skeleton className="h-6 w-1/4" />
            <div className="grid grid-cols-2 gap-4">
              {[1, 2, 3, 4, 5, 6].map((i) => (
                <div key={i} className="flex items-center gap-2">
                  <Skeleton className="h-4 w-4 rounded-full" />
                  <Skeleton className="h-4 w-24" />
                </div>
              ))}
            </div>
          </div>
        </div>

        <div>
          <Skeleton className="h-[300px] w-full rounded-lg" />
        </div>
      </div>
    </div>
  )
}
