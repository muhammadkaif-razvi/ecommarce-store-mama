import { db } from "@/lib/db";
import {  FuelTypeForm } from "./components/fuel-type-form";

interface BillboardProps {
  params: Promise<{ fuelTypeId: string }>;
}
const FuelTypePage = async (props: BillboardProps) => {
  const { fuelTypeId } = await props.params;
  const size = await db.fuelType.findUnique({
    where: {
      id: fuelTypeId,
    },
  });
  return (
    <div className="mt-8 flex-col">
      <div className="flex-1 space-y-4 p-8 pt-6 ">
        <FuelTypeForm initialData={size} />
      </div>
    </div>
  );
};
export default FuelTypePage;
