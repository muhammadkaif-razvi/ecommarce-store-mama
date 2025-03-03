"use client";

import { signOut, useSession } from "next-auth/react";
import { UserButton } from "./auth/user/user-button";
import Link from "next/link";
import { Button } from "@/components/ui/button";
import { usePathname, useRouter } from "next/navigation";
import { useRef, useEffect, useState } from "react";
import { ModeToggle } from "@/components/togglebtn";

export const Navbar = () => {
  const navRef = useRef<HTMLElement>(null);
  const { data: session } = useSession();
  const pathname = usePathname();
  const router = useRouter(); // ✅ Initialize router
  const [isScrolled, setIsScrolled] = useState(false);
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 50);
    };
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  useEffect(() => {
    if (navRef.current) {
      const height = navRef.current.offsetHeight;
      document.documentElement.style.setProperty("--navbar-height", `${height}px`);
    }
  }, []);

  useEffect(() => {
    setMounted(true);
  }, []);

  // ✅ Fixed handleNavigation function
  const handleNavigation = async (href: string) => {
    if (session) {
      await signOut({ redirect: false }); // Sign out user
    }
    router.push(href); // ✅ Corrected navigation
  };

  if (!mounted) return null;

  return (
    <nav
      ref={navRef}
      className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 shadow-sm ${
        isScrolled
          ? "backdrop-blur-sm border"
          : "bg-gradient-to-b from-purple-50 to-white dark:from-slate-800 dark:to-slate-950"
      }`}
    >
      <div className="container mx-auto flex items-center justify-between p-4">
        {/* Logo on the left */}
        <Link href="/" className="text-xl font-bold text-[#2d2d2d] dark:text-white/90">
          My SaaS App
        </Link>

        {/* Right side: ModeToggle, UserButton, or Login/Register */}
        <div className="flex items-center space-x-4">
          {/* Theme Toggle Button */}
          <ModeToggle />

          {/* UserButton or Login/Register */}
          {session?.user?.phoneNumberVerified ? (
            <UserButton />
          ) : (
            <>
              {/* ✅ Fixed Buttons: No need for <Link> */}
              <Button
                variant={pathname === "/login" ? "default" : "outline"}
                className={
                  pathname === "/login"
                    ? "bg-purple-600 hover:bg-purple-700 text-white backdrop-blur"
                    : "text-purple-600 dark:hover:bg-slate-800 backdrop-blur"
                }
                onClick={() => handleNavigation("/login")}
              >
                Login
              </Button>

              <Button
                variant={pathname === "/register" ? "default" : "outline"}
                className={
                  pathname === "/register"
                    ? "bg-purple-600 hover:bg-purple-700 text-white backdrop-blur"
                    : "text-purple-600 dark:hover:bg-slate-800 backdrop-blur"
                }
                onClick={() => handleNavigation("/register")}
              >
                Register
              </Button>
            </>
          )}
        </div>
      </div>
    </nav>
  );
};
