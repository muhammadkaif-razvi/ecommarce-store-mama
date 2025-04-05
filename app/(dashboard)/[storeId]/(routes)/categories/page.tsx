import { db } from "@/lib/db";
import { format } from "date-fns";
import { CategoryClient } from "./components/client";
import { CategoryColumn } from "./components/columns";


const CategoriesPage = async ({
  params,
}: {
  params: Promise<{ storeId: string }>;
}) => {
  const { storeId } = await params;

  const categories = await db.category.findMany({
    where: {
      storeId: storeId,
    },
    include: {
      billboard: true,
    },
    orderBy: {
      createdAt: "desc",
    },
  });

  const formattedCaategories: CategoryColumn[] = categories.map((item) => ({
    id: item.id,
    name: item.name,
    billboardLabel: item.billboard.label,
    createdAt: format(item.createdAt, "MMMM do, yyyy"),
  }));

  return (
    <div className="flex-col">
      <div className="flex-1 space-x-4 p-8 pt-6">
        <CategoryClient data={formattedCaategories} />
      </div>
    </div>
  );
};

export default CategoriesPage;
