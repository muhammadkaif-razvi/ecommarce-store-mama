"use client";

import { Button } from '@/components/ui/button';
import { useCart } from '@/hooks/use-cart';
import { Trash2 } from 'lucide-react';
import Image from 'next/image';
import { useRouter } from 'next/navigation';

export const CartItemList = ({
  removeItem,
  updateQuantity
}: {
  removeItem: (id: string) => void;
  updateQuantity: (id: string, quantity: number) => void;
}) => {
  const { items } = useCart();
  const router = useRouter();

  return (
    <div className="md:col-span-2 space-y-6">
      {items.map(item => (
        <div
        onClick={() => router.push(`/product/${item.id}`)}
          key={item.id}
          className="flex flex-col md:flex-row items-center md:items-start gap-4 border rounded-lg p-4 shadow-sm transition hover:shadow-md bg-white"
        >
          {item.image ? (
            <div className="w-24 h-24 relative flex-shrink-0 rounded overflow-hidden border">
              <Image
                src={item.image}
                alt={item.name || 'Product image'}
                fill
                className="object-cover"
                sizes="96px"
              />
            </div>
          ) : (
            <div className="w-24 h-24 bg-gray-100 rounded flex items-center justify-center text-gray-500 text-sm">
              No Image
            </div>
          )}

          <div className="flex flex-col flex-grow space-y-1">
            <h3 className="font-semibold text-lg text-gray-800">{item.name}</h3>
            {item.variantName && <p className="text-sm text-gray-600 hover:underline">{item.variantName}</p>}
            {item.variantQuantity && <p className="text-xs text-gray-500">{item.variantQuantity}</p>}
            <p className="text-sm text-gray-700 font-medium">₹{item.price}</p>
          </div>

          <div className="flex items-center gap-2 md:ml-auto mt-2 md:mt-0">
            <Button
              onClick={() => updateQuantity(item.id, item.quantity - 1)}
              disabled={item.quantity <= 1}
              className="w-8 h-8 rounded-full text-lg border border-gray-300 hover:bg-gray-100 disabled:opacity-50"
            >
              -
            </Button>
            <span className="w-10 text-center text-sm font-medium">{item.quantity}</span>
            <Button
              onClick={() => updateQuantity(item.id, item.quantity + 1)}
              className="w-8 h-8 rounded-full text-lg border border-gray-300 hover:bg-gray-100"
            >
              +
            </Button>
            <Button
              onClick={() => removeItem(item.id)}
              variant="ghost"
              className="text-red-600 hover:text-red-800 p-2"
            >
              <Trash2 className="h-5 w-5" />
            </Button>
          </div>
        </div>
      ))}
    </div>
  );
};
