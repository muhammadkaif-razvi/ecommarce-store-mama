"use client";

import { Button } from "@/components/ui/button";
import Link from "next/link";
import { usePathname } from "next/navigation";

export const Sidebar = () => {
  return (
    <aside className="w-64 bg-white border-r border-gray-200 shadow-md min-h-screen p-6">
      <h2 className="text-2xl font-semibold text-gray-800">Dashboard</h2>
      <nav className="mt-6 space-y-3">
        <SidebarLink href="/profile" label="Profile" />
        <SidebarLink href="/settings" label="Settings" />
        <SidebarLink href="/admin" label="Admin Panel" />
      </nav>
    </aside>
  );
};

const SidebarLink = ({ href, label }: { href: string; label: string }) => {
  const pathname = usePathname(); // ✅ Get current route
  const isActive = pathname === href; // ✅ Check if current page

  return (
    <Button variant={isActive ? "outline" : "default"} className="w-full justify-start">
      <Link href={href} className="w-full text-left">
        {label}
      </Link>
    </Button>
  );
};
