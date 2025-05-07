import { AccountSlelector } from "@/components/account/account-side-top-slelector";

export default function AccountLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <div className="flex flex-col md:flex-row space-y-4 md:space-y-0 md:space-x-10 md:mt-28 mt-16 lg:px-36">
    <div className="w-full md:w-64 h-full md:h-[500px] md:pt-16"> {/* Matches selector dimensions */}
      <AccountSlelector />
    </div>
    <div className="flex-1">
      {children}
    </div>
  </div>
  );
}
