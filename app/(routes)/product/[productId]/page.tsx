
import { getProduct, getProducts } from "@/actions/getdatafromAdmin/get-products";
import { getVarient } from "@/actions/getdatafromAdmin/get-varients";
import AddToCart from "@/components/store-ui/addTocart";
import ProductDescription from "@/components/store-ui/Description";
import { Gallery } from "@/components/store-ui/gallery";
import Info from "@/components/store-ui/info";
import IngredientList from "@/components/store-ui/ingredientlist";
import ProductList from "@/components/store-ui/product-list";
import VariantSelector from "@/components/store-ui/variantSelector";
import { Separator } from "@/components/ui/separator";

interface ProductPageProps {
  params: Promise<{ productId: string }>;
}
const ProductPage: React.FC<ProductPageProps> = async ({
  params
}) => {

  const { productId } = await params;

  const varient = await getVarient(productId);

  const product = await getProduct(varient.product.id);

  const suggCategProducts = await getProducts({
    categoryId: varient.product.categoryId,
  });
  const suggestedProducts = await getProducts({
    categoryId: varient.product.categoryId,
    isNewlaunch: true,
  });



  return (
    <div className="bg-white lg:py-24 py-10 px-4">
      <div className="lg:grid lg:grid-cols-2 lg:space-x-1    ">
        <Gallery images={varient.images} />
        <div className="mt-10  sm:mt-16 sm:px-0 lg: lg:mt-0 ">
          <h1 className="text-3xl font-sans lg:mt-6 md:mt-3 ">{varient.name}</h1>
          <div >
            <div className="flex flex-col  ">
              <Info data={varient} />
              <div className="flex flex-col lg:flex-row space-x-5 ">
                <VariantSelector product={product} varient={varient} />

                <AddToCart data={varient} />
              </div>
            </div>


          </div>

        </div>
      </div>
      <Separator className="my-10" />

      <ProductDescription description={product.description} heading="Product Description" />

      <Separator className="my-10" />
      <IngredientList data={varient}/>
      <Separator className="my-10" />


      <div className="px-1 sm:px-6 lg:px-8 py-10 space-y-10">
        {suggestedProducts.length > 0 && (
          <ProductList title="Suggested Products" items={suggestedProducts} />
        )}

        {suggCategProducts.length > 0 && (
          <ProductList title="Similar Products" items={suggCategProducts} />
        )}
      </div>
    </div>
  );
};

export default ProductPage;
