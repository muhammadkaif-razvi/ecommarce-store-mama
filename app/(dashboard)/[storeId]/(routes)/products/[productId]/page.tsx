import { db } from "@/lib/db";
import { ProductForm } from "./components/Product-form";

interface ProductProps {
  params: Promise<{ productId: string; storeId: string }>;
}
const ProductPage = async (props: ProductProps) => {
  const { productId, storeId } = await props.params;

  const product = await db.product.findUnique({
    where: {
      id: productId,
    },
    include: {
      images: true,
    },
  });

  const categories = await db.category.findMany({
    where: {
      storeId,
    },
  });
  const faces= await db.face.findMany({
    where: {
      storeId,
    },
  });
  const hairs = await db.hair.findMany({
    where: {
      storeId,
    },
  });
  const makeups = await db.makeup.findMany({
    where: {
      storeId,
    },
  });
  const  bodys = await db.body.findMany({
    where: {
      storeId,
    },
  });
  const combos = await db.combos.findMany({
    where: {
      storeId,
    },
  });
  const ingredients = await db.ingredient.findMany({
    where: {
      storeId,
    },
  });
  const fragrances = await db.fragrance.findMany({
    where: {
      storeId,
    },
  });
  const prices = await db.price.findMany({
    where: {
      storeId,
    },
  });

  return (
    <div className="mt-8 flex-col">
      <div className="flex-1 space-y-4 p-8 pt-6 ">
        <ProductForm
          categories={categories}
          initialData={product}
          faces={faces}
          hairs={hairs}
          makeups={makeups}
          bodys={bodys}
          combos={combos}
          ingredients={ingredients}
          fragrances={fragrances}
          prices={prices}
        />
      </div>
    </div>
  );
};
export default ProductPage;
