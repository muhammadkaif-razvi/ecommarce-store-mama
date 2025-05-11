"use client";

import {
  MenubarMenu,
  MenubarTrigger,
  MenubarContent,
} from "@/components/ui/menubar";
import {
  Body,
  Category,
  Combos,
  Face,
  Fragrance,
  Hair,
  Ingredient,
  Makeup,
} from "@/types";
import { usePathname, useRouter, useSearchParams } from "next/navigation";
import Link from "next/link";
import { cn } from "@/lib/utils";
import { ExploreHoverNav } from "./explorehovernav";
import queryString from "query-string";

interface MenubarProps {
  data: Category[];
  subcategories?: (
    | Face
    | Hair
    | Makeup
    | Body
    | Combos
    | Ingredient
    | Fragrance
  )[];
  valueKey: string;
}

export const ReusableMenubar: React.FC<MenubarProps> = ({
  data,
  subcategories = [],
  valueKey, 
}) => {
  const pathname = usePathname();
  const category = data.map((route) => ({
    href: `/category/${route.id}`,
    label: route.name,
    active: pathname === `/category/${route.id}`,
  }));
  const searchParams = useSearchParams();
  const router = useRouter();

  const selectedValue = searchParams.get(valueKey);
   const onClick = (id: string) => {
    const query: { [key: string]: string | null } = {
      [valueKey]: id,
    };

    let baseUrl = window.location.origin + pathname;

    const isCategoryPage =
      category &&
      category.length > 0 &&
      pathname.startsWith(window.location.origin + category[0].href);
    if (category && category.length > 0 && !isCategoryPage) {
      baseUrl = window.location.origin + (category[0]?.href || pathname);
    }

    const url = queryString.stringifyUrl(
      {
        url: baseUrl,
        query,
      },
      {
        skipNull: true,
      }
    );

    router.push(url);
  };

  return (
      <MenubarMenu>
        <MenubarTrigger className={`font-mono ${category[0]?.active ? "text-blue-400" : "text-gray-900 "}`}>
          {category[0]?.label}
        </MenubarTrigger>
        <MenubarContent className="w-80 shadow-lg border-t-blue-400 rounded-none border-2">
          <div className="flex flex-row space-x-10 justify-center px-3">
            <ExploreHoverNav />
            <div className="w-0.5 bg-gray-200 h-uato" />
            <div className="w-full  flex flex-col pt-2 ">
              <Link
                href={category[0]?.href}
                className={cn(
                  "text-sm font-medium transition-colors  hover:text-black",
                  category[0].active ? "text-blue-400" : "text-neutral-500"
                )}
              >
                {category[0]?.label}
              </Link>
              <div className="flex flex-col space-y-2 py-2">
                {subcategories.map((subcategory) => (
                  <span
                    key={subcategory.id}
                    className={`text-xs px-2 cursor-pointer ${
                      selectedValue === subcategory.id
                        ? "text-blue-200"
                        : "text-gray-400 hover:text-blue-300"
                    } `}
                    onClick={() => onClick(subcategory.id)}
                  >
                    {subcategory.name}
                  </span>
                ))}
              </div>
            </div>
          </div>
        </MenubarContent>{" "}
    </MenubarMenu>
  );
};
