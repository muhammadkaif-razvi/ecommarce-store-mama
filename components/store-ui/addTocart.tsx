"use client"
import { useState } from 'react';
import { Button } from "@/components/ui/button";
import { Plus, Minus, ShoppingCart } from "lucide-react";
import Currency from "./Currency"; // Assuming this is in a relative path
import { Variant } from "@/types"; // Adjust the path if needed
import { LightningBoltIcon } from '@radix-ui/react-icons';
import { useRouter } from 'next/navigation';
import axios from "axios"
import { useCart } from '@/hooks/use-cart';
import { useCurrentUser } from '@/hooks/use-current-user';

interface Props {
  data: Variant;
}

const AddToCart: React.FC<Props> = ({ data }) => {
  const [quantity, setQuantity] = useState(1);
  const { addItem } = useCart();
  const user = useCurrentUser();

  const firstVariant = data;
  const mainImage = data?.images?.[0]?.url || "/placeholder.svg?height=300&width=400";

  const incrementQuantity = (e: React.MouseEvent) => {
    e.preventDefault();
    setQuantity((prev) => Math.min(prev + 1, 10)); // Limit to 10 items
  };

  const decrementQuantity = (e: React.MouseEvent) => {
    e.preventDefault();
    setQuantity((prev) => Math.max(prev - 1, 1)); // Minimum 1 item
  };

  const handleAddToCart = (e: React.MouseEvent) => {
    e.preventDefault();

    if (firstVariant) {
      addItem({
        id: firstVariant.id,
        productId: data.productId, // You might need to pass this
        name: data.name, // You might need to pass this
        price: firstVariant.price,
        variantName: firstVariant.name,
        variantQuantity: firstVariant.variantsepQuant,
        image: mainImage,
        quantity: quantity,
      });
    }
  };
  const handleBuyNow = async () => {
    if (!user) {
      handleAddToCart({ preventDefault: () => { } } as React.MouseEvent);
      window.location.href = "/login"; // Replace "/login" with your actual login page URL
      return; // Stop the function execution
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
      );

      window.location.href = response.data.url;
    } catch (error) {
      console.error("Checkout failed:", error);
      alert("Failed to start checkout.");
    }
  };







  return (
    <div className="w-full max-w-[350px] max-h-[250px] border p-3  rounded-lg shadow-lg lg:mt-14 md:mt-10 mt-8">
      <div className="flex items-center justify-between mb-7 p-3 space-y-2">
        <div>
          <Currency value={firstVariant.price} />
          <p className="text-xs text-gray-500">Inclusive of all Taxes</p>
        </div>
        <div>{firstVariant.variantsepQuant}</div>
      </div>

      <div className="flex items-center mb-4">
        <span className="mr-2 text-sm font-medium">Quantity:</span>
        <div className="flex items-center border rounded-sm shadow-sm">
          <Button
            variant="outline"
            size="icon"
            onClick={decrementQuantity}
            className="rounded-l-md border-none shadow-none"
            disabled={quantity <= 1}
          >
            <Minus className="h-4 w-4" />
          </Button>
          <span className="px-4 py-2  border-gray-300 text-center w-12">
            {quantity}
          </span>
          <Button
            variant={"outline"}
            size="icon"
            onClick={incrementQuantity}
            className="rounded-r-md border-none shadow-none"
            disabled={quantity >= 10}
          >
            <Plus className="h-4 w-4" />
          </Button>
        </div>
      </div>

      <Button
        className="w-full bg-emerald-500 hover:bg-emerald-600 text-white font-semibold py-2 px-4 rounded flex items-center justify-center"
        onClick={handleAddToCart}
      >
        <ShoppingCart className="mr-2 h-4 w-4" />
        Add to Cart
      </Button>
      <Button
        className="w-full bg-blue-500 hover:bg-blue-600 text-white font-semibold py-2 px-4 rounded flex items-center justify-center my-2"
        onClick={handleBuyNow}
      >
        <LightningBoltIcon className="mr-2 h-4 w-4" />
        Buy Now
      </Button>
    </div>
  );
};

export default AddToCart;
