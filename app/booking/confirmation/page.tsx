import Link from "next/link"
import { notFound, redirect } from "next/navigation"
import { format, parseISO } from "date-fns"
import { MainHeader } from "@/components/main-header"
import { MainFooter } from "@/components/main-footer"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { CheckCircle2, Calendar, Users, MapPin } from "lucide-react"
import { getSession } from "@/lib/auth"
import { supabase } from "@/lib/supabase"
import type { Booking } from "@/types/database"

interface BookingConfirmationPageProps {
  searchParams: { [key: string]: string | string[] | undefined }
}

async function getBookingDetails(bookingId: string) {
  const { data, error } = await supabase.from("bookings").select("*").eq("id", bookingId).single()

  if (error) throw new Error(error.message)
  return data as Booking
}

async function getItemDetails(type: string, itemId: string) {
  let tableName

  switch (type) {
    case "hotel":
      tableName = "hotels"
      break
    case "package":
      tableName = "packages"
      break
    case "houseboat":
      tableName = "houseboats"
      break
    case "activity":
      tableName = "activities"
      break
    case "taxi":
      tableName = "taxis"
      break
    default:
      throw new Error("Invalid booking type")
  }

  const { data, error } = await supabase.from(tableName).select("*").eq("id", itemId).single()

  if (error) throw new Error(error.message)
  return data
}

export default async function BookingConfirmationPage({ searchParams }: BookingConfirmationPageProps) {
  // Get the current user session
  const sessionData = await getSession()

  // If user is not logged in, redirect to login
  if (!sessionData?.user) {
    redirect("/login")
  }

  const bookingId = searchParams.id as string

  // If booking ID is missing, redirect to home
  if (!bookingId) {
    redirect("/")
  }

  try {
    // Get booking details
    const booking = await getBookingDetails(bookingId)

    // Verify that the booking belongs to the current user
    if (booking.user_id !== sessionData.user.id) {
      notFound()
    }

    // Get item details
    const item = await getItemDetails(booking.booking_type, booking.item_id)

    return (
      <div className="min-h-screen flex flex-col">
        <MainHeader />

        <main className="flex-1 container mx-auto px-4 py-8">
          <Card className="max-w-3xl mx-auto">
            <CardHeader className="text-center border-b pb-6">
              <div className="flex justify-center mb-4">
                <div className="bg-green-100 p-3 rounded-full">
                  <CheckCircle2 className="h-12 w-12 text-green-600" />
                </div>
              </div>
              <CardTitle className="text-2xl">Booking Confirmed!</CardTitle>
              <p className="text-gray-500 mt-2">Your booking has been successfully processed</p>
            </CardHeader>

            <CardContent className="pt-6">
              <div className="space-y-6">
                <div>
                  <h3 className="text-lg font-semibold mb-2">Booking Details</h3>
                  <div className="bg-gray-50 p-4 rounded-lg space-y-3">
                    <div className="flex justify-between">
                      <span className="text-gray-500">Booking ID</span>
                      <span className="font-medium">{booking.id.slice(0, 8).toUpperCase()}</span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-gray-500">Status</span>
                      <span className="bg-green-100 text-green-800 px-2 py-0.5 rounded-full text-xs font-medium">
                        {booking.status.charAt(0).toUpperCase() + booking.status.slice(1)}
                      </span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-gray-500">Payment Status</span>
                      <span className="bg-yellow-100 text-yellow-800 px-2 py-0.5 rounded-full text-xs font-medium">
                        {booking.payment_status.charAt(0).toUpperCase() + booking.payment_status.slice(1)}
                      </span>
                    </div>
                  </div>
                </div>

                <div className="border-t pt-6">
                  <h3 className="text-lg font-semibold mb-2">{item.name}</h3>
                  <div className="flex flex-col sm:flex-row gap-4">
                    <div className="flex items-start gap-2">
                      <Calendar className="h-5 w-5 text-gray-400 mt-0.5" />
                      <div>
                        <p className="font-medium">
                          {format(parseISO(booking.start_date), "MMM d")} -{" "}
                          {format(parseISO(booking.end_date), "MMM d, yyyy")}
                        </p>
                        <p className="text-sm text-gray-500">Check-in: 2:00 PM, Check-out: 12:00 PM</p>
                      </div>
                    </div>

                    <div className="flex items-start gap-2">
                      <Users className="h-5 w-5 text-gray-400 mt-0.5" />
                      <div>
                        <p className="font-medium">
                          {booking.adults} {booking.adults === 1 ? "Adult" : "Adults"}
                          {booking.children > 0 &&
                            `, ${booking.children} ${booking.children === 1 ? "Child" : "Children"}`}
                        </p>
                      </div>
                    </div>

                    {item.address && (
                      <div className="flex items-start gap-2">
                        <MapPin className="h-5 w-5 text-gray-400 mt-0.5" />
                        <div>
                          <p className="font-medium">{item.address}</p>
                        </div>
                      </div>
                    )}
                  </div>
                </div>

                <div className="border-t pt-6">
                  <h3 className="text-lg font-semibold mb-2">Payment Summary</h3>
                  <div className="space-y-2">
                    <div className="flex justify-between">
                      <span className="text-gray-500">Total Amount</span>
                      <span className="font-medium">₹{booking.total_amount.toLocaleString()}</span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-gray-500">Payment Method</span>
                      <span className="font-medium">Credit Card</span>
                    </div>
                  </div>
                </div>

                {booking.special_requests && (
                  <div className="border-t pt-6">
                    <h3 className="text-lg font-semibold mb-2">Special Requests</h3>
                    <p className="text-gray-600">{booking.special_requests}</p>
                  </div>
                )}

                <div className="border-t pt-6 flex flex-col sm:flex-row gap-4 justify-between items-center">
                  <p className="text-gray-500 text-sm">
                    A confirmation email has been sent to your registered email address.
                  </p>
                  <div className="flex gap-3">
                    <Button variant="outline">Download Receipt</Button>
                    <Link href="/dashboard">
                      <Button className="bg-green-600 hover:bg-green-700">View All Bookings</Button>
                    </Link>
                  </div>
                </div>
              </div>
            </CardContent>
          </Card>
        </main>

        <MainFooter />
      </div>
    )
  } catch (error) {
    console.error("Error fetching booking details:", error)
    notFound()
  }
}
