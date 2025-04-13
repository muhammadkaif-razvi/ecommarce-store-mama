import { db } from "@/lib/db";
import { format } from "date-fns";

import {  FeaturesColumn } from "./components/columns";
import { FeatureClient } from "./components/client";
const featurePage = async ({
  params,
}: {
  params: Promise<{ storeId: string }>;
}) => {
  const { storeId } = await params;

  const features = await db.features.findMany({
    where: {
      storeId: storeId,
    },
    orderBy: {
      createdAt: "desc",
    },
  });

  const formattedfeatures: FeaturesColumn[] = features.map((item) => ({
    id: item.id,
    name: item.name,
    createdAt: format(item.createdAt, "MMMM do, yyyy"),
  }));

  return (
    <div className="flex-col">
      <div className="flex-1 space-x-4 p-8 pt-6">
        <FeatureClient data={formattedfeatures} />
      </div>
    </div>
  );
};

export default featurePage;
