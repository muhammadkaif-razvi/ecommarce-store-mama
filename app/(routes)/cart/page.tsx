"use client"

import React from 'react';
import Image from 'next/image';
import Link from 'next/link';
import { ShoppingCart, Trash2 } from 'lucide-react';

import { Button } from '@/components/ui/button';
import { useCartStore } from '@/lib/store/cart';
import { Separator } from '@/components/ui/separator';
import { ScrollArea } from '@/components/ui/scroll-area';

const CartPage = () => {
  const { items, removeItem, updateQuantity, clearCart } = useCartStore();

  const cartTotal = items.reduce((total, item) => total + item.price * item.quantity, 0);

  if (items.length === 0) {
    return (
      <div className="container mx-auto py-10">
        <div className="flex flex-col items-center justify-center">
          <ShoppingCart className="h-16 w-16 text-muted-foreground mb-6" />
          <h2 className="text-2xl font-semibold text-muted-foreground mb-2">Your cart is empty</h2>
          <p className="text-muted-foreground mb-4">Looks like you haven't added anything yet.</p>
          <Button asChild>
            <Link href="/products">Continue Shopping</Link>
          </Button>
        </div>
      </div>
    );
  }

  return (
    <div className="container mx-auto py-10">
      <h1 className="text-3xl font-semibold mb-6">Your Cart ({items.length} items)</h1>
      <ScrollArea className="mb-6">
        <div className="space-y-6">
          {items.map((item) => (
            <div key={item.id} className="flex items-center border rounded-md p-4">
              <div className="relative h-24 w-24 md:h-32 md:w-32 rounded-md overflow-hidden mr-4">
                <Image src={item.image || "/placeholder.svg"} alt={item.name} fill className="object-cover" />
              </div>
              <div className="flex-1">
                <div className="flex justify-between items-start">
                  <div>
                    <Link href={`/products/${item.productId}`} className="font-medium hover:underline">
                      {item.name}
                    </Link>
                    <p className="text-sm text-muted-foreground">{item.variantName} - {item.variantQuantity}</p>
                  </div>
                  <Button variant="ghost" size="icon" className="h-8 w-8" onClick={() => removeItem(item.id)}>
                    <Trash2 className="h-4 w-4" />
                  </Button>
                </div>
                <div className="flex items-center justify-between mt-2">
                  <div className="flex items-center border rounded-md">
                    <Button
                      variant="ghost"
                      size="icon"
                      className="h-7 w-7 rounded-none rounded-l-md"
                      onClick={() => updateQuantity(item.id, Math.max(1, item.quantity - 1))}
                    >
                      <span className="text-xs">-</span>
                    </Button>
                    <span className="w-8 text-center text-sm">{item.quantity}</span>
                    <Button
                      variant="ghost"
                      size="icon"
                      className="h-7 w-7 rounded-none rounded-r-md"
                      onClick={() => updateQuantity(item.id, Math.min(10, item.quantity + 1))}
                    >
                      <span className="text-xs">+</span>
                    </Button>
                  </div>
                  <p className="font-medium text-lg">${(item.price * item.quantity).toFixed(2)}</p>
                </div>
              </div>
            </div>
          ))}
        </div>
      </ScrollArea>
      <Separator />
      <div className="mt-6 flex justify-between items-center">
        <span className="font-semibold text-lg">Subtotal</span>
        <span className="font-bold text-xl">${cartTotal.toFixed(2)}</span>
      </div>
      <div className="mt-4 flex justify-end gap-2">
        <Button variant="outline" onClick={clearCart}>
          Clear Cart
        </Button>
        <Button className="w-full sm:w-auto">Checkout</Button>
      </div>
    </div>
  );
};

export default CartPage;