
'use client';

import { CartItemList } from '@/components/store-ui/cart/cart-items-list';
import { SummaryTable } from '@/components/store-ui/cart/summary-table';
import { Button } from '@/components/ui/button';
import { useCart } from '@/hooks/use-cart';
import { ShoppingCart } from 'lucide-react';
import Link from 'next/link';

const CartPage = () => {
  const {
    items,
    error,
    removeItem,
    updateQuantity,

  } = useCart();



  if (error) {
    return <div className="container mx-auto p-4 text-red-500">Error: {error}</div>;
  }


  if (items.length === 0) {

    return (

      <div className="container mx-auto py-20 lg:py-40">

        <div className="flex flex-col items-center justify-center">

          <ShoppingCart className="h-16 w-16 text-muted-foreground mb-6" />

          <h2 className="text-2xl font-semibold text-muted-foreground mb-2">Your cart is empty</h2>

          <p className="text-muted-foreground mb-4">Looks like you have not added anything yet</p>

          <Button asChild>

            <Link href="/">Continue Shopping</Link>

          </Button>

        </div>

      </div>

    );

  }


  const totalItems = items.reduce((sum, item) => sum + item.quantity, 0);
  const totalPrice = items.reduce((sum, item) => sum + item.price * item.quantity, 0);


  return (
    <div className="container mx-auto p-4 mt-9 lg:mt-24">
      <h1 className="lg:text-3xl text-xl font-bold mb-4 font-sans">
        Your Cart ({totalItems} items)</h1>



      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        <CartItemList
          removeItem={removeItem}
          updateQuantity={updateQuantity} />

        <SummaryTable totalPrice={totalPrice} totalItems={totalItems} />
      </div>
    </div>
  );
};

export default CartPage;