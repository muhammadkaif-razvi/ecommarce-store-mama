"use client";

import { useState, useEffect } from "react";
import {
  Sheet,
  SheetTrigger,
  SheetContent,
  SheetHeader,
  SheetTitle,
  SheetDescription,
} from "@/components/ui/sheet";
import { Button } from "@/components/ui/button";
import { EllipsisVertical } from "lucide-react";
import Link from "next/link";
import { useParams, usePathname } from "next/navigation";
import { useTheme } from "next-themes"; // Import the useTheme hook
import { Monitor, Moon, Sun } from "lucide-react"; // Import theme-related icons

export function MobileNav() {
  const [open, setOpen] = useState(false);
  const pathname = usePathname();
  const params = useParams();
  const { theme, setTheme, systemTheme } = useTheme();
  const [mounted, setMounted] = useState(false);

  // Ensure correct theme detection after hydration
  useEffect(() => {
    setMounted(true);
  }, []);

  // Determine the current theme properly
  const currentTheme = theme === "system" ? systemTheme : theme;

  // Toggle the theme between light, dark, and system
  const toggleTheme = () => {
    if (theme === "light") {
      setTheme("dark");
    } else if (theme === "dark") {
      setTheme("system");
    } else {
      setTheme("light");
    }
  };

  // Define the routes dynamically based on storeId
  const routes = [
    {
      href: `/${params.storeId}`,
      label: "Overview",
      active: pathname === `/${params.storeId}`,
    },
    {
      href: `/${params.storeId}/billboards`,
      label: "Billboards",
      active: pathname === `/${params.storeId}/billboards`,
    },
    {
      href: `/${params.storeId}/categories`,
      label: "Categories",
      active: pathname === `/${params.storeId}/categories`,
    },
    {
      href: `/${params.storeId}/sizes`,
      label: "Sizes",
      active: pathname === `/${params.storeId}/sizes`,
    },
    {
      href: `/${params.storeId}/colors`,
      label: "Colors",
      active: pathname === `/${params.storeId}/colors`,
    },
    {
      href: `/${params.storeId}/products`,
      label: "products",
      active: pathname === `/${params.storeId}/products`,
    },
    {
      href: `/${params.storeId}/orders`,
      label: "Orders",
      active: pathname === `/${params.storeId}/orders`,
    },
    {
      href: `/${params.storeId}/settings`,
      label: "Settings",
      active: pathname === `/${params.storeId}/settings`,
    },
  ];

  if (!mounted) return null; // Prevent hydration mismatch

  return (
    <div className="lg:hidden flex">
      {/* Menu Toggle Button */}
      <Sheet open={open} onOpenChange={setOpen}>
        <SheetTrigger asChild>
          <Button
            variant="ghost"
            size="icon"
            className="rounded-md hover:bg-muted p-2"
          >
            <EllipsisVertical className="w-6 h-6 text-primary" />
          </Button>
        </SheetTrigger>

        {/* Sidebar Drawer */}
        <SheetContent
          side="left"
          className="p-6 bg-background rounded-lg shadow-lg max-w-[250px]"
        >
          {/* Heading */}
          <SheetHeader>
            <SheetTitle>Store Management</SheetTitle>
            <SheetDescription>
              Navigate through different sections of your store to manage your
              content and settings.
            </SheetDescription>
          </SheetHeader>
          {/* Theme Toggle Button */}
          <Button
            variant="outline"
            size="icon"
            onClick={toggleTheme}
            aria-label="Toggle theme"
            className="w-full mb-4 py-2 mt-1 border border-muted text-muted bg-black transition-all"
          >
            {currentTheme === "light" && <Sun className="h-5 w-5" />}
            {currentTheme === "dark" && <Moon className="h-5 w-5" />}
            {currentTheme === "system" && <Monitor className="h-5 w-5" />}
            <span className="sr-only">Toggle theme</span>
          </Button>

          {/* Navigation Links */}
          <nav className="flex flex-col space-y-1">
            {routes.map((route) => (
              <Link
                key={route.href}
                href={route.href}
                className={`block px-4 py-2 text-lg font-semibold rounded-lg transition-all hover:bg-muted hover:text-primary ${
                  route.active ? "text-primary bg-muted" : "text-foreground"
                }`}
                onClick={() => setOpen(false)} // Close menu on click
              >
                {route.label}
              </Link>
            ))}
          </nav>
        </SheetContent>
      </Sheet>
    </div>
  );
}
