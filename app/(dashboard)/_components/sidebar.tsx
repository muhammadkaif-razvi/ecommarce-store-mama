"use client";

import { Button } from "@/components/ui/button";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { useCurrentUser } from "@/hooks/use-current-user";
import { UserButton } from "@/components/auth/user/user-button";

export const Sidebar = () => {
  const user = useCurrentUser(); // ✅ Get current user
  return (
    <aside className="w-64 bg-white border-r border-gray-200 shadow-md p-6">
 <UserButton/>
      <nav className="mt-6 space-y-3">
      <SidebarLink href="/settings" label="settings" />

        <SidebarLink href="/profile" label="Profile" />
        {user?.role === "ADMIN" && <SidebarLink href="/admin" label="Admin Panel" />}
      </nav>
    </aside>
  );
};

const SidebarLink = ({ href, label }: { href: string; label: string }) => {

  const pathname = usePathname();
  const isActive = pathname === href;


  return (
    <>
      <Button 
      variant={isActive ? "default" : "outline"} 
      className="w-full justify-start">
        <Link href={href} className="w-full text-left">
          {label}
        </Link>
      </Button>
   
    </>
  );
};
