import { db } from "@/lib/db";
import { BillboardClient } from "./components/client";
const BillboardsPage = async ({
  params,
}: {
  params: Promise<{ storeId: string }>;
}) => {
  const { storeId } = await params;

  const billboards = await db.billboard.findMany({
    where: {
      storeId: storeId,
    },
    orderBy: {
      createdAt: "desc",
    },
  });
  return (
    <div className="flex-col">
      <div className="flex-1 space-x-4 p-8 pt-6">
        <BillboardClient data={billboards} />
      </div>
    </div>
  );
};

export default BillboardsPage;
