import { db } from "@/lib/db";
import { format } from "date-fns";
import {  TransmissionClient } from "./components/client";
import {  transmissionColumn } from "./components/columns";
const TransmissionPage = async ({
  params,
}: {
  params: Promise<{ storeId: string }>;
}) => {
  const { storeId } = await params;

  const sizes = await db.transmission.findMany({
    where: {
      storeId: storeId,
    },
    orderBy: {
      createdAt: "desc",
    },
  });

  const formattedtransmission: transmissionColumn[] = sizes.map((item) => ({
    id: item.id,
    name: item.name,
    createdAt: format(item.createdAt, "MMMM do, yyyy"),
  }));

  return (
    <div className="flex-col">
      <div className="flex-1 space-x-4 p-8 pt-6">
        <TransmissionClient data={formattedtransmission} />
      </div>
    </div>
  );
};

export default TransmissionPage;
