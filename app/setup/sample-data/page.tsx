import Link from "next/link"
import { MainHeader } from "@/components/main-header"
import { MainFooter } from "@/components/main-footer"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"

export default function SampleDataPage() {
  return (
    <div className="min-h-screen flex flex-col">
      <MainHeader />

      <main className="flex-1 container mx-auto px-4 py-8">
        <div className="max-w-4xl mx-auto">
          <h1 className="text-3xl font-bold mb-2">Sample Data SQL</h1>
          <p className="text-gray-600 mb-8">
            Run this SQL script to populate your database with sample data for testing
          </p>

          <Card>
            <CardHeader>
              <CardTitle>Sample Data SQL Script</CardTitle>
              <CardDescription>
                Execute this script after creating the database schema to add sample data
              </CardDescription>
            </CardHeader>
            <CardContent>
              <div className="bg-gray-900 text-gray-100 p-4 rounded-md overflow-auto max-h-[500px] text-sm">
                <pre>{`-- Add some sample data for destinations
INSERT INTO destinations (name, description, location, is_featured) VALUES
('Munnar', 'Hill station known for its tea plantations and cool climate', 'Idukki, Kerala', true),
('Alleppey', 'Famous for houseboats and backwaters', 'Alappuzha, Kerala', true),
('Wayanad', 'Known for wildlife sanctuaries and spice plantations', 'Wayanad, Kerala', true),
('Thekkady', 'Home to Periyar Wildlife Sanctuary', 'Idukki, Kerala', true),
('Kovalam', 'Beach destination with lighthouse', 'Thiruvananthapuram, Kerala', true);

-- Add some sample data for hotels
INSERT INTO hotels (name, description, destination_id, address, price_per_night, star_rating, amenities, is_featured) VALUES
('Green Valley Resort', 'Luxury resort with mountain views', (SELECT id FROM destinations WHERE name = 'Munnar'), 'Munnar, Kerala', 5999, 4, '["WiFi", "Swimming Pool", "Restaurant", "Spa"]', true),
('Backwater Retreat', 'Peaceful hotel by the backwaters', (SELECT id FROM destinations WHERE name = 'Alleppey'), 'Alleppey, Kerala', 4500, 3, '["WiFi", "Restaurant", "Garden"]', true),
('Wayanad Wilderness', 'Eco-friendly resort in the forest', (SELECT id FROM destinations WHERE name = 'Wayanad'), 'Wayanad, Kerala', 6500, 4, '["WiFi", "Restaurant", "Outdoor Activities"]', true);

-- Add some sample data for packages
INSERT INTO packages (name, description, duration, price, discount_percentage, itinerary, inclusions, exclusions, is_featured) VALUES
('Munnar + Thekkady', 'Explore the hills and wildlife of Kerala', '3N/4D', 12999, 20, '[{"day": 1, "description": "Arrival in Munnar, check-in and local sightseeing"}, {"day": 2, "description": "Visit tea plantations and Eravikulam National Park"}, {"day": 3, "description": "Travel to Thekkady, visit spice plantations"}, {"day": 4, "description": "Periyar Wildlife Sanctuary, departure"}]', ARRAY['Accommodation', 'Breakfast', 'Sightseeing', 'Transportation'], ARRAY['Flights', 'Personal expenses', 'Optional activities'], true),
('Alleppey Houseboat Stay', 'Experience the famous Kerala backwaters', '1N/2D', 8499, 15, '[{"day": 1, "description": "Board houseboat, cruise through backwaters"}, {"day": 2, "description": "Morning cruise, disembark after breakfast"}]', ARRAY['Accommodation on houseboat', 'All meals', 'Cruise'], ARRAY['Transportation to/from Alleppey', 'Personal expenses'], true),
('Wayanad Adventure Trip', 'Adventure and nature in the Western Ghats', '2N/3D', 9999, 10, '[{"day": 1, "description": "Arrival and check-in, visit Edakkal Caves"}, {"day": 2, "description": "Trekking and wildlife safari"}, {"day": 3, "description": "Visit waterfalls, departure"}]', ARRAY['Accommodation', 'Breakfast', 'Guided treks', 'Safari'], ARRAY['Flights', 'Personal expenses', 'Optional activities'], true);

-- Add some sample data for houseboats
INSERT INTO houseboats (name, description, location, price_per_night, capacity, bedrooms, amenities, is_luxury, is_featured) VALUES
('Premium Houseboat', 'Luxury houseboat with AC bedrooms', 'Alleppey', 15000, 6, 3, '["AC", "Kitchen", "Dining Area", "Sundeck"]', true, true),
('Standard Houseboat', 'Comfortable houseboat for families', 'Alleppey', 8000, 4, 2, '["Kitchen", "Dining Area", "Sundeck"]', false, true),
('Deluxe Houseboat', 'Modern houseboat with premium amenities', 'Kumarakom', 12000, 6, 3, '["AC", "Kitchen", "Dining Area", "Sundeck", "WiFi"]', true, true);

-- Add some sample data for taxis
INSERT INTO taxis (name, description, vehicle_type, capacity, price_per_km, base_fare, is_featured) VALUES
('Economy Sedan', 'Comfortable sedan for city travel', 'Sedan', 4, 12, 300, true),
('Premium SUV', 'Spacious SUV for family travel', 'SUV', 6, 18, 500, true),
('Traveller Van', 'Large van for group travel', 'Traveller', 12, 25, 800, true);

-- Add some sample data for activities
INSERT INTO activities (name, description, destination_id, duration, price, category, is_featured) VALUES
('Kathakali Show', 'Traditional Kerala dance performance', (SELECT id FROM destinations WHERE name = 'Kovalam'), '2 hours', 500, 'Cultural', true),
('Periyar Wildlife Safari', 'Boat safari in Periyar Tiger Reserve', (SELECT id FROM destinations WHERE name = 'Thekkady'), '3 hours', 1200, 'Adventure', true),
('Ayurvedic Spa Treatment', 'Traditional Kerala ayurvedic massage', (SELECT id FROM destinations WHERE name = 'Munnar'), '1 hour', 2000, 'Wellness', true);`}</pre>
              </div>

              <div className="mt-6 flex gap-4">
                <Link href="/setup">
                  <Button variant="outline">Back to Setup Guide</Button>
                </Link>
                <Link href="/">
                  <Button className="bg-green-600 hover:bg-green-700">Return to Home Page</Button>
                </Link>
              </div>
            </CardContent>
          </Card>
        </div>
      </main>

      <MainFooter />
    </div>
  )
}
