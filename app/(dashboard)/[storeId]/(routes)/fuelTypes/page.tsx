import { db } from "@/lib/db";
import { format } from "date-fns";
import {  fuelTypeColumn } from "./components/columns";
import { FuelTypeClient } from "./components/client";

const fuelTypesPage = async ({
  params,
}: {
  params: Promise<{ storeId: string }>;
}) => {
  const { storeId } = await params;

  const fuelTypes = await db.fuelType.findMany({
    where: {
      storeId: storeId,
    },
    orderBy: {
      createdAt: "desc",
    },
  });

  const formattedfuelType: fuelTypeColumn[] = fuelTypes.map((item) => ({
    id: item.id,
    name: item.name,
    createdAt: format(item.createdAt, "MMMM do, yyyy"),
  }));

  return (
    <div className="flex-col">
      <div className="flex-1 space-x-4 p-8 pt-6">
        <FuelTypeClient data={formattedfuelType} />
      </div>
    </div>
  );
};

export default fuelTypesPage;
