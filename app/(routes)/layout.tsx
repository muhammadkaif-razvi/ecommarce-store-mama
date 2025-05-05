import DashHeader from "@/components/nav/dasheader";

export default async function SetupLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <>
      <DashHeader />
      <div className="flex flex-1 flex-col gap-4 px-2 py-3 md:px-4 md:py-4 ">
        {children}{" "}
      </div>
    </>
  );
}
