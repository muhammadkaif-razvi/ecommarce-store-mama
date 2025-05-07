"use client"
import {
  DropdownMenuGroup,
  DropdownMenuItem,
  DropdownMenuSeparator,
} from "../ui/dropdown-menu";
import { Map, Settings, ShieldHalf, User } from "lucide-react";
import { ExitIcon } from "@radix-ui/react-icons";
import Link from "next/link";
import { signOut } from "next-auth/react";
import { usePathname } from "next/navigation";


interface User { 
  role: string;
}

interface UserDropLinksProps {
  user: User 
}

const UserDropLinks: React.FC<UserDropLinksProps> = ({ user }) => {
  const pathname  = usePathname();

  return (
    <>
      {/* Navigation Links */}
      <DropdownMenuGroup>
        <DropdownMenuItem
          className={`p-2 text-gray-800 dark:text-slate-200 hover:bg-blue-100 dark:hover:bg-blue-900 rounded-md transition-colors ${
            pathname === "/account/settings" ? "bg-blue-100 dark:bg-blue-900/30" : ""
          }`}
          asChild
        >
          <Link href="/account/settings" className="w-full flex items-center">
            <Settings className="mr-2 h-4 w-4 text-blue-600 dark:text-blue-400" />
            Settings
          </Link>
        </DropdownMenuItem>

        <DropdownMenuItem
          className={`p-2 text-gray-800 dark:text-slate-200 hover:bg-blue-100 dark:hover:bg-blue-900 rounded-md transition-colors ${
            pathname === "/account/profile" ? "bg-blue-100 dark:bg-blue-900/30" : ""
          }`}
          asChild
        >
          <Link href="/account/profile" className="w-full flex items-center">
            <User className="mr-2 h-4 w-4 text-blue-600 dark:text-blue-400" />
            Profile
          </Link>
        </DropdownMenuItem>
        <DropdownMenuItem
          className={`p-2 text-gray-800 dark:text-slate-200 hover:bg-blue-100 dark:hover:bg-blue-900 rounded-md transition-colors ${
            pathname === "/account/order" ? "bg-blue-100 dark:bg-blue-900/30" : ""
          }`}
          asChild
        >
          <Link href="/account/order" className="w-full flex items-center">
            <Map className="mr-2 h-4 w-4 text-blue-600 dark:text-blue-400" />
            Track Order
          </Link>
        </DropdownMenuItem>

   
      </DropdownMenuGroup>
      <DropdownMenuSeparator className="bg-blue-200 dark:bg-blue-700" />

      {/* Logout Button */}
      <DropdownMenuItem
        className="cursor-pointer p-2 text-red-600 dark:text-red-400 hover:bg-red-100 dark:hover:bg-red-900/20 rounded-md transition-colors flex items-center"
        onClick={() => signOut()}
      >
        
        <ExitIcon className="mr-2 h-4 w-4" />
        Logout
      </DropdownMenuItem>
    </>
  );
};

export default UserDropLinks;
