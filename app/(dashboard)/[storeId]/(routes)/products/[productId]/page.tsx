import { db } from "@/lib/db";
import { ProductForm } from "./components/Product-form";

interface ProductProps {
  params: Promise<{ productId: string ,storeId: string}>;
}
const ProductPage = async (props: ProductProps) => {
  const { productId,storeId } = await props.params;
 

  
  const product = await db.product.findUnique({
    where: {
      id: productId,
    },
    include: {
      images: true,
    }
  });

  const categories = await db.category.findMany({
    where: {
      storeId,
    },
  });
  const sizes = await db.size.findMany({
    where: {
      storeId,
    },
  });
  const colors = await db.color.findMany({
    where: {
      storeId,
    },
  });
  return (
    <div className="mt-8 flex-col">
      <div className="flex-1 space-y-4 p-8 pt-6 ">
        <ProductForm 
        categories={categories}
        sizes={sizes}
        colors={colors}
        initialData={product}
         />
      </div>
    </div>
  );
};
export default ProductPage;
