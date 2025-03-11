import { currentUser } from "@/lib/auth";
import { db } from "@/lib/db";
import { redirect } from "next/navigation";

interface DashboardPageProps {
  params: {
    storeId: string;
  };
}

async function DashboardPage({ params }: DashboardPageProps) {
  const storeId = (await params).storeId;
  const user = await currentUser();

  if (!user) {
    redirect("/login"); // Redirect if the user is not authenticated
  }

  const store = await db.store.findFirst({
    where: {
      id: storeId,
      userId: user.id,
    },
  });

  if (!store) {
    redirect("/stores-setup"); // Redirect if the store is not found
  }

  return (
    <div className="mt-20 font-semibold">
      {store ? `Active Store: ${store.name}` : "Store Not Found"}
    </div>
  );
}

export default DashboardPage;
