"use client"

import type React from "react"

import { useState } from "react"
import Image from "next/image"
import Link from "next/link"
import { Minus, Plus, ShoppingCart } from "lucide-react"

import { Card, CardContent, CardFooter } from "@/components/ui/card"
import { AspectRatio } from "@/components/ui/aspect-ratio"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import { useCartStore } from "@/lib/store/cart"

import type { Product } from "@/types"

export interface ProductCardProps {
  data: Product
}

export const ProductCard: React.FC<ProductCardProps> = ({ data }) => {
  const [quantity, setQuantity] = useState(1)
  const { addItem } = useCartStore()

  // Get the first variant for pricing display
  const firstVariant = data.variants[0]

  // Get the main product image, prioritizing product images if available
  const mainImage =
     data.variants[0]?.images[0]?.url || "/placeholder.svg?height=300&width=400"

  const incrementQuantity = (e: React.MouseEvent) => {
    e.preventDefault() // Prevent navigation due to Link
    setQuantity((prev) => Math.min(prev + 1, 10)) // Limit to 10 items
  }

  const decrementQuantity = (e: React.MouseEvent) => {
    e.preventDefault() // Prevent navigation due to Link
    setQuantity((prev) => Math.max(prev - 1, 1)) // Minimum 1 item
  }

  const handleAddToCart = (e: React.MouseEvent) => {
    e.preventDefault() // Prevent navigation due to Link

    if (firstVariant) {
      addItem({
        id: firstVariant.id,
        productId: data.id,
        name: data.name,
        price: firstVariant.price,
        variantName: firstVariant.name,
        variantQuantity: firstVariant.variantsepQuant,
        image: mainImage,
        quantity: quantity,
      })
    }
  }

  return (
    <div className="w-full sm:w-1/2 md:w-1/3 lg:w-1/4 xl:w-1/5 mb-6 px-2">
      <Link
        href={`/products/${data.id}`}
        className="block outline-none focus:ring-2 focus:ring-primary rounded-lg h-full"
      >
        <Card className="h-full overflow-hidden transition-all duration-200 hover:shadow-md">
          <div className="relative">
            <AspectRatio ratio={4 / 3}>
              <Image
                src={mainImage || "/placeholder.svg"}
                alt={data.name}
                fill
                className="object-cover"
                sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 20vw"
              />
            </AspectRatio>
            <div className="absolute top-2 right-2 flex flex-col gap-1">
              {data.isNewlaunch && (
                <Badge className="bg-primary text-primary-foreground whitespace-nowrap text-xs px-2">
                  New Launch
                </Badge>
              )}
              {data.isBestseller && (
                <Badge className="bg-amber-500 text-white whitespace-nowrap text-xs px-2">
                  Bestseller
                </Badge>
              )}
              {data.isFeatured && (
                <Badge className="bg-blue-500 text-white whitespace-nowrap text-xs px-2">
                  Trending
                </Badge>
              )}
            </div>
          </div>

          <CardContent className="p-4">
            <h3 className="font-medium text-lg line-clamp-1">{data.name}</h3>
            <p className="text-sm text-muted-foreground line-clamp-2 mt-1">{data.description}</p>

            <div className="mt-3 flex items-center justify-between">
              <div>
                <p className="text-lg font-bold">
                  ${firstVariant ? firstVariant.price : "Price unavailable"}
                </p>
                <p className="text-xs text-muted-foreground">{firstVariant?.variantsepQuant || ""}</p>
              </div>
            </div>
          </CardContent>

          <CardFooter className="p-4 pt-0">
            <div className="w-full">
              <div className="flex items-center justify-between mb-2">
                <div className="flex items-center border rounded-md">
                  <Button
                    variant="ghost"
                    size="icon"
                    className="h-8 w-8 rounded-none rounded-l-md"
                    onClick={decrementQuantity}
                    disabled={quantity <= 1}
                  >
                    <Minus className="h-3 w-3" />
                  </Button>
                  <span className="w-8 text-center">{quantity}</span>
                  <Button
                    variant="ghost"
                    size="icon"
                    className="h-8 w-8 rounded-none rounded-r-md"
                    onClick={incrementQuantity}
                    disabled={!firstVariant || quantity >= 10}
                  >
                    <Plus className="h-3 w-3" />
                  </Button>
                </div>
                <span className="text-sm font-medium">
                  ${firstVariant ? (firstVariant.price * quantity).toFixed(2) : "0.00"}
                </span>
              </div>
              <Button className="w-full" onClick={handleAddToCart} disabled={!firstVariant}>
                <ShoppingCart className="mr-2 h-4 w-4" />
                Add to Cart
              </Button>
            </div>
          </CardFooter>
        </Card>
      </Link>
    </div>
  )
}

export default ProductCard