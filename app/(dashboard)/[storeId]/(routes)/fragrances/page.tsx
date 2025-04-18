import { db } from "@/lib/db";
import { format } from "date-fns";
import { Client } from "./components/client";
import { fragranceColumn } from "./components/columns";
const fragrancePage = async ({
  params,
}: {
  params: Promise<{ storeId: string }>;
}) => {
  const { storeId } = await params;

  const sizes = await db.fragrance.findMany({
    where: {
      storeId: storeId,
    },
    orderBy: {
      createdAt: "desc",
    },
  });

  const formattedfragrance: fragranceColumn[] = sizes.map((item) => ({
    id: item.id,
    name: item.name,
    createdAt: format(item.createdAt, "MMMM do, yyyy"),
  }));

  return (
    <div className="flex-col">
      <div className="flex-1 space-x-4 p-8 pt-6">
        <Client data={formattedfragrance} />
      </div>
    </div>
  );
};

export default fragrancePage;
