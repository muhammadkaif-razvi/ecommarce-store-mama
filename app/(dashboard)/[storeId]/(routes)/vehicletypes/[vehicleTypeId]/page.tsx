import { db } from "@/lib/db";
import {  VehicleTypeForm } from "./components/vehicle-type-form";

interface BillboardProps {
  params: Promise<{ vehicleTypeId: string }>;
}
const VehicleTypePage = async (props: BillboardProps) => {
  const { vehicleTypeId } = await props.params;
  const vehicleType = await db.vehicleType.findUnique({
    where: {
      id: vehicleTypeId,
    },
  });
  return (
    <div className="mt-8 flex-col">
      <div className="flex-1 space-y-4 p-8 pt-6 ">
        <VehicleTypeForm initialData={vehicleType} />
      </div>
    </div>
  );
};
export default VehicleTypePage;
