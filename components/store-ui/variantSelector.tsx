"use client";
import { Product, Variant } from "@/types";
import { useRouter } from "next/navigation";
import Currency from "./Currency";
import { cn } from "@/lib/utils";

interface Props {
  varient: Variant;
  product: Product;
}

const VariantSelector: React.FC<Props> = ({
  varient,
  product
}) => {

  const router = useRouter();
  const variants = product.variants;

  const handleVariantClick = (variantId: string) => {
    router.push(`/product/${variantId}`);
  };

  return (
    <div className="mt-4 w-full">
    <span className="font-semibold font-sans block mb-2">Select Size</span>
    <div className="lg:grid  lg:grid-cols-2   gap-4 overflow-x-auto scrollbar-hide flex flex-row">
      {variants.map((item) => (
        <div
          key={item.id}
          onClick={() => handleVariantClick(item.id)}
          className={cn(
            "border rounded-lg p-4 flex flex-col items-start justify-between text-left cursor-pointer transition-all duration-200  h-[200px] w-full ",
            varient.id === item.id ? "border-blue-400 border-2 shadow-lg" : "hover:border-gray-300 shadow-md"
          )}
        >
          <span className="text-lg font-medium">{item.variantsepQuant}</span>
          <div className="text-2xl font-semibold">
            <Currency value={item.price} />
          </div>
          {item.price && item.variantsepQuant && (
            <span className="text-xs text-gray-600">
              (₹{(item.price / parseFloat(item.variantsepQuant.replace(/[^0-9.]/g, ''))).toFixed(2)} / {item.variantsepQuant})
            </span>
          )}
          <div className="text-xs font-semibold mt-auto">
            {item.inventory === 0 ? (
              <span className="text-gray-500">Out of Stock</span>
            ) : (
              <span className="text-green-500">In Stock</span>
            )}
          </div>
        </div>
      ))}
    </div>
  </div>
  );
};

export default VariantSelector;