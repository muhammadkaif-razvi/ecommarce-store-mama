import { currentUser } from "@/lib/auth";

interface DashboardPageProps {
  params: { storeId: string };
}

const DashboardPage = async ({ params }: DashboardPageProps) => {
  const user = await currentUser();
  const { storeId } = await params;

  const store = user?.stores?.find((s: { id: string; name: string }) => s.id === storeId);

  return (
    <div className="mt-20 font-semibold">
      {store ? `Active Store: ${store.name}` : "Store Not Found"}
    </div>
  );
};

export default DashboardPage;
