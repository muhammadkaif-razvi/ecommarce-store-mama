"use client";

import { Button } from "@/components/ui/button";
import { usePathname } from "next/navigation";
import Link from "next/link";
import { useCurrentUser } from "@/hooks/use-current-user";
import { UserButton } from "@/components/auth/user/user-button";

export const Navbar = () => {
  const pathname = usePathname();
  const user = useCurrentUser();


  return (
    <nav className="bg-white shadow-md rounded-xl flex items-center justify-between w-full max-w-5xl mx-auto px-6 py-4 mt-6">
      {/* Brand Logo */}
      <Link href="/" className="text-2xl font-bold text-gray-900">
        MyApp
      </Link>

      {/* Desktop Navigation Links (Hidden on Small Screens) */}
      <div className="hidden md:flex gap-x-4">
        <NavLink href="/settings" active={pathname === "/settings"}>
          Settings
        </NavLink>
        <NavLink href="/profile" active={pathname === "/profile"}>
          Profile
        </NavLink>
        {user?.role === "ADMIN" && (
          <NavLink href="/admin" active={pathname === "/admin"}>
            Admin
          </NavLink>
        )}
      </div>

      {/* User Button (Includes Nav Links in Dropdown on Small Screens) */}
      
  <UserButton  />
   </nav>
  );
};

// Reusable NavLink Component
const NavLink = ({ href, active, children }: { href: string; active: boolean; children: React.ReactNode }) => (
  <Button
    asChild
    className={`px-4 py-2 rounded-lg transition-all ${
      active ? "bg-blue-600 text-white" : "bg-gray-100 text-gray-800 hover:bg-gray-200"
    }`}
  >
    <Link href={href}>{children}</Link>
  </Button>
);
