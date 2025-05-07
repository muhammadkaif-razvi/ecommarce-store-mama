"use client"

import * as React from "react"
import type { Product } from "@/types"
import NoResults from "@/components/store-ui/no-results"
import { ProductCard } from "./Product-card"
import { cn } from "@/lib/utils"

import {
  Carousel,
  CarouselContent,
  CarouselItem,
  CarouselNext,
  CarouselPrevious,
} from "@/components/ui/carousel"

interface ProductListProps {
  title: string
  items: Product[]
  className?: string
}

const ProductList: React.FC<ProductListProps> = ({ title, items, className }) => {
  if (items.length === 0) {
    return (
      <div className={cn("space-y-4", className)}>
        <h3 className="font-bold text-3xl">{title}</h3>
        <NoResults />
      </div>
    )
  }

  return (
    <div className={cn("space-y-4", className)}>
      <div className="flex items-center justify-between">
        <h3 className="font-bold text-3xl">{title}</h3>
      </div>

      <div className="relative">
        <Carousel opts={{ align: "start" }} className="w-full  lg:px-8">
          <CarouselContent>
            {items.map((item) => (
              <CarouselItem
                key={item.id}
                className=" basis-1/2 md:basis-1/3 lg:basis-1/4"
              >
                <div className="lg:p-2">
                  <ProductCard data={item} />
                </div>
              </CarouselItem>
            ))}
          </CarouselContent>
          {/* Position the buttons correctly for all screen sizes */}
          <CarouselPrevious className="absolute left-0 top-1/2 transform -translate-y-1/2 p-2 bg-white rounded-full shadow-md">
            <span className="text-2xl">&lt;</span>
          </CarouselPrevious>
          <CarouselNext className="absolute right-0 top-1/2 transform -translate-y-1/2 p-2 bg-white rounded-full shadow-md">
            <span className="text-2xl">&gt;</span>
          </CarouselNext>
        </Carousel>
      </div>
    </div>
  )
}

export default ProductList
