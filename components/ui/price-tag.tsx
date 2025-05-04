import { cn } from "@/lib/utils"

interface PriceTagProps {
  price: number
  discountPercentage?: number
  originalPrice?: number
  className?: string
  size?: "sm" | "md" | "lg"
}

export function PriceTag({ price, discountPercentage, originalPrice, className, size = "md" }: PriceTagProps) {
  const formattedPrice = `₹${price.toLocaleString()}`
  const formattedOriginalPrice = originalPrice ? `₹${originalPrice.toLocaleString()}` : undefined

  const sizeClasses = {
    sm: "text-sm",
    md: "text-lg",
    lg: "text-2xl",
  }

  return (
    <div className={cn("flex items-center gap-2", className)}>
      <span className={cn("font-bold text-green-600", sizeClasses[size])}>{formattedPrice}</span>

      {(discountPercentage || originalPrice) && (
        <div className="flex items-center gap-2">
          {formattedOriginalPrice && (
            <span className="text-gray-500 line-through text-sm">{formattedOriginalPrice}</span>
          )}

          {discountPercentage && (
            <span className="bg-green-100 text-green-800 text-xs px-2 py-0.5 rounded-full">
              {discountPercentage}% OFF
            </span>
          )}
        </div>
      )}
    </div>
  )
}
