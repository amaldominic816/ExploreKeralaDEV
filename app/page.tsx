import Link from "next/link"
import Image from "next/image"
import { ArrowRight } from "lucide-react"
import { MainHeader } from "@/components/main-header"
import { MainFooter } from "@/components/main-footer"
import { SearchBar } from "@/components/search-bar"
import { QuickOptions } from "@/components/quick-options"
import { DestinationCard } from "@/components/destination-card"
import { PackageCard } from "@/components/package-card"
import { Button } from "@/components/ui/button"
import { getFeaturedDestinations, getFeaturedPackages } from "@/lib/api"

// Mock data to use when database tables don't exist yet
const mockDestinations = [
  {
    id: "1",
    name: "Munnar",
    description: "Hill station known for its tea plantations and cool climate",
    location: "Idukki, Kerala",
    is_featured: true,
    image_url: "/placeholder.svg?key=ys4fy",
    created_at: new Date().toISOString(),
    updated_at: new Date().toISOString(),
  },
  {
    id: "2",
    name: "Alleppey",
    description: "Famous for houseboats and backwaters",
    location: "Alappuzha, Kerala",
    is_featured: true,
    image_url: "/placeholder.svg?key=udv3e",
    created_at: new Date().toISOString(),
    updated_at: new Date().toISOString(),
  },
  {
    id: "3",
    name: "Wayanad",
    description: "Known for wildlife sanctuaries and spice plantations",
    location: "Wayanad, Kerala",
    is_featured: true,
    image_url: "/placeholder.svg?key=z3i2o",
    created_at: new Date().toISOString(),
    updated_at: new Date().toISOString(),
  },
]

const mockPackages = [
  {
    id: "1",
    name: "Munnar + Thekkady",
    description: "Explore the hills and wildlife of Kerala",
    duration: "3N/4D",
    price: 12999,
    discount_percentage: 20,
    itinerary: null,
    inclusions: ["Accommodation", "Breakfast", "Sightseeing", "Transportation"],
    exclusions: ["Flights", "Personal expenses", "Optional activities"],
    images: ["/placeholder.svg?key=6vjx9"],
    is_featured: true,
    created_at: new Date().toISOString(),
    updated_at: new Date().toISOString(),
  },
  {
    id: "2",
    name: "Alleppey Houseboat Stay",
    description: "Experience the famous Kerala backwaters",
    duration: "1N/2D",
    price: 8499,
    discount_percentage: 15,
    itinerary: null,
    inclusions: ["Accommodation on houseboat", "All meals", "Cruise"],
    exclusions: ["Transportation to/from Alleppey", "Personal expenses"],
    images: ["/placeholder.svg?key=2s218"],
    is_featured: true,
    created_at: new Date().toISOString(),
    updated_at: new Date().toISOString(),
  },
  {
    id: "3",
    name: "Wayanad Adventure Trip",
    description: "Adventure and nature in the Western Ghats",
    duration: "2N/3D",
    price: 9999,
    discount_percentage: 10,
    itinerary: null,
    inclusions: ["Accommodation", "Breakfast", "Guided treks", "Safari"],
    exclusions: ["Flights", "Personal expenses", "Optional activities"],
    images: ["/placeholder.svg?height=400&width=600&query=Wayanad+adventure+package"],
    is_featured: true,
    created_at: new Date().toISOString(),
    updated_at: new Date().toISOString(),
  },
]

export default async function Home() {
  // Try to fetch data from the database, but use mock data if it fails
  let featuredDestinations = await getFeaturedDestinations()
  let featuredPackages = await getFeaturedPackages()

  // If no data was returned from the database, use mock data
  if (featuredDestinations.length === 0) {
    console.log("Using mock destination data")
    featuredDestinations = mockDestinations
  }

  if (featuredPackages.length === 0) {
    console.log("Using mock package data")
    featuredPackages = mockPackages
  }

  return (
    <div className="min-h-screen flex flex-col">
      <MainHeader />

      {/* Hero Section */}
      <section className="relative h-[70vh] min-h-[500px] flex items-center justify-center">
        <div className="absolute inset-0 z-0">
          <Image src="/placeholder.svg?key=3uf5i" alt="Kerala Backwaters" fill priority className="object-cover" />
          <div className="absolute inset-0 bg-black/40" />
        </div>

        <div className="container mx-auto px-4 relative z-10 text-white text-center">
          <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold mb-4">Discover God's Own Country</h1>
          <p className="text-xl md:text-2xl mb-8 max-w-3xl mx-auto">
            Experience the beauty of Kerala with our curated travel packages, hotels, and activities
          </p>

          <div className="max-w-2xl mx-auto">
            <SearchBar />
          </div>
        </div>
      </section>

      {/* Quick Options */}
      <section className="py-12 bg-white">
        <div className="container mx-auto px-4">
          <h2 className="text-3xl font-bold text-center mb-8">Plan Your Perfect Trip</h2>
          <QuickOptions />
        </div>
      </section>

      {/* Featured Destinations */}
      <section className="py-12 bg-gray-50">
        <div className="container mx-auto px-4">
          <div className="flex justify-between items-center mb-8">
            <h2 className="text-3xl font-bold">Popular Destinations</h2>
            <Link href="/destinations" className="text-green-600 hover:text-green-700 flex items-center gap-1">
              View All <ArrowRight className="h-4 w-4" />
            </Link>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {featuredDestinations.map((destination) => (
              <DestinationCard key={destination.id} destination={destination} />
            ))}
          </div>
        </div>
      </section>

      {/* Featured Packages */}
      <section className="py-12 bg-white">
        <div className="container mx-auto px-4">
          <div className="flex justify-between items-center mb-8">
            <h2 className="text-3xl font-bold">Featured Packages</h2>
            <Link href="/packages" className="text-green-600 hover:text-green-700 flex items-center gap-1">
              View All <ArrowRight className="h-4 w-4" />
            </Link>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {featuredPackages.map((pkg) => (
              <PackageCard key={pkg.id} package={pkg} />
            ))}
          </div>
        </div>
      </section>

      {/* Testimonials */}
      <section className="py-12 bg-gray-50">
        <div className="container mx-auto px-4">
          <h2 className="text-3xl font-bold text-center mb-8">What Our Travelers Say</h2>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {[1, 2, 3].map((i) => (
              <div key={i} className="bg-white p-6 rounded-lg shadow-md">
                <div className="flex items-center mb-4">
                  <div className="relative h-12 w-12 rounded-full overflow-hidden mr-4">
                    <Image
                      src={`/diverse-group-portrait.png?key=l98ic&key=chddh&height=100&width=100&query=person+${i}`}
                      alt={`Testimonial ${i}`}
                      fill
                      className="object-cover"
                    />
                  </div>
                  <div>
                    <h4 className="font-semibold">John Doe {i}</h4>
                    <p className="text-sm text-gray-500">Visited Munnar</p>
                  </div>
                </div>
                <p className="text-gray-600">
                  "The trip to Kerala was amazing! The accommodations were perfect, and the tour guides were
                  knowledgeable and friendly. I'll definitely be back!"
                </p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA */}
      <section className="py-16 bg-green-600 text-white">
        <div className="container mx-auto px-4 text-center">
          <h2 className="text-3xl font-bold mb-4">Ready to Explore Kerala?</h2>
          <p className="text-xl mb-8 max-w-2xl mx-auto">
            Book your dream vacation today and experience the beauty of God's Own Country
          </p>
          <div className="flex justify-center gap-4">
            <Link href="/packages">
              <Button size="lg" className="bg-white text-green-600 hover:bg-gray-100">
                Browse Packages
              </Button>
            </Link>
            <Link href="/contact">
              <Button size="lg" variant="outline" className="text-white border-white hover:bg-green-700">
                Contact Us
              </Button>
            </Link>
          </div>
        </div>
      </section>

      <MainFooter />
    </div>
  )
}
