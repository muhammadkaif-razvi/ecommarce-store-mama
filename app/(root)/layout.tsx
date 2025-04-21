import { AppSidebar } from "@/components/app-sidebar";
import DashHeader from "@/components/dasheader";

import { SidebarInset, SidebarProvider } from "@/components/ui/sidebar";
import { currentUser } from "@/lib/auth";
import { redirect } from "next/navigation";

export default async function SetupLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const user = await currentUser();

  if (!user?.id) {
    redirect("/login");
  }

  return (
    <>
      <SidebarProvider>
        {" "}
        <AppSidebar />
        <SidebarInset>
          {" "}
          <DashHeader />
          <div className="flex flex-1 flex-col gap-4 px-2 py-3 md:px-4 md:py-4">
            {children}{" "}
          </div>
        </SidebarInset>
      </SidebarProvider>
    </>
  );
}
