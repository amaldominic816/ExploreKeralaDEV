import { getSession } from "@/lib/auth"
import { getUserBookings } from "@/lib/api"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Button } from "@/components/ui/button"
import { format, parseISO } from "date-fns"
import Link from "next/link"

export default async function UserDashboardPage() {
  const sessionData = await getSession()

  if (!sessionData?.user) {
    return null
  }

  const bookings = await getUserBookings(sessionData.user.id)

  return (
    <div className="container mx-auto py-8 px-4">
      <div className="mb-8">
        <h1 className="text-3xl font-bold">Welcome, {sessionData.user.full_name}</h1>
        <p className="text-gray-500">Manage your bookings and profile</p>
      </div>

      <Tabs defaultValue="bookings">
        <TabsList className="mb-6">
          <TabsTrigger value="bookings">My Bookings</TabsTrigger>
          <TabsTrigger value="wishlist">Wishlist</TabsTrigger>
          <TabsTrigger value="profile">Profile</TabsTrigger>
        </TabsList>

        <TabsContent value="bookings">
          <div className="grid gap-6">
            <Card>
              <CardHeader>
                <CardTitle>Your Bookings</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  {bookings.length > 0 ? (
                    bookings.map((booking) => (
                      <div key={booking.id} className="border rounded-lg p-4">
                        <div className="flex justify-between items-start mb-2">
                          <div>
                            <h3 className="font-semibold text-lg">
                              {booking.booking_type.charAt(0).toUpperCase() + booking.booking_type.slice(1)} Booking
                            </h3>
                            <p className="text-sm text-gray-500">
                              {format(parseISO(booking.start_date), "MMM d")} -{" "}
                              {format(parseISO(booking.end_date), "MMM d, yyyy")}
                            </p>
                          </div>
                          <div className="text-right">
                            <p className="font-medium">₹{booking.total_amount.toLocaleString()}</p>
                            <p className="text-sm text-gray-500">Booking #{booking.id.slice(0, 8).toUpperCase()}</p>
                          </div>
                        </div>
                        <div className="flex justify-between items-center">
                          <div className="flex gap-2">
                            <span
                              className={`px-2 py-0.5 rounded-full text-xs font-medium ${
                                booking.status === "confirmed"
                                  ? "bg-green-100 text-green-800"
                                  : booking.status === "pending"
                                    ? "bg-yellow-100 text-yellow-800"
                                    : booking.status === "cancelled"
                                      ? "bg-red-100 text-red-800"
                                      : "bg-gray-100 text-gray-800"
                              }`}
                            >
                              {booking.status.charAt(0).toUpperCase() + booking.status.slice(1)}
                            </span>
                            <span
                              className={`px-2 py-0.5 rounded-full text-xs font-medium ${
                                booking.payment_status === "paid"
                                  ? "bg-green-100 text-green-800"
                                  : booking.payment_status === "pending"
                                    ? "bg-yellow-100 text-yellow-800"
                                    : booking.payment_status === "refunded"
                                      ? "bg-blue-100 text-blue-800"
                                      : "bg-red-100 text-red-800"
                              }`}
                            >
                              {booking.payment_status.charAt(0).toUpperCase() + booking.payment_status.slice(1)}
                            </span>
                          </div>
                          <Link href={`/booking/confirmation?id=${booking.id}`}>
                            <Button variant="outline" size="sm">
                              View Details
                            </Button>
                          </Link>
                        </div>
                      </div>
                    ))
                  ) : (
                    <div className="text-center py-8">
                      <p className="text-gray-500 mb-4">You don't have any bookings yet</p>
                      <Link href="/hotels">
                        <Button className="bg-green-600 hover:bg-green-700">Explore Hotels</Button>
                      </Link>
                    </div>
                  )}
                </div>
              </CardContent>
            </Card>
          </div>
        </TabsContent>

        <TabsContent value="wishlist">
          <div className="grid gap-6">
            <Card>
              <CardHeader>
                <CardTitle>Your Wishlist</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="text-center py-8">
                  <p className="text-gray-500 mb-4">Your wishlist is empty</p>
                  <Link href="/packages">
                    <Button className="bg-green-600 hover:bg-green-700">Explore Packages</Button>
                  </Link>
                </div>
              </CardContent>
            </Card>
          </div>
        </TabsContent>

        <TabsContent value="profile">
          <div className="grid gap-6">
            <Card>
              <CardHeader>
                <CardTitle>Your Profile</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <div>
                      <label className="text-sm font-medium">Name</label>
                      <p>{sessionData.user.full_name}</p>
                    </div>
                    <div>
                      <label className="text-sm font-medium">Email</label>
                      <p>{sessionData.session.user.email}</p>
                    </div>
                    <div>
                      <label className="text-sm font-medium">Phone</label>
                      <p>{sessionData.user.phone_number || "Not provided"}</p>
                    </div>
                    <div>
                      <label className="text-sm font-medium">Member Since</label>
                      <p>{format(new Date(sessionData.user.created_at), "MMMM yyyy")}</p>
                    </div>
                  </div>
                  <Button className="bg-green-600 hover:bg-green-700">Edit Profile</Button>
                </div>
              </CardContent>
            </Card>
          </div>
        </TabsContent>
      </Tabs>
    </div>
  )
}
