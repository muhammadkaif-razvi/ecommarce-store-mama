"use client"

import type React from "react"

import { useState } from "react"
import Image from "next/image"
import { Minus, Plus, ShoppingCart, Bolt } from "lucide-react"

import { Card, CardContent, CardFooter } from "@/components/ui/card"
import { AspectRatio } from "@/components/ui/aspect-ratio"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import axios from "axios"
import type { Product } from "@/types"
import { useRouter } from "next/navigation"
import Currency from "./Currency"
import { useCart } from "@/hooks/use-cart"
import { useCurrentUser } from "@/hooks/use-current-user"

export interface ProductCardProps {
  data: Product
}

export const ProductCard: React.FC<ProductCardProps> = ({ data }) => {
  const [quantity, setQuantity] = useState(1)
  const { addItem } = useCart()
  const router = useRouter()
  const firstVariant = data.variants[0]
  const user = useCurrentUser()

  const mainImage =
    data.variants[0]?.images[0]?.url || "/placeholder.svg?height=300&width=400" || data.images[0]?.url

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

  const handleBuyNow = async () => {
    if (!user) {
      handleAddToCart({ preventDefault: () => { } } as React.MouseEvent)
      window.location.href = "/login" // Replace "/login" with your actual login page URL
      return // Stop the function execution
    }
    try {
      const response = await axios.post(
        `${process.env.NEXT_PUBLIC_API_URL}/checkout`,
        {
          variantIds: [firstVariant.id],
          quantities: [quantity],
          id: user.id,
          name: user.name,
          email: user.email,
          phone: user.phonenumber,
        }
      )

      window.location.href = response.data.url
    } catch (error) {
      console.error("Checkout failed:", error)
      alert("Failed to start checkout.")
    }
  }

  return (
    <Card className="h-full overflow-hidden transition-all duration-200 hover:shadow-md w-full ">
      <div onClick={() => router.push(`/product/${firstVariant.id}`)} className="relative">
        <AspectRatio ratio={3 / 3}>
          <Image
            src={mainImage || "/placeholder.svg"}
            alt={data.name}
            fill
            className="object-cover"
            sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 20vw"
          />
        </AspectRatio>
        <div className="absolute top-2 right-2 flex flex-col gap-1">
          {data.isNewlaunch == true && (
            <Badge className="bg-primary text-primary-foreground whitespace-nowrap text-xs px-2">
              New Launch
            </Badge>
          )}
          {data.isBestseller == true && (
            <Badge className="bg-amber-500 text-white whitespace-nowrap text-xs px-2">
              Bestseller
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
              {firstVariant ? <Currency value={firstVariant.price} /> : "Price unavailable"}
            </p>
            <p className="text-xs text-muted-foreground">{firstVariant?.variantsepQuant || ""}</p>
          </div>
        </div>
      </CardContent>

      <CardFooter className="p-4 pt-0">
      
        <div className="flex flex-col items-center justify-between gap-2 w-full">
            <div className="flex items-center border rounded-md  sm:w-auto">
          <Button
            variant={"ghost"}
            size="icon"
            className="h-8 w-8 md:h-6 md:w-6 rounded-none rounded-l-md"
            onClick={decrementQuantity}
            disabled={quantity <= 1}
          >
            <Minus className="h-4 w-4" />
          </Button>
          <span className="w-8 text-center text-sm">{quantity}</span>
          <Button
            variant="ghost"
            size="icon"
            className="h-8 w-8 md:h-6 md:w-6 rounded-none rounded-r-md"
            onClick={incrementQuantity}
            disabled={!firstVariant || quantity >= 10}
          >
            <Plus className="h-4 w-4" />
          </Button>
        </div>
          <Button className="w-full  text-sm font-medium flex items-center justify-center " onClick={handleBuyNow}>
            <Bolt className="mr-2 h-4 w-4" />
            Buy Now
          </Button>
          <Button className="w-full  text-sm flex items-center justify-center" onClick={handleAddToCart} disabled={!firstVariant}>
            <ShoppingCart className="mr-2 h-4 w-4" />
            Add to Cart
          </Button>
        </div>
      </CardFooter>
    </Card>
  )
}

export default ProductCard