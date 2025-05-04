"use client"

import { useState } from "react"
import { useRouter } from "next/navigation"
import { format, parseISO } from "date-fns"
import { createBooking } from "@/lib/api"
import { BookingSummary } from "@/components/booking/booking-summary"
import { PaymentForm } from "@/components/booking/payment-form"
import { Button } from "@/components/ui/button"
import { Textarea } from "@/components/ui/textarea"
import { Label } from "@/components/ui/label"
import { Alert, AlertDescription } from "@/components/ui/alert"
import { CheckCircle2, AlertCircle } from "lucide-react"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"

interface BookingFormProps {
  type: string
  itemId: string
  startDate: string
  endDate: string
  adults: number
  children: number
  totalAmount: number
  userId: string
}

export function BookingForm({
  type,
  itemId,
  startDate,
  endDate,
  adults,
  children,
  totalAmount,
  userId,
}: BookingFormProps) {
  const router = useRouter()
  const [isLoading, setIsLoading] = useState(false)
  const [error, setError] = useState<string | null>(null)
  const [success, setSuccess] = useState<string | null>(null)
  const [specialRequests, setSpecialRequests] = useState("")
  const [currentStep, setCurrentStep] = useState("review")

  const handleSubmit = async () => {
    setIsLoading(true)
    setError(null)

    try {
      // Create the booking
      const booking = await createBooking({
        user_id: userId,
        booking_type: type,
        item_id: itemId,
        start_date: startDate,
        end_date: endDate,
        adults,
        children,
        total_amount: totalAmount,
        special_requests: specialRequests || null,
        status: "pending",
        payment_status: "pending",
      })

      setSuccess("Booking created successfully!")

      // Redirect to confirmation page
      setTimeout(() => {
        router.push(`/booking/confirmation?id=${booking.id}`)
      }, 1500)
    } catch (err) {
      setError(err instanceof Error ? err.message : "Failed to create booking")
    } finally {
      setIsLoading(false)
    }
  }

  return (
    <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
      <div className="lg:col-span-2">
        <Tabs value={currentStep} onValueChange={setCurrentStep} className="w-full">
          <TabsList className="grid w-full grid-cols-2">
            <TabsTrigger value="review">Review</TabsTrigger>
            <TabsTrigger value="payment">Payment</TabsTrigger>
          </TabsList>

          <TabsContent value="review" className="mt-6">
            <div className="space-y-6">
              <div className="bg-white p-6 rounded-lg border">
                <h2 className="text-xl font-semibold mb-4">Booking Details</h2>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-6">
                  <div>
                    <p className="text-sm text-gray-500">Check-in</p>
                    <p className="font-medium">{format(parseISO(startDate), "PPP")}</p>
                  </div>
                  <div>
                    <p className="text-sm text-gray-500">Check-out</p>
                    <p className="font-medium">{format(parseISO(endDate), "PPP")}</p>
                  </div>
                  <div>
                    <p className="text-sm text-gray-500">Guests</p>
                    <p className="font-medium">
                      {adults} {adults === 1 ? "Adult" : "Adults"}
                      {children > 0 && `, ${children} ${children === 1 ? "Child" : "Children"}`}
                    </p>
                  </div>
                </div>

                <div className="space-y-4">
                  <div>
                    <Label htmlFor="special-requests">Special Requests (Optional)</Label>
                    <Textarea
                      id="special-requests"
                      placeholder="Any special requirements or preferences..."
                      className="mt-1"
                      value={specialRequests}
                      onChange={(e) => setSpecialRequests(e.target.value)}
                    />
                  </div>
                </div>
              </div>

              <div className="flex justify-end">
                <Button onClick={() => setCurrentStep("payment")} className="bg-green-600 hover:bg-green-700">
                  Continue to Payment
                </Button>
              </div>
            </div>
          </TabsContent>

          <TabsContent value="payment" className="mt-6">
            <div className="space-y-6">
              <div className="bg-white p-6 rounded-lg border">
                <h2 className="text-xl font-semibold mb-4">Payment Information</h2>
                <PaymentForm />
              </div>

              {error && (
                <Alert variant="destructive">
                  <AlertCircle className="h-4 w-4" />
                  <AlertDescription>{error}</AlertDescription>
                </Alert>
              )}

              {success && (
                <Alert className="bg-green-50 text-green-800 border-green-200">
                  <CheckCircle2 className="h-4 w-4 text-green-600" />
                  <AlertDescription>{success}</AlertDescription>
                </Alert>
              )}

              <div className="flex justify-between">
                <Button variant="outline" onClick={() => setCurrentStep("review")}>
                  Back to Review
                </Button>
                <Button onClick={handleSubmit} className="bg-green-600 hover:bg-green-700" disabled={isLoading}>
                  {isLoading ? "Processing..." : "Complete Booking"}
                </Button>
              </div>
            </div>
          </TabsContent>
        </Tabs>
      </div>

      <div>
        <BookingSummary
          type={type}
          itemId={itemId}
          startDate={startDate}
          endDate={endDate}
          adults={adults}
          children={children}
          totalAmount={totalAmount}
        />
      </div>
    </div>
  )
}
