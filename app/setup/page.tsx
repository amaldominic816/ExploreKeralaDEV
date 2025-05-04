import Link from "next/link"
import { MainHeader } from "@/components/main-header"
import { MainFooter } from "@/components/main-footer"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"

export default function SetupPage() {
  return (
    <div className="min-h-screen flex flex-col">
      <MainHeader />

      <main className="flex-1 container mx-auto px-4 py-8">
        <div className="max-w-4xl mx-auto">
          <h1 className="text-3xl font-bold mb-2">Database Setup Guide</h1>
          <p className="text-gray-600 mb-8">
            Follow these steps to set up your Supabase database for the Kerala Tourism application
          </p>

          <Tabs defaultValue="overview">
            <TabsList className="mb-6">
              <TabsTrigger value="overview">Overview</TabsTrigger>
              <TabsTrigger value="schema">Database Schema</TabsTrigger>
              <TabsTrigger value="mock">Using Mock Data</TabsTrigger>
            </TabsList>

            <TabsContent value="overview">
              <Card>
                <CardHeader>
                  <CardTitle>Database Setup Overview</CardTitle>
                  <CardDescription>
                    The application is currently using mock data because the Supabase database tables are not set up yet
                  </CardDescription>
                </CardHeader>
                <CardContent className="space-y-4">
                  <p>
                    The Kerala Tourism application requires a Supabase database with several tables to store information
                    about destinations, hotels, packages, and more. Currently, the application is using mock data
                    because the database tables have not been created yet.
                  </p>

                  <h3 className="text-lg font-semibold mt-4">Setup Steps</h3>
                  <ol className="list-decimal pl-5 space-y-2">
                    <li>Create a Supabase project if you haven't already</li>
                    <li>Set up the environment variables in your project</li>
                    <li>Run the SQL script to create the database schema</li>
                    <li>Insert sample data or use the application to add data</li>
                  </ol>

                  <div className="bg-yellow-50 border border-yellow-200 rounded-md p-4 mt-4">
                    <h4 className="font-semibold text-yellow-800">Note</h4>
                    <p className="text-yellow-700">
                      Until the database is set up, the application will continue to use mock data. This allows you to
                      preview the application's functionality without a database connection.
                    </p>
                  </div>
                </CardContent>
              </Card>
            </TabsContent>

            <TabsContent value="schema">
              <Card>
                <CardHeader>
                  <CardTitle>Database Schema</CardTitle>
                  <CardDescription>SQL script to create the database tables</CardDescription>
                </CardHeader>
                <CardContent>
                  <p className="mb-4">
                    Run the following SQL script in your Supabase SQL editor to create the necessary tables:
                  </p>

                  <div className="bg-gray-900 text-gray-100 p-4 rounded-md overflow-auto max-h-[500px] text-sm">
                    <pre>{`-- Enable Row Level Security
ALTER DATABASE postgres SET "app.jwt_secret" TO 'your-jwt-secret';

-- Create custom types
CREATE TYPE user_role AS ENUM ('user', 'admin');
CREATE TYPE booking_status AS ENUM ('pending', 'confirmed', 'cancelled', 'completed');
CREATE TYPE payment_status AS ENUM ('pending', 'paid', 'refunded', 'failed');

-- Create users table (extends Supabase auth.users)
CREATE TABLE users (
  id UUID REFERENCES auth.users(id) ON DELETE CASCADE PRIMARY KEY,
  full_name TEXT,
  phone_number TEXT,
  address TEXT,
  city TEXT,
  state TEXT,
  country TEXT,
  postal_code TEXT,
  role user_role DEFAULT 'user',
  created_at TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP,
  updated_at TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP
);

-- Create destinations table
CREATE TABLE destinations (
  id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
  name TEXT NOT NULL,
  description TEXT,
  image_url TEXT,
  location TEXT,
  is_featured BOOLEAN DEFAULT false,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP,
  updated_at TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP
);

-- Create hotels table
CREATE TABLE hotels (
  id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
  name TEXT NOT NULL,
  description TEXT,
  destination_id UUID REFERENCES destinations(id) ON DELETE SET NULL,
  address TEXT,
  price_per_night DECIMAL(10, 2) NOT NULL,
  star_rating INTEGER CHECK (star_rating BETWEEN 1 AND 5),
  amenities JSONB,
  images JSONB,
  latitude DECIMAL(10, 8),
  longitude DECIMAL(11, 8),
  is_featured BOOLEAN DEFAULT false,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP,
  updated_at TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP
);

-- Create tour packages table
CREATE TABLE packages (
  id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
  name TEXT NOT NULL,
  description TEXT,
  duration TEXT NOT NULL, -- e.g., "3N/4D"
  price DECIMAL(10, 2) NOT NULL,
  discount_percentage INTEGER DEFAULT 0,
  itinerary JSONB,
  inclusions TEXT[],
  exclusions TEXT[],
  images JSONB,
  is_featured BOOLEAN DEFAULT false,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP,
  updated_at TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP
);

-- Create houseboats table
CREATE TABLE houseboats (
  id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
  name TEXT NOT NULL,
  description TEXT,
  location TEXT NOT NULL,
  price_per_night DECIMAL(10, 2) NOT NULL,
  capacity INTEGER NOT NULL,
  bedrooms INTEGER NOT NULL,
  amenities JSONB,
  images JSONB,
  is_luxury BOOLEAN DEFAULT false,
  is_featured BOOLEAN DEFAULT false,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP,
  updated_at TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP
);

-- Create taxis table
CREATE TABLE taxis (
  id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
  name TEXT NOT NULL,
  description TEXT,
  vehicle_type TEXT NOT NULL, -- e.g., "Sedan", "SUV", "Traveller"
  capacity INTEGER NOT NULL,
  price_per_km DECIMAL(10, 2) NOT NULL,
  base_fare DECIMAL(10, 2) NOT NULL,
  images JSONB,
  is_featured BOOLEAN DEFAULT false,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP,
  updated_at TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP
);

-- Create activities table
CREATE TABLE activities (
  id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
  name TEXT NOT NULL,
  description TEXT,
  destination_id UUID REFERENCES destinations(id) ON DELETE SET NULL,
  duration TEXT, -- e.g., "2 hours"
  price DECIMAL(10, 2) NOT NULL,
  category TEXT, -- e.g., "Adventure", "Cultural", "Wellness"
  images JSONB,
  is_featured BOOLEAN DEFAULT false,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP,
  updated_at TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP
);

-- Create bookings table
CREATE TABLE bookings (
  id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
  user_id UUID REFERENCES users(id) ON DELETE SET NULL,
  booking_type TEXT NOT NULL, -- 'hotel', 'package', 'houseboat', 'taxi', 'activity'
  item_id UUID NOT NULL, -- References the ID of the booked item (hotel, package, etc.)
  start_date DATE NOT NULL,
  end_date DATE NOT NULL,
  adults INTEGER NOT NULL DEFAULT 1,
  children INTEGER DEFAULT 0,
  total_amount DECIMAL(10, 2) NOT NULL,
  status booking_status DEFAULT 'pending',
  payment_status payment_status DEFAULT 'pending',
  special_requests TEXT,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP,
  updated_at TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP
);

-- Create reviews table
CREATE TABLE reviews (
  id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
  user_id UUID REFERENCES users(id) ON DELETE SET NULL,
  review_type TEXT NOT NULL, -- 'hotel', 'package', 'houseboat', 'taxi', 'activity'
  item_id UUID NOT NULL, -- References the ID of the reviewed item
  rating INTEGER NOT NULL CHECK (rating BETWEEN 1 AND 5),
  comment TEXT,
  images JSONB,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP,
  updated_at TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP
);

-- Create wishlist table
CREATE TABLE wishlist_items (
  id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
  user_id UUID REFERENCES users(id) ON DELETE CASCADE,
  item_type TEXT NOT NULL, -- 'hotel', 'package', 'houseboat', 'taxi', 'activity'
  item_id UUID NOT NULL,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP
);`}</pre>
                  </div>

                  <div className="mt-6">
                    <Link href="/setup/sample-data">
                      <Button className="bg-green-600 hover:bg-green-700">View Sample Data SQL</Button>
                    </Link>
                  </div>
                </CardContent>
              </Card>
            </TabsContent>

            <TabsContent value="mock">
              <Card>
                <CardHeader>
                  <CardTitle>Using Mock Data</CardTitle>
                  <CardDescription>How the application works with mock data</CardDescription>
                </CardHeader>
                <CardContent className="space-y-4">
                  <p>
                    The application is designed to work even without a database connection by using mock data. This
                    allows you to preview and test the application's functionality before setting up the database.
                  </p>

                  <h3 className="text-lg font-semibold mt-4">How Mock Data Works</h3>
                  <ul className="list-disc pl-5 space-y-2">
                    <li>
                      When a database query fails, the application automatically falls back to using predefined mock
                      data
                    </li>
                    <li>
                      Mock data is stored in the <code>lib/mock-data.ts</code> file and includes sample destinations,
                      hotels, packages, and more
                    </li>
                    <li>
                      All API functions in <code>lib/api.ts</code> are designed to gracefully handle database errors and
                      return mock data when needed
                    </li>
                  </ul>

                  <div className="bg-blue-50 border border-blue-200 rounded-md p-4 mt-4">
                    <h4 className="font-semibold text-blue-800">Limitations</h4>
                    <p className="text-blue-700">
                      While mock data allows you to preview the application, some features like user authentication,
                      bookings, and reviews will have limited functionality until the database is properly set up.
                    </p>
                  </div>

                  <div className="mt-6">
                    <Link href="/">
                      <Button className="bg-green-600 hover:bg-green-700">Return to Home Page</Button>
                    </Link>
                  </div>
                </CardContent>
              </Card>
            </TabsContent>
          </Tabs>
        </div>
      </main>

      <MainFooter />
    </div>
  )
}
