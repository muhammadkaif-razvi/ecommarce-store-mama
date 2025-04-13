"use client";

import { useCurrentUser } from "@/hooks/use-current-user";
import { signOut } from "next-auth/react";

import { ExitIcon } from "@radix-ui/react-icons";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuTrigger,
  DropdownMenuItem,
} from "@radix-ui/react-dropdown-menu";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { Settings, ShieldHalf, User } from "lucide-react";
import { useEffect, useState } from "react";
import {
  DropdownMenuGroup,
  DropdownMenuLabel,
  DropdownMenuSeparator,
} from "@/components/ui/dropdown-menu";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";

export const UserButton = () => {
  const user = useCurrentUser();
  const pathname = usePathname();
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
  }, []);

  if (!mounted) return null;

  return (
    <DropdownMenu>
      <DropdownMenuTrigger asChild>
        <button className="relative flex items-center justify-center h-8 w-8 lg:h-9 lg:w-9 rounded-full bg-purple-100 hover:bg-purple-200 dark:bg-slate-800 dark:hover:bg-slate-700 transition-all border border-purple-200/20 dark:border-slate-700/30">
          <Avatar className="h-8 w-8 lg:h-9 lg:w-9">
            <AvatarImage src={user?.image || ""} />
            <AvatarFallback className="bg-purple-600 hover:bg-purple-700 text-white dark:bg-purple-800 dark:text-purple-100 rounded-md flex items-center justify-center w-full h-full text-sm font-medium transition-colors">
              {user?.name
                ?.split(" ")[0] // Take the first word only
                .charAt(0) // Take the first letter
                .toUpperCase()}{" "}
              {/* Capitalize the first letter */}
            </AvatarFallback>
          </Avatar>
        </button>
      </DropdownMenuTrigger>
      <DropdownMenuContent
        align="end"
        className="bg-white dark:bg-slate-800 shadow-lg rounded-lg p-2  border border-gray-200 dark:border-slate-700 transition-colors"
      >
        <DropdownMenuLabel className="p-0 font-normal">
          <div className="flex items-center gap-2 px-1 py-1.5 text-left text-sm">
            <Avatar className="h-8 w-8 lg:h-9 lg:w-9">
              <AvatarImage src={user?.image || ""} />
              <AvatarFallback className="bg-purple-600 hover:bg-purple-700 text-white dark:bg-purple-800 dark:text-purple-100 rounded-full flex items-center justify-center w-full h-full text-sm font-medium transition-colors">
                {user?.name
                  ?.split(" ")[0] // Take the first word only
                  .charAt(0) // Take the first letter
                  .toUpperCase()}{" "}
                {/* Capitalize the first letter */}
              </AvatarFallback>
            </Avatar>
            <div className="grid flex-1 text-left text-sm leading-tight">
              <span className="truncate font-semibold">{user.name}</span>
              <span className="truncate text-xs">{user.email}</span>
            </div>
          </div>
        </DropdownMenuLabel>
        <DropdownMenuSeparator />
        {/* Navigation Links */}
        <DropdownMenuGroup>
          <DropdownMenuItem
            className={`p-2 text-gray-800 dark:text-slate-200 hover:bg-purple-50 dark:hover:bg-slate-700 rounded-md transition-colors ${
              pathname === "/settings"
                ? "bg-purple-100 dark:bg-purple-900/30"
                : ""
            }`}
          >
            <Link href="/settings" className="w-full flex items-center">
              <Settings className="mr-2 h-4 w-4 text-purple-600 dark:text-purple-400" />
              Settings
            </Link>
          </DropdownMenuItem>

          <DropdownMenuItem
            className={`p-2 text-gray-800 dark:text-slate-200 hover:bg-purple-50 dark:hover:bg-slate-700 rounded-md transition-colors ${
              pathname === "/profile"
                ? "bg-purple-100 dark:bg-purple-900/30"
                : ""
            }`}
          >
            <Link href="/profile" className="w-full flex items-center">
              <User className="mr-2 h-4 w-4 text-purple-600 dark:text-purple-400" />
              Profile
            </Link>
          </DropdownMenuItem>

          {user?.role === "ADMIN" && (
            <DropdownMenuItem
              className={`p-2 text-gray-800 dark:text-slate-200 hover:bg-purple-50 dark:hover:bg-slate-700 rounded-md transition-colors ${
                pathname === "/admin"
                  ? "bg-purple-100 dark:bg-purple-900/30"
                  : ""
              }`}
            >
              <Link href="/admin" className="w-full flex items-center">
                <ShieldHalf className="mr-2 h-4 w-4 text-purple-600 dark:text-purple-400" />
                Admin
              </Link>
            </DropdownMenuItem>
          )}
        </DropdownMenuGroup>
        <DropdownMenuSeparator />

        {/* Logout Button */}
        <DropdownMenuItem
          className="cursor-pointer p-2 text-red-600 dark:text-red-400 hover:bg-red-50 dark:hover:bg-red-900/20 rounded-md transition-colors flex items-center"
          onClick={() => signOut()}
        >
          <ExitIcon className="mr-2 h-4 w-4" />
          Logout
        </DropdownMenuItem>
      </DropdownMenuContent>
    </DropdownMenu>
  );
};
