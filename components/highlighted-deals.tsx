import Image from "next/image"
import { Card, CardContent, CardFooter } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"

const deals = [
  {
    id: 1,
    title: "Munnar + Thekkady Package",
    description: "3 Nights / 4 Days",
    price: "₹12,999",
    discount: "20% OFF",
    image: "/placeholder.svg?key=1zt52",
  },
  {
    id: 2,
    title: "Alleppey Houseboat Stay",
    description: "1 Night / 2 Days",
    price: "₹8,499",
    discount: "15% OFF",
    image: "/placeholder.svg?key=x5qnp",
  },
  {
    id: 3,
    title: "Wayanad Adventure Trip",
    description: "2 Nights / 3 Days",
    price: "₹9,999",
    discount: "10% OFF",
    image: "/placeholder.svg?key=3otee",
  },
]

export function HighlightedDeals() {
  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
      {deals.map((deal) => (
        <Card key={deal.id} className="overflow-hidden">
          <div className="relative h-48">
            <Image src={deal.image || "/placeholder.svg"} alt={deal.title} fill className="object-cover" />
            <Badge className="absolute top-2 right-2 bg-green-600">{deal.discount}</Badge>
          </div>
          <CardContent className="p-4">
            <h4 className="text-xl font-semibold">{deal.title}</h4>
            <p className="text-gray-500">{deal.description}</p>
            <p className="text-lg font-bold text-green-600 mt-2">{deal.price}</p>
          </CardContent>
          <CardFooter className="p-4 pt-0">
            <Button className="w-full bg-green-600 hover:bg-green-700">Book Now</Button>
          </CardFooter>
        </Card>
      ))}
    </div>
  )
}
