"use client";

import Link from "next/link";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuTrigger,
  DropdownMenuGroup,
  DropdownMenuItem,
} from "@radix-ui/react-dropdown-menu";
import { Avatar, AvatarFallback, AvatarImage } from "@radix-ui/react-avatar";
import { FaUser } from "react-icons/fa";
import { ExitIcon } from "@radix-ui/react-icons";
import { useCurrentUser } from "@/hooks/use-current-user";
import { signOut } from "next-auth/react";

export const UserButton = () => {
  const user = useCurrentUser();

  return (
    <DropdownMenu>
      <DropdownMenuTrigger asChild>
        <button className="outline-none focus:ring-2 focus:ring-slate-400 rounded-full">
          <Avatar className="w-8 h-8">
            <AvatarImage
              src={user?.image || ""}
              className="w-8 h-8 rounded-full"
              alt="User Profile"
            />
            <AvatarFallback className="flex items-center justify-center w-8 h-8 bg-gray-300 text-gray-800 font-semibold">
              {user?.name ? user.name.charAt(0).toUpperCase() : <FaUser />}
            </AvatarFallback>
          </Avatar>
        </button>
      </DropdownMenuTrigger>

      <DropdownMenuContent
        className="w-40 p-2 bg-white shadow-lg rounded-md border border-gray-200"
        align="end"
      >
        <DropdownMenuGroup>
          <Link href="/settings" passHref>
            <DropdownMenuItem className="px-2 py-2 cursor-pointer hover:bg-gray-100 rounded-md">
              Settings
            </DropdownMenuItem>
          </Link>
          <DropdownMenuItem
            onClick={() => signOut()}
            className="px-2 py-2 flex items-center gap-2 text-red-600 cursor-pointer hover:bg-red-50 rounded-md"
          >
            <ExitIcon />
            Logout
          </DropdownMenuItem>
        </DropdownMenuGroup>
      </DropdownMenuContent>
    </DropdownMenu>
  );
};
