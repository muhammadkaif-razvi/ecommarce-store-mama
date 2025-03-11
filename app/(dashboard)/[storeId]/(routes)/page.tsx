import { currentUser } from "@/lib/auth";
import { db } from "@/lib/db";
import { redirect } from "next/navigation";

interface DashboardPageProps {
  params: { storeId: string };
}

const DashboardPage: React.FC<DashboardPageProps> = async ({
  params,
}: DashboardPageProps) => {
  const { storeId } = await params;

  const user = await currentUser();
  const store = await db.store.findFirst({
    where: {
      id: storeId,
      userId: user.id,
    },
  });

  if (!store) {
    redirect("/stores-setup");
  }
  return (
    <div className="mt-20 font-semibold">
      {store ? `Active Store: ${store.name}` : "Store Not Found"}
    </div>
  );
};

export default DashboardPage;
