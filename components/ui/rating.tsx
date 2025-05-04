import { Star, StarHalf } from "lucide-react"
import { cn } from "@/lib/utils"

interface RatingProps {
  value: number
  max?: number
  size?: "sm" | "md" | "lg"
  showValue?: boolean
  className?: string
}

export function Rating({ value, max = 5, size = "md", showValue = false, className }: RatingProps) {
  // Calculate full and half stars
  const fullStars = Math.floor(value)
  const hasHalfStar = value % 1 >= 0.5

  const sizeClasses = {
    sm: "h-3 w-3",
    md: "h-4 w-4",
    lg: "h-5 w-5",
  }

  return (
    <div className={cn("flex items-center gap-1", className)}>
      <div className="flex">
        {[...Array(fullStars)].map((_, i) => (
          <Star key={`full-${i}`} className={cn("fill-yellow-400 text-yellow-400", sizeClasses[size])} />
        ))}

        {hasHalfStar && <StarHalf className={cn("fill-yellow-400 text-yellow-400", sizeClasses[size])} />}

        {[...Array(max - fullStars - (hasHalfStar ? 1 : 0))].map((_, i) => (
          <Star key={`empty-${i}`} className={cn("text-gray-300", sizeClasses[size])} />
        ))}
      </div>

      {showValue && <span className="text-sm text-gray-600 ml-1">{value.toFixed(1)}</span>}
    </div>
  )
}
