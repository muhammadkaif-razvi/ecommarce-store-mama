import { db } from "@/lib/db";
import { format } from "date-fns";

import {  Column } from "./components/columns";
import { Client } from "./components/client";
const EnginePage = async ({
  params,
}: {
  params: Promise<{ storeId: string }>;
}) => {
  const { storeId } = await params;

  const data = await db.engine.findMany({
    where: {
      storeId: storeId,
    },
    orderBy: {
      createdAt: "desc",
    },
  });

  const formatted: Column[] = data.map((item) => ({
    id: item.id,
    name: item.name,
    createdAt: format(item.createdAt, "MMMM do, yyyy"),
  }));

  return (
    <div className="flex-col">
      <div className="flex-1 space-x-4 p-8 pt-6">
        <Client data={formatted} />
      </div>
    </div>
  );
};

export default EnginePage;
