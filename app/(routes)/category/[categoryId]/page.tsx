
// import getBodys from "@/actions/getdatafromAdmin/get-bodys";
import getCategory from "@/actions/getdatafromAdmin/get-category";
// import getCombos from "@/actions/getdatafromAdmin/get-combos";
// import getFaces from "@/actions/getdatafromAdmin/get-faces";
// import getFragrances from "@/actions/getdatafromAdmin/get-fragrance";
// import getHairs from "@/actions/getdatafromAdmin/get-hairs";
// import {getIngredients} from "@/actions/getdatafromAdmin/get-Ingredient";
// import getMakeups from "@/actions/getdatafromAdmin/get-makeups";
// import getPrices from "@/actions/getdatafromAdmin/get-prices";
import {
  getProducts,
} from "@/actions/getdatafromAdmin/get-products";

import Billboard from "@/components/store-ui/billboard";
import Container from "@/components/store-ui/container";

import NoResults from "@/components/store-ui/no-results";
import { ProductCard } from "@/components/store-ui/Product-card";

 export const revalidate = 0;
interface CategoryPageProps  {
  params: Promise< {categoryId: string }>;
    searchParams: Promise<{
    faceId: string;
    hairId: string;
    makeupId: string;
    bodyId: string;
    combosId: string;
    ingredientId: string;
    fragranceId: string;
    priceId: string;
  }>;
}
const CategoryPage: React.FC<CategoryPageProps> = async ({
  params,
  searchParams
}) => {
  const { categoryId } = await params;
const {
  faceId,
  hairId,
  makeupId,
  bodyId,
  combosId,
  ingredientId,
  fragranceId,
  priceId,
} = await searchParams;


  const products = await getProducts({
    categoryId: categoryId,
    faceId: faceId,
    hairId: hairId,
    makeupId: makeupId,
    bodyId: bodyId,
    combosId: combosId,
    ingredientId: ingredientId,
    fragranceId: fragranceId,
    priceId: priceId,
  });

  const category = await getCategory(categoryId);
  // const faces = getFaces;
  // const hairs = getHairs;
  // const makeup = getMakeups;
  // const bodys = getBodys;
  // const combos = getCombos;
  // const ingredients = getIngredients;
  // const fragrance = getFragrances;
  // const price = getPrices;



  return (
    <div className="bg-white">
      <Container>
        <Billboard data={category.billboard} />
        <div className="px-4 sm:px-6 lg:px-8 py-10">
          {products.length === 0 ? (
            <NoResults />
          ) : (
            <div className="container mx-auto my-10 grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-3 gap-4">
              {products.map((item) => (
                <ProductCard key={item.id} data={item} />
              ))}
            </div>
          )}
        </div>
      </Container>
    </div>
  );
};

export default CategoryPage;

