"use client";

import { useCurrentUser } from "@/hooks/use-current-user";
import { signOut } from "next-auth/react";
import { Avatar, AvatarFallback, AvatarImage } from "@radix-ui/react-avatar";
import { FaUser } from "react-icons/fa";
import { ExitIcon } from "@radix-ui/react-icons";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuTrigger,
  DropdownMenuItem,
} from "@radix-ui/react-dropdown-menu";
import Link from "next/link";
import { usePathname } from "next/navigation";

export const UserButton = () => {
  const user = useCurrentUser();
  const pathname = usePathname();

  return (
    <DropdownMenu>
      <DropdownMenuTrigger asChild>
        <button className="relative flex items-center justify-center w-10 h-10 rounded-full bg-gray-100 hover:bg-gray-200 transition">
          <Avatar className="w-9 h-9">
            <AvatarImage src={user?.image || ""} className="rounded-full" />
            <AvatarFallback className="bg-gray-700 rounded-full flex items-center justify-center w-full h-full text-white text-sm">
              <FaUser className="text-white text-lg" />
            </AvatarFallback>
          </Avatar>
        </button>
      </DropdownMenuTrigger>

      <DropdownMenuContent className="bg-white shadow-lg rounded-lg p-2 w-48">
        {/* Navigation Links (Only Visible on Small Screens) */}
        <DropdownMenuItem
          className={`p-2 text-gray-800 hover:bg-gray-100 rounded-md transition ${
            pathname === " /profile" ? "bg-gray-200" : ""
          }`}
        >
          <Link href=" /settings">Settings</Link>
        </DropdownMenuItem>
        <DropdownMenuItem
          className={`p-2 text-gray-800 hover:bg-gray-100 rounded-md transition ${
            pathname === "/profile" ? "bg-gray-200" : ""
          }`}
        >
          <Link href="/profile">Profile</Link>
        </DropdownMenuItem>
        {user?.role === "ADMIN" && (
          <DropdownMenuItem
            className={`p-2 text-gray-800 hover:bg-gray-100 rounded-md transition ${
              pathname === "/admin" ? "bg-gray-200" : ""
            }`}
          >
            <Link href="/admin">Admin</Link>
          </DropdownMenuItem>
        )}
        <div className="border-t my-2"></div> {/* Divider */}
        {/* Logout Button */}
        <DropdownMenuItem
          className="cursor-pointer p-2 text-red-600 hover:bg-gray-100 rounded-md transition flex items-center"
          onClick={() => signOut()}
        >
          <ExitIcon className="mr-2 h-4 w-4" /> Logout
        </DropdownMenuItem>
      </DropdownMenuContent>
    </DropdownMenu>
  );
};
