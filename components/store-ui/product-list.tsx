"use client"

import type React from "react"

import { useRef, useState, useEffect } from "react"
import { ChevronLeft, ChevronRight } from "lucide-react"

import type { Product } from "@/types"
import NoResults from "@/components/store-ui/no-results"

import { Button } from "@/components/ui/button"
import { cn } from "@/lib/utils"
import { ProductCard } from "./Product-card"

interface ProductListProps {
  title: string
  items: Product[]
  className?: string
}

const ProductList: React.FC<ProductListProps> = ({ title, items, className }) => {
  const [canScrollLeft, setCanScrollLeft] = useState(false)
  const [canScrollRight, setCanScrollRight] = useState(false)
  const containerRef = useRef<HTMLDivElement>(null)

  const checkScrollButtons = () => {
    const container = containerRef.current
    if (!container) return

    setCanScrollLeft(container.scrollLeft > 0)
    setCanScrollRight(container.scrollLeft < container.scrollWidth - container.clientWidth - 10) // 10px buffer
  }

  useEffect(() => {
    checkScrollButtons()
    window.addEventListener("resize", checkScrollButtons)
    return () => window.removeEventListener("resize", checkScrollButtons)
  }, [items])

  const scroll = (direction: "left" | "right") => {
    const container = containerRef.current
    if (!container) return

    const scrollAmount = 320 // Approximate width of a card + gap
    const scrollLeft = direction === "left" ? container.scrollLeft - scrollAmount : container.scrollLeft + scrollAmount

    container.scrollTo({
      left: scrollLeft,
      behavior: "smooth",
    })

    // Update button states after scrolling
    setTimeout(checkScrollButtons, 500)
  }

  if (items.length === 0) {
    return (
      <div className={cn("space-y-4", className)}>
        <h3 className="font-bold text-3xl">{title}</h3>
        <NoResults />
      </div>
    )
  }

  return (
    <div className={cn("space-y-4 relative", className)}>
      <div className="flex items-center justify-between">
        <h3 className="font-bold text-3xl">{title}</h3>

        {/* Navigation buttons for larger screens */}
        <div className="hidden md:flex items-center gap-2">
          <Button
            variant="outline"
            size="icon"
            className="rounded-full"
            onClick={() => scroll("left")}
            disabled={!canScrollLeft}
          >
            <ChevronLeft className="h-4 w-4" />
          </Button>
          <Button
            variant="outline"
            size="icon"
            className="rounded-full"
            onClick={() => scroll("right")}
            disabled={!canScrollRight}
          >
            <ChevronRight className="h-4 w-4" />
          </Button>
        </div>
      </div>

      {/* Scrollable container */}
      <div
        ref={containerRef}
        className="flex overflow-x-auto gap-4 pb-4 snap-x scrollbar-hide"
        onScroll={checkScrollButtons}
      >
        {items.map((item) => (
          <div key={item.id} className="min-w-[280px] md:min-w-0 snap-start md:w-full flex-shrink-0 md:flex-shrink">
            <ProductCard data={item} />
          </div>
        ))}
      </div>

      {/* Scroll indicators for mobile */}
      <div className="flex justify-center gap-1 md:hidden">
        {canScrollLeft && <div className="w-1.5 h-1.5 rounded-full bg-primary"></div>}
        {canScrollRight && <div className="w-1.5 h-1.5 rounded-full bg-primary opacity-50"></div>}
      </div>
    </div>
  )
}

export default ProductList
