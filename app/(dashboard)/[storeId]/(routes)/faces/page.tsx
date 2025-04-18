import { db } from "@/lib/db";
import { format } from "date-fns";

import {  FaceColumn } from "./components/columns";
import { Client } from "./components/client";
const facePage = async ({
  params,
}: {
  params: Promise<{ storeId: string }>;
}) => {
  const { storeId } = await params;

  const faces = await db.face.findMany({
    where: {
      storeId: storeId,
    },
    orderBy:{
      createdAt: "desc",
    },
  });

  const formatted: FaceColumn[] = faces.map((item) => ({
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

export default facePage;
