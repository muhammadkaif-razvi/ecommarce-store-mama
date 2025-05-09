import { LoginButton } from "@/components/auth/login-button";
import { Button } from "@/components/ui/button";
import { useCurrentUser } from "@/hooks/use-current-user";

import { useSearchParams } from "next/navigation";
import { useEffect } from "react";
import { toast } from "sonner";
import axios from "axios";

export const SummaryTable =  ({
   totalPrice,
    totalItems,
     clearCart, 
     items 
    }: {  totalPrice: number;
  totalItems: number;
  clearCart: () => void;
  items: any;}
) => {
  const user = useCurrentUser();
  const  searchParams  = useSearchParams();

  useEffect(() => {
    if(searchParams.get("success")) {
      clearCart();
      toast.success("Order placed successfully");
    }
    if(searchParams.get("canceled")) {
      toast.error("Order placement failed");
    }
  })

  
  const onCheckout = async() => {
    const response = await axios.post(
      `${process.env.NEXT_PUBLIC_API_URL}/checkout`,
      { varientIds: items.map((item: any) => item.id) },
      {}
    )
  }

  return (
    <div className="md:col-span-1 bg-gray-100 p-4 rounded h-fit">
      <h2 className="text-xl font-bold mb-4">Order Summary</h2>
      <div className="flex justify-between mb-2">
        <span>Total Items:</span>
        <span>{totalItems}</span>
      </div>
      <div className="flex justify-between mb-4">
        <span className="font-bold">Subtotal:</span>
        <span className="font-bold">${totalPrice.toFixed(2)}</span>
      </div>
      <Button
        onClick={clearCart}
        disabled={items.length === 0}
        className="w-full bg-red-600 text-white py-2 rounded hover:bg-red-700 disabled:opacity-50 mb-2"
      >
        Clear Cart
      </Button>
      {user ? (
        <Button
          disabled={items.length === 0}
          className="w-full bg-green-600 text-white py-2 rounded hover:bg-green-700 disabled:opacity-50"
        >
          Checkout
        </Button>
      ) :
        (
          <LoginButton mode="modal">
            <Button
              disabled={items.length === 0}
              className="w-full bg-green-600 text-white py-2 rounded hover:bg-green-700 disabled:opacity-50"
            >
              Continue
            </Button>
          </LoginButton>
        )}



    </div>)
}
