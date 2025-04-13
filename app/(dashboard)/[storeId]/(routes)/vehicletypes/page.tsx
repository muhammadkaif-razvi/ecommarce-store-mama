import { db } from "@/lib/db";
import { format } from "date-fns";
import {  VehicleTypeClient } from "./components/client";
import {  vehicleTypeColumn } from "./components/columns";
const VehicleTypesPage = async ({
  params,
}: {
  params: Promise<{ storeId: string }>;
}) => {
  const { storeId } = await params;

  const sizes = await db.vehicleType.findMany({
    where: {
      storeId: storeId,
    },
    orderBy: {
      createdAt: "desc",
    },
  });

  const formattedvehicleTypes: vehicleTypeColumn[] = sizes.map((item) => ({
    id: item.id,
    name: item.name,
   
    createdAt: format(item.createdAt, "MMMM do, yyyy"),
  }));

  return (
    <div className="flex-col">
      <div className="flex-1 space-x-4 p-8 pt-6">
        <VehicleTypeClient data={formattedvehicleTypes} />
      </div>
    </div>
  );
};

export default VehicleTypesPage;
