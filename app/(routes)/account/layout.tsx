import { AccountSlelector } from "@/components/account/account-side-top-slelector";

export default async function AccountLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <>
    <AccountSlelector />
      <div>
        {children}{" "}
      </div>
    </>
  );
}
