"use client";
import {
  Category,
  Combos,
  Face,
  Fragrance,
  Hair,
  Ingredient,
  Makeup,
} from "@/types";
import { usePathname, useRouter, useSearchParams } from "next/navigation";
import queryString from "query-string";
import {
  Collapsible,
  CollapsibleContent,
  CollapsibleTrigger,
} from "@/components/ui/collapsible";
import { cn } from "@/lib/utils";
import Link from "next/link";
import { ChevronRight } from "lucide-react";
import Image from "next/image";

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
  url: string;
}

export const ResuableSideMenu: React.FC<MenubarProps> = ({
  data,
  subcategories = [],
  valueKey,
  url,
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
    <Collapsible>
      <CollapsibleTrigger className="border-b w-full flex justify-between flex-row py-2">
        <Link href={category[0]?.href}>
          <div className="flex flex-row space-x-2 items-center">
            <Image
              src={url}
              alt="Image"
              width={30} // Adjust size as needed
              height={10}
              className="text-blue-500  " // Centers the image
            />
            <div
              className={`${category[0]?.active ? "text-blue-500" : "text-gray-950"
                }`}
            >
              {category[0]?.label}
            </div>
          </div>
        </Link>
        <ChevronRight className="text-gray-600" />
      </CollapsibleTrigger>
      <CollapsibleContent>
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
                className={`text-xs px-2 cursor-pointer ${selectedValue === subcategory.id
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
      </CollapsibleContent>
    </Collapsible>
  );
};
