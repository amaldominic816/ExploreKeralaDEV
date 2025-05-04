import { redirect } from "next/navigation"
import { MainHeader } from "@/components/main-header"
import { MainFooter } from "@/components/main-footer"
import { BookingForm } from "@/components/booking/booking-form"
import { getSession } from "@/lib/auth"

export default async function BookingPage({
  searchParams,
}: {
  searchParams: { [key: string]: string | string[] | undefined }
}) {
  // Get the current user session
  const sessionData = await getSession()

  // If user is not logged in, redirect to login page with return URL
  if (!sessionData?.user) {
    const returnUrl = `/booking?${new URLSearchParams(searchParams as Record<string, string>).toString()}`
    redirect(`/login?returnUrl=${encodeURIComponent(returnUrl)}`)
  }

  // Extract booking parameters from URL
  const type = searchParams.type as string
  const id = searchParams.id as string
  const startDate = searchParams.startDate as string
  const endDate = searchParams.endDate as string
  const adults = Number.parseInt(searchParams.adults as string) || 1
  const children = Number.parseInt(searchParams.children as string) || 0
  const totalAmount = Number.parseFloat(searchParams.totalAmount as string) || 0

  // If any required parameter is missing, redirect to home
  if (!type || !id || !startDate || !endDate || !totalAmount) {
    redirect("/")
  }

  return (
    <div className="min-h-screen flex flex-col">
      <MainHeader />

      <main className="flex-1 container mx-auto px-4 py-8">
        <div className="mb-8">
          <h1 className="text-3xl font-bold mb-2">Complete Your Booking</h1>
          <p className="text-gray-600">Please review your booking details and provide payment information</p>
        </div>

        <BookingForm
          type={type}
          itemId={id}
          startDate={startDate}
          endDate={endDate}
          adults={adults}
          children={children}
          totalAmount={totalAmount}
          userId={sessionData.user.id}
        />
      </main>

      <MainFooter />
    </div>
  )
}
