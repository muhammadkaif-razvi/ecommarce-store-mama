import getBillboard from "@/actions/getdatafromAdmin/get-billboard";
import { getProducts } from "@/actions/getdatafromAdmin/get-products";
import {
  getVarient,
  getVarients,
} from "@/actions/getdatafromAdmin/get-varients";

import Billboard from "@/components/store-ui/billboard";
import Container from "@/components/store-ui/container";
import NoResults from "@/components/store-ui/no-results";
import { ProductCard } from "@/components/store-ui/Product-card";

export const revalidate = 0;

export default async function AdminDashboard() {
  const billboard = await getBillboard("0310f146-01d2-4bbc-adcf-40e436e9230c");
  const products = await getProducts({
    isNewlaunch: true,
  });
  // const varient = await getVarient("fa98cd10-5b8c-4094-9baf-622048318353");
  // console.log(varient);

  return (
    <div className="bg-white">
      <Container>
        <Billboard data={billboard} />
        <div className="px-4 sm:px-6 lg:px-8 py-10">
          {products.length === 0 ? (
            <NoResults />
          ) : (
            <div>
              {products.map((item) => (
                <ProductCard key={item.id} data={item} />
              ))}
            </div>
          )}
        </div>
      </Container>
    </div>
  );
}
