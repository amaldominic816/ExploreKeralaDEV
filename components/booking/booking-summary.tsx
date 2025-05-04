"use client"

import { useEffect, useState } from "react"
import Image from "next/image"
import { format, parseISO, differenceInDays } from "date-fns"
import { getHotel, getPackage, getHouseboat, getActivity, getTaxi } from "@/lib/api"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Skeleton } from "@/components/ui/skeleton"
import { PriceTag } from "@/components/ui/price-tag"

interface BookingSummaryProps {
  type: string
  itemId: string
  startDate: string
  endDate: string
  adults: number
  children: number
  totalAmount: number
}

export function BookingSummary({
  type,
  itemId,
  startDate,
  endDate,
  adults,
  children,
  totalAmount,
}: BookingSummaryProps) {
  const [itemDetails, setItemDetails] = useState<any>(null)
  const [isLoading, setIsLoading] = useState(true)
  const [error, setError] = useState<string | null>(null)

  useEffect(() => {
    async function fetchItemDetails() {
      try {
        let details
        switch (type) {
          case "hotel":
            details = await getHotel(itemId)
            break
          case "package":
            details = await getPackage(itemId)
            break
          case "houseboat":
            details = await getHouseboat(itemId)
            break
          case "activity":
            details = await getActivity(itemId)
            break
          case "taxi":
            details = await getTaxi(itemId)
            break
          default:
            throw new Error("Invalid booking type")
        }
        setItemDetails(details)
      } catch (err) {
        setError("Failed to load item details")
        console.error(err)
      } finally {
        setIsLoading(false)
      }
    }

    fetchItemDetails()
  }, [type, itemId])

  const nights = differenceInDays(parseISO(endDate), parseISO(startDate))

  if (isLoading) {
    return (
      <Card>
        <CardHeader>
          <CardTitle>Booking Summary</CardTitle>
        </CardHeader>
        <CardContent className="space-y-4">
          <Skeleton className="h-[100px] w-full rounded-md" />
          <Skeleton className="h-4 w-3/4" />
          <Skeleton className="h-4 w-1/2" />
          <div className="space-y-2 pt-4">
            <Skeleton className="h-4 w-full" />
            <Skeleton className="h-4 w-full" />
            <Skeleton className="h-4 w-full" />
          </div>
          <div className="pt-4">
            <Skeleton className="h-6 w-1/2" />
          </div>
        </CardContent>
      </Card>
    )
  }

  if (error || !itemDetails) {
    return (
      <Card>
        <CardHeader>
          <CardTitle>Booking Summary</CardTitle>
        </CardHeader>
        <CardContent>
          <p className="text-red-500">Failed to load booking details</p>
        </CardContent>
      </Card>
    )
  }

  return (
    <Card>
      <CardHeader>
        <CardTitle>Booking Summary</CardTitle>
      </CardHeader>
      <CardContent className="space-y-4">
        <div className="relative h-[150px] rounded-md overflow-hidden">
          <Image
            src={
              itemDetails.images?.[0] ||
              `/placeholder.svg?height=300&width=400&query=${itemDetails.name || "/placeholder.svg"}+${type}+kerala`
            }
            alt={itemDetails.name}
            fill
            className="object-cover"
          />
        </div>

        <h3 className="font-semibold text-lg">{itemDetails.name}</h3>

        <div className="text-sm space-y-2">
          <div className="flex justify-between">
            <span>Dates</span>
            <span>
              {format(parseISO(startDate), "MMM d")} - {format(parseISO(endDate), "MMM d, yyyy")}
            </span>
          </div>

          <div className="flex justify-between">
            <span>Duration</span>
            <span>
              {type === "hotel" || type === "houseboat"
                ? `${nights} ${nights === 1 ? "night" : "nights"}`
                : type === "package"
                  ? itemDetails.duration
                  : "1 day"}
            </span>
          </div>

          <div className="flex justify-between">
            <span>Guests</span>
            <span>
              {adults} {adults === 1 ? "adult" : "adults"}
              {children > 0 && `, ${children} ${children === 1 ? "child" : "children"}`}
            </span>
          </div>
        </div>

        <div className="border-t pt-4 mt-4">
          <div className="flex justify-between items-center">
            <span className="font-semibold">Total</span>
            <PriceTag price={totalAmount} size="lg" />
          </div>
        </div>
      </CardContent>
    </Card>
  )
}
