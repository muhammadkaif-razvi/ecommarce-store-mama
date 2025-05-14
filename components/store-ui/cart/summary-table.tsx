import { LoginButton } from "@/components/auth/login-button";
import { Button } from "@/components/ui/button";
import { useCurrentUser } from "@/hooks/use-current-user";

import { useSearchParams } from "next/navigation";
import { useEffect } from "react";
import { toast } from "sonner";
import axios from "axios";
import { useCart } from "@/hooks/use-cart";
import Currency from "../Currency";

export const SummaryTable = (
  { totalPrice,
    totalItems
  }: { totalPrice: number, totalItems: number },
) => {

  const { items, clearCart } = useCart();
  const user = useCurrentUser();
  const searchParams = useSearchParams();

  useEffect(() => {
    if (searchParams.get("success")) {
      clearCart();
      toast.success("Order placed successfully");
    }
    if (searchParams.get("cancel")) {
      toast.error("Order placement failed");
    }
  })



  const onCheckout = async () => {
    try {
      const response = await axios.post(
        `${process.env.NEXT_PUBLIC_API_URL}/checkout`,
        {
          variantIds: items.map((item) => item.id),
          quantities: items.map((item) => item.quantity),
          id:    user.id,
          name:  user.name,
          email: user.email,
          phone: user.phonenumber,
        }
      );

      window.location.href = response.data.url;
    } catch (error) {
      console.error("Checkout failed:", error);
      alert("Failed to start checkout.");
    }
  };



  return (
    <div className="md:col-span-1 bg-gray-100 p-4 rounded h-fit">
      <h2 className="text-xl font-bold mb-4">Order Summary</h2>
      <div className="flex justify-between mb-2">
        <span>Total Items:</span>
        <span>{totalItems}</span>
      </div>
      <div className="flex justify-between mb-4">
        <span className="font-bold">Subtotal:</span>
        <Currency value={totalPrice} />      </div>
      <Button
        onClick={clearCart}
        disabled={items.length === 0}
        className="w-full bg-red-600 text-white py-2 rounded hover:bg-red-700 disabled:opacity-50 mb-2 font-sans"
      >
        ❌ Clear Cart
      </Button>
      {user ? (
        <Button
          onClick={onCheckout}
          disabled={items.length === 0}
          className=" bg-green-600 text-white py-2 rounded hover:bg-green-700 disabled:opacity-50 font-sans w-full"
        >
          Checkout  ➜
        </Button>
      ) :
        (
          <LoginButton mode="modal" >

            ˗ˏˋ⚡︎ˎˊ˗ Continue



          </LoginButton>
        )}



    </div>
  )
}
