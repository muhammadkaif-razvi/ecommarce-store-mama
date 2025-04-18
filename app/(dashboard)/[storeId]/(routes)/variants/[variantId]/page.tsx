import { db } from "@/lib/db"; // Ensure "@/lib/db" is the correct path to the database module
import { VariantForm } from "./components/form";

interface variantProps {
  params: Promise<{ variantId: string; storeId: string }>;
}
const variantPage = async (props: variantProps) => {
  const { variantId, storeId } = await props.params;

  const variant = await db.variant.findUnique({
    where: {
      id: variantId,
    },
    include: {
      images: true,
    },
  });

  const products = await db.product.findMany({
    where: {
      storeId,
    },
  });


  return (
    <div className="mt-8 flex-col">
      <div className="flex-1 space-y-4 p-8 pt-6 ">
        <VariantForm
          products={products} initialData={variant}        />
      </div>
    </div>
  );
};
export default variantPage;
