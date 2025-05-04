export type UserRole = "user" | "admin"
export type BookingStatus = "pending" | "confirmed" | "cancelled" | "completed"
export type PaymentStatus = "pending" | "paid" | "refunded" | "failed"

export interface User {
  id: string
  full_name: string | null
  phone_number: string | null
  address: string | null
  city: string | null
  state: string | null
  country: string | null
  postal_code: string | null
  role: UserRole
  created_at: string
  updated_at: string
}

export interface Destination {
  id: string
  name: string
  description: string | null
  image_url: string | null
  location: string | null
  is_featured: boolean
  created_at: string
  updated_at: string
}

export interface Hotel {
  id: string
  name: string
  description: string | null
  destination_id: string | null
  address: string | null
  price_per_night: number
  star_rating: number | null
  amenities: string[] | null
  images: string[] | null
  latitude: number | null
  longitude: number | null
  is_featured: boolean
  created_at: string
  updated_at: string
  destination?: Destination
}

export interface Package {
  id: string
  name: string
  description: string | null
  duration: string
  price: number
  discount_percentage: number
  itinerary: Array<{ day: number; description: string }> | null
  inclusions: string[] | null
  exclusions: string[] | null
  images: string[] | null
  is_featured: boolean
  created_at: string
  updated_at: string
  destinations?: Destination[]
}

export interface Houseboat {
  id: string
  name: string
  description: string | null
  location: string
  price_per_night: number
  capacity: number
  bedrooms: number
  amenities: string[] | null
  images: string[] | null
  is_luxury: boolean
  is_featured: boolean
  created_at: string
  updated_at: string
}

export interface Taxi {
  id: string
  name: string
  description: string | null
  vehicle_type: string
  capacity: number
  price_per_km: number
  base_fare: number
  images: string[] | null
  is_featured: boolean
  created_at: string
  updated_at: string
}

export interface Activity {
  id: string
  name: string
  description: string | null
  destination_id: string | null
  duration: string | null
  price: number
  category: string | null
  images: string[] | null
  is_featured: boolean
  created_at: string
  updated_at: string
  destination?: Destination
}

export interface Booking {
  id: string
  user_id: string | null
  booking_type: string
  item_id: string
  start_date: string
  end_date: string
  adults: number
  children: number
  total_amount: number
  status: BookingStatus
  payment_status: PaymentStatus
  special_requests: string | null
  created_at: string
  updated_at: string
}

export interface Review {
  id: string
  user_id: string | null
  review_type: string
  item_id: string
  rating: number
  comment: string | null
  images: string[] | null
  created_at: string
  updated_at: string
  user?: User
}

export interface WishlistItem {
  id: string
  user_id: string
  item_type: string
  item_id: string
  created_at: string
}
