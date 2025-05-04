"use server"

import { supabase } from "./supabase"
import { mockDestinations, mockPackages, mockHotels, mockHouseboats, mockActivities, mockTaxis } from "./mock-data"
import type {
  Destination,
  Hotel,
  Package,
  Houseboat,
  Taxi,
  Activity,
  Booking,
  Review,
  WishlistItem,
} from "@/types/database"

// Destinations
export async function getFeaturedDestinations(): Promise<Destination[]> {
  try {
    const { data, error } = await supabase.from("destinations").select("*").eq("is_featured", true).order("name")

    if (error) {
      console.error("Error fetching destinations:", error.message)
      return mockDestinations.filter((d) => d.is_featured)
    }
    return data && data.length > 0 ? data : mockDestinations.filter((d) => d.is_featured)
  } catch (err) {
    console.error("Error in getFeaturedDestinations:", err)
    return mockDestinations.filter((d) => d.is_featured)
  }
}

export async function getAllDestinations(): Promise<Destination[]> {
  try {
    const { data, error } = await supabase.from("destinations").select("*").order("name")

    if (error) {
      console.error("Error fetching all destinations:", error.message)
      return mockDestinations
    }
    return data && data.length > 0 ? data : mockDestinations
  } catch (err) {
    console.error("Error in getAllDestinations:", err)
    return mockDestinations
  }
}

export async function getDestination(id: string): Promise<Destination> {
  try {
    const { data, error } = await supabase.from("destinations").select("*").eq("id", id).single()

    if (error) {
      console.error("Error fetching destination:", error.message)
      const mockDestination = mockDestinations.find((d) => d.id === id)
      if (!mockDestination) throw new Error("Destination not found")
      return mockDestination
    }
    return data
  } catch (err) {
    console.error("Error in getDestination:", err)
    const mockDestination = mockDestinations.find((d) => d.id === id)
    if (!mockDestination) throw new Error("Destination not found")
    return mockDestination
  }
}

// Hotels
export async function getFeaturedHotels(): Promise<Hotel[]> {
  try {
    const { data, error } = await supabase
      .from("hotels")
      .select("*, destination:destinations(*)")
      .eq("is_featured", true)
      .order("name")

    if (error) {
      console.error("Error fetching hotels:", error.message)
      return mockHotels.filter((h) => h.is_featured)
    }
    return data && data.length > 0 ? data : mockHotels.filter((h) => h.is_featured)
  } catch (err) {
    console.error("Error in getFeaturedHotels:", err)
    return mockHotels.filter((h) => h.is_featured)
  }
}

export async function getHotelsByDestination(destinationId: string): Promise<Hotel[]> {
  try {
    const { data, error } = await supabase
      .from("hotels")
      .select("*, destination:destinations(*)")
      .eq("destination_id", destinationId)
      .order("name")

    if (error) {
      console.error("Error fetching hotels by destination:", error.message)
      return mockHotels.filter((h) => h.destination_id === destinationId)
    }
    return data && data.length > 0 ? data : mockHotels.filter((h) => h.destination_id === destinationId)
  } catch (err) {
    console.error("Error in getHotelsByDestination:", err)
    return mockHotels.filter((h) => h.destination_id === destinationId)
  }
}

export async function getAllHotels(): Promise<Hotel[]> {
  try {
    const { data, error } = await supabase.from("hotels").select("*, destination:destinations(*)").order("name")

    if (error) {
      console.error("Error fetching all hotels:", error.message)
      return mockHotels
    }
    return data && data.length > 0 ? data : mockHotels
  } catch (err) {
    console.error("Error in getAllHotels:", err)
    return mockHotels
  }
}

export async function getHotel(id: string): Promise<Hotel> {
  try {
    const { data, error } = await supabase.from("hotels").select("*, destination:destinations(*)").eq("id", id).single()

    if (error) {
      console.error("Error fetching hotel:", error.message)
      const mockHotel = mockHotels.find((h) => h.id === id)
      if (!mockHotel) throw new Error("Hotel not found")
      return mockHotel
    }
    return data
  } catch (err) {
    console.error("Error in getHotel:", err)
    const mockHotel = mockHotels.find((h) => h.id === id)
    if (!mockHotel) throw new Error("Hotel not found")
    return mockHotel
  }
}

// Packages
export async function getFeaturedPackages(): Promise<Package[]> {
  try {
    const { data, error } = await supabase.from("packages").select("*").eq("is_featured", true).order("name")

    if (error) {
      console.error("Error fetching packages:", error.message)
      return mockPackages.filter((p) => p.is_featured)
    }
    return data && data.length > 0 ? data : mockPackages.filter((p) => p.is_featured)
  } catch (err) {
    console.error("Error in getFeaturedPackages:", err)
    return mockPackages.filter((p) => p.is_featured)
  }
}

export async function getAllPackages(): Promise<Package[]> {
  try {
    const { data, error } = await supabase.from("packages").select("*").order("name")

    if (error) {
      console.error("Error fetching all packages:", error.message)
      return mockPackages
    }
    return data && data.length > 0 ? data : mockPackages
  } catch (err) {
    console.error("Error in getAllPackages:", err)
    return mockPackages
  }
}

export async function getPackage(id: string): Promise<Package> {
  try {
    const { data, error } = await supabase.from("packages").select("*").eq("id", id).single()

    if (error) {
      console.error("Error fetching package:", error.message)
      const mockPackage = mockPackages.find((p) => p.id === id)
      if (!mockPackage) throw new Error("Package not found")
      return mockPackage
    }
    return data
  } catch (err) {
    console.error("Error in getPackage:", err)
    const mockPackage = mockPackages.find((p) => p.id === id)
    if (!mockPackage) throw new Error("Package not found")
    return mockPackage
  }
}

// Houseboats
export async function getFeaturedHouseboats(): Promise<Houseboat[]> {
  try {
    const { data, error } = await supabase.from("houseboats").select("*").eq("is_featured", true).order("name")

    if (error) {
      console.error("Error fetching houseboats:", error.message)
      return mockHouseboats.filter((h) => h.is_featured)
    }
    return data && data.length > 0 ? data : mockHouseboats.filter((h) => h.is_featured)
  } catch (err) {
    console.error("Error in getFeaturedHouseboats:", err)
    return mockHouseboats.filter((h) => h.is_featured)
  }
}

export async function getAllHouseboats(): Promise<Houseboat[]> {
  try {
    const { data, error } = await supabase.from("houseboats").select("*").order("name")

    if (error) {
      console.error("Error fetching all houseboats:", error.message)
      return mockHouseboats
    }
    return data && data.length > 0 ? data : mockHouseboats
  } catch (err) {
    console.error("Error in getAllHouseboats:", err)
    return mockHouseboats
  }
}

export async function getHouseboat(id: string): Promise<Houseboat> {
  try {
    const { data, error } = await supabase.from("houseboats").select("*").eq("id", id).single()

    if (error) {
      console.error("Error fetching houseboat:", error.message)
      const mockHouseboat = mockHouseboats.find((h) => h.id === id)
      if (!mockHouseboat) throw new Error("Houseboat not found")
      return mockHouseboat
    }
    return data
  } catch (err) {
    console.error("Error in getHouseboat:", err)
    const mockHouseboat = mockHouseboats.find((h) => h.id === id)
    if (!mockHouseboat) throw new Error("Houseboat not found")
    return mockHouseboat
  }
}

// Taxis
export async function getFeaturedTaxis(): Promise<Taxi[]> {
  try {
    const { data, error } = await supabase.from("taxis").select("*").eq("is_featured", true).order("name")

    if (error) {
      console.error("Error fetching taxis:", error.message)
      return mockTaxis.filter((t) => t.is_featured)
    }
    return data && data.length > 0 ? data : mockTaxis.filter((t) => t.is_featured)
  } catch (err) {
    console.error("Error in getFeaturedTaxis:", err)
    return mockTaxis.filter((t) => t.is_featured)
  }
}

export async function getAllTaxis(): Promise<Taxi[]> {
  try {
    const { data, error } = await supabase.from("taxis").select("*").order("name")

    if (error) {
      console.error("Error fetching all taxis:", error.message)
      return mockTaxis
    }
    return data && data.length > 0 ? data : mockTaxis
  } catch (err) {
    console.error("Error in getAllTaxis:", err)
    return mockTaxis
  }
}

export async function getTaxi(id: string): Promise<Taxi> {
  try {
    const { data, error } = await supabase.from("taxis").select("*").eq("id", id).single()

    if (error) {
      console.error("Error fetching taxi:", error.message)
      const mockTaxi = mockTaxis.find((t) => t.id === id)
      if (!mockTaxi) throw new Error("Taxi not found")
      return mockTaxi
    }
    return data
  } catch (err) {
    console.error("Error in getTaxi:", err)
    const mockTaxi = mockTaxis.find((t) => t.id === id)
    if (!mockTaxi) throw new Error("Taxi not found")
    return mockTaxi
  }
}

// Activities
export async function getFeaturedActivities(): Promise<Activity[]> {
  try {
    const { data, error } = await supabase
      .from("activities")
      .select("*, destination:destinations(*)")
      .eq("is_featured", true)
      .order("name")

    if (error) {
      console.error("Error fetching activities:", error.message)
      return mockActivities.filter((a) => a.is_featured)
    }
    return data && data.length > 0 ? data : mockActivities.filter((a) => a.is_featured)
  } catch (err) {
    console.error("Error in getFeaturedActivities:", err)
    return mockActivities.filter((a) => a.is_featured)
  }
}

export async function getActivitiesByDestination(destinationId: string): Promise<Activity[]> {
  try {
    const { data, error } = await supabase
      .from("activities")
      .select("*, destination:destinations(*)")
      .eq("destination_id", destinationId)
      .order("name")

    if (error) {
      console.error("Error fetching activities by destination:", error.message)
      return mockActivities.filter((a) => a.destination_id === destinationId)
    }
    return data && data.length > 0 ? data : mockActivities.filter((a) => a.destination_id === destinationId)
  } catch (err) {
    console.error("Error in getActivitiesByDestination:", err)
    return mockActivities.filter((a) => a.destination_id === destinationId)
  }
}

export async function getActivity(id: string): Promise<Activity> {
  try {
    const { data, error } = await supabase
      .from("activities")
      .select("*, destination:destinations(*)")
      .eq("id", id)
      .single()

    if (error) {
      console.error("Error fetching activity:", error.message)
      const mockActivity = mockActivities.find((a) => a.id === id)
      if (!mockActivity) throw new Error("Activity not found")
      return mockActivity
    }
    return data
  } catch (err) {
    console.error("Error in getActivity:", err)
    const mockActivity = mockActivities.find((a) => a.id === id)
    if (!mockActivity) throw new Error("Activity not found")
    return mockActivity
  }
}

// Bookings
export async function getUserBookings(userId: string): Promise<Booking[]> {
  try {
    const { data, error } = await supabase
      .from("bookings")
      .select("*")
      .eq("user_id", userId)
      .order("created_at", { ascending: false })

    if (error) {
      console.error("Error fetching user bookings:", error.message)
      return []
    }
    return data || []
  } catch (err) {
    console.error("Error in getUserBookings:", err)
    return []
  }
}

export async function createBooking(booking: Omit<Booking, "id" | "created_at" | "updated_at">): Promise<Booking> {
  try {
    const { data, error } = await supabase.from("bookings").insert(booking).select().single()

    if (error) {
      console.error("Error creating booking:", error.message)
      throw new Error("Failed to create booking")
    }
    return data
  } catch (err) {
    console.error("Error in createBooking:", err)
    throw new Error("Failed to create booking")
  }
}

// Reviews
export async function getItemReviews(itemType: string, itemId: string): Promise<Review[]> {
  try {
    const { data, error } = await supabase
      .from("reviews")
      .select("*, user:users(full_name)")
      .eq("review_type", itemType)
      .eq("item_id", itemId)
      .order("created_at", { ascending: false })

    if (error) {
      console.error("Error fetching reviews:", error.message)
      return []
    }
    return data || []
  } catch (err) {
    console.error("Error in getItemReviews:", err)
    return []
  }
}

export async function createReview(review: Omit<Review, "id" | "created_at" | "updated_at">): Promise<Review> {
  try {
    const { data, error } = await supabase.from("reviews").insert(review).select().single()

    if (error) {
      console.error("Error creating review:", error.message)
      throw new Error("Failed to create review")
    }
    return data
  } catch (err) {
    console.error("Error in createReview:", err)
    throw new Error("Failed to create review")
  }
}

// Wishlist
export async function getUserWishlist(userId: string): Promise<WishlistItem[]> {
  try {
    const { data, error } = await supabase
      .from("wishlist_items")
      .select("*")
      .eq("user_id", userId)
      .order("created_at", { ascending: false })

    if (error) {
      console.error("Error fetching wishlist:", error.message)
      return []
    }
    return data || []
  } catch (err) {
    console.error("Error in getUserWishlist:", err)
    return []
  }
}

export async function addToWishlist(wishlistItem: Omit<WishlistItem, "id" | "created_at">): Promise<WishlistItem> {
  try {
    const { data, error } = await supabase.from("wishlist_items").insert(wishlistItem).select().single()

    if (error) {
      console.error("Error adding to wishlist:", error.message)
      throw new Error("Failed to add to wishlist")
    }
    return data
  } catch (err) {
    console.error("Error in addToWishlist:", err)
    throw new Error("Failed to add to wishlist")
  }
}

export async function removeFromWishlist(id: string): Promise<void> {
  try {
    const { error } = await supabase.from("wishlist_items").delete().eq("id", id)

    if (error) {
      console.error("Error removing from wishlist:", error.message)
      throw new Error("Failed to remove from wishlist")
    }
  } catch (err) {
    console.error("Error in removeFromWishlist:", err)
    throw new Error("Failed to remove from wishlist")
  }
}
