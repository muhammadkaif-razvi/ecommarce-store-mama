import { db } from "@/lib/db";
import {   PriceForm, } from "./components/form";

interface Props {
  params: Promise<{ priceId: string }>;
}
const pricesPage = async (props: Props) => {
  const { priceId } = await props.params;
  const prices = await db.price.findUnique({
    where: {
      id: priceId,
    },
  });
  return (
    <div className="mt-8 flex-col">
      <div className="flex-1 space-y-4 p-8 pt-6 ">
        <PriceForm initialData={prices} />
      </div>
    </div>
  );
};
export default pricesPage;
