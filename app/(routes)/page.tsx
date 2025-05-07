import getBillboard from "@/actions/getdatafromAdmin/get-billboard";
import { getProducts } from "@/actions/getdatafromAdmin/get-products";
import Billboard from "@/components/store-ui/billboard";
import Container from "@/components/store-ui/container";
import NoResults from "@/components/store-ui/no-results";
import ProductList from "@/components/store-ui/product-list";

export const revalidate = 0;

export default async function AdminDashboard() {
  const billboard = await getBillboard("0310f146-01d2-4bbc-adcf-40e436e9230c");

  const newLaunchProducts = await getProducts({ isNewlaunch: true });
  const Bestseller = await getProducts({ isBestseller: true });
  const featured = await getProducts({ isFeatured: true });

  const hairproducts = await getProducts({
    categoryId: "9f4847b8-3c82-496a-a633-16610dcdf36d",
  });
  const faceProducts = await getProducts({
    categoryId: "c2c78130-bb22-46d3-bfd7-96da562ea205",
  });
  const bodyProducts = await getProducts({
    categoryId: "b47a0497-dabe-4337-be9b-0501688d7ce8",
  });
  const combosProducts = await getProducts({
    categoryId: "74283f26-b8c6-4bb3-8975-f89d04ee3829",
  });
  const makeupProducts = await getProducts({
    categoryId: "7af8b905-a69d-4b14-941b-02493dc569c7",
  });
  const fragranceProducts = await getProducts({
    categoryId: "053c6557-fc73-4789-b66a-52eed16ea202",
  });

  const allEmpty =
    Bestseller.length === 0 &&
    featured.length === 0 &&
    newLaunchProducts.length === 0 &&
    faceProducts.length === 0 &&
    hairproducts.length === 0 &&
    bodyProducts.length === 0 &&
    combosProducts.length === 0 &&
    makeupProducts.length === 0 &&
    fragranceProducts.length === 0;

  return (
    <div className="bg-white">
      <Container>
        <Billboard data={billboard} />
        <div className="px-1 sm:px-6 lg:px-8 py-10 space-y-10">
          {allEmpty ? (
            <NoResults />
          ) : (
            <>
              {Bestseller.length > 0 && (
                <ProductList title="Best Sellers" items={Bestseller} />
              )}
              {featured.length > 0 && (
                <ProductList title="Trending" items={featured} />
              )}
              {newLaunchProducts.length > 0 && (
                <ProductList title="New Launch" items={newLaunchProducts} />
              )}
              {faceProducts.length > 0 && (
                <ProductList title="Face" items={faceProducts} />
              )}
              {hairproducts.length > 0 && (
                <ProductList title="Hair" items={hairproducts} />
              )}
              {bodyProducts.length > 0 && (
                <ProductList title="Body" items={bodyProducts} />
              )}
              {combosProducts.length > 0 && (
                <ProductList title="Combos" items={combosProducts} />
              )}
              {makeupProducts.length > 0 && (
                <ProductList title="Makeup" items={makeupProducts} />
              )}
              {fragranceProducts.length > 0 && (
                <ProductList title="Fragrance" items={fragranceProducts} />
              )}
            </>
          )}
        </div>
      </Container>
    </div>
  );
}
