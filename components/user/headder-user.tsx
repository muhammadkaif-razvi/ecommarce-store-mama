"use client";
import { useCurrentUser } from "@/hooks/use-current-user";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "../ui/dropdown-menu";
import UserAvtar from "./useravtar";
import UserDropLinks from "./userdrpodown";

const HeadderUser = () => {



  const user = useCurrentUser();
  return (
    <>
      <DropdownMenu>
        <DropdownMenuTrigger asChild>
          <div className={`bg-white bg-background  dark:bg-slate-900 w-full`}>
            <div className="flex flex-row space-x-2 items-center px-2">
              {/* usr avtar */}
              <UserAvtar name={user?.name} image={user?.image} 
              />
              <div className="lg:block hidden">
                <div className=" flex-1 grid text-left text-sm min-w-0 text-muted-foreground dark:text-slate-400">
                  <span className="truncate font-semibold dark:text-slate-100">
                    {user?.name}
                  </span>
                  <span className="truncate text-xs">{user?.email}</span>
                </div>
              </div>
            </div>
          </div>
        </DropdownMenuTrigger>
        <DropdownMenuContent
          align="end"
          className="bg-white dark:bg-slate-800 shadow-lg rounded-lg p-2 border border-gray-200 dark:border-slate-700 transition-colors "
        >
          <DropdownMenuLabel className="p-0 font-normal">
            <div className="flex items-center gap-2 px-2 py-1.5 text-left text-sm">
              {/* usr avtar */}
              <UserAvtar name={user?.name} image={user?.image} />
              <div className="grid flex-1 text-left text-sm leading-tight">
                <span className="truncate font-semibold dark:text-slate-100">
                  {user?.name}
                </span>
                <span className="truncate text-xs text-muted-foreground dark:text-slate-400">
                  {user?.email}
                </span>
              </div>
            </div>
          </DropdownMenuLabel>
          <DropdownMenuSeparator className="bg-blue-200 dark:bg-blue-700" />
          <UserDropLinks user={user} />
        </DropdownMenuContent>
      </DropdownMenu>
    </>
  );
};

export default HeadderUser;
