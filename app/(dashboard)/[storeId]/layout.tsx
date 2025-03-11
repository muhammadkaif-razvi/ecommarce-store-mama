import { currentUser } from "@/lib/auth";
import { db } from "@/lib/db";
import { redirect } from "next/navigation";



export default async function DashboardLayout({
  children,
  params,
}: {
  children: React.ReactNode;
  params: Promise<{ storeId: string}>
}) {
  const user = await currentUser();
  const { storeId } = await params;

  if (!user) {
    redirect("/login");
  }

  

  const store = await db.store.findFirst({
    where: {
      id: storeId, 
      userId: user.id, 
    },
  });

  if (!store) {
    redirect("/");
  }

  return (
    <>
      {children}
    </>
  );
}