import { currentUser } from "@/lib/auth";
import { db } from "@/lib/db";
import { redirect } from "next/navigation";

interface DashboardPageProps {
  params: { storeId: string }; // Ensure params is an object, not a Promise
}

const DashboardPage = async ({ params }: { params: { storeId: string } }) => {
  const { storeId } = params; // ✅ No await needed here

  const user = await currentUser();
  if (!user) {
    redirect("/login"); // Redirect if user is not logged in
  }

  const store = await db.store.findFirst({
    where: {
      id: storeId,
      userId: user?.id, // Ensure user.id exists
    },
  });

  if (!store) {
    redirect("/stores-setup");
  }

  return (
    <div className="mt-20 font-semibold">
      Active Store: {store.name}
    </div>
  );
};

export default DashboardPage;
