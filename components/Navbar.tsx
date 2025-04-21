"use client";
import Link from "next/link";
import { Button } from "@/components/ui/button";
import { usePathname, } from "next/navigation";
import { useRef, useEffect, useState } from "react";

import Image from "next/image";
import { MoveRight, } from "lucide-react";
import { Inter } from "next/font/google";

import { useCurrentUser } from "@/hooks/use-current-user";

import HeadderUser from "./user/headder-user";

const inter = Inter({ subsets: ["latin"] });

export const Navbar = () => {
  const navRef = useRef<HTMLElement>(null);
  const user = useCurrentUser();
  const pathname = usePathname();
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
      document.documentElement.style.setProperty("--nav-height", `${height}px`);
    }
  }, []);


  useEffect(() => {
    setMounted(true);
  }, []);

  if (!mounted) return null;

  return (
    <>
      {["/","/login","/new-password","/register","/reset-password","/verify-phone"].includes(pathname) && (
        <nav
          ref={navRef}
          className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300  ${
            isScrolled ? "shadow-md bg-blue-50" : "shadow-none bg-blue-100"
          }`}
        >
          <div className="container mx-auto flex items-center justify-between p-5 px-6 py-2 lg:py-4  sm:py-3 ">
            <Link href="/">
              <Image
                src="/letter-case-k-alphabet-photography-k.jpg"
                alt="logo"
                width={35}
                height={35}
              />
            </Link>
            {["/",].includes(pathname) && (
              <div
                className={`space-x-3 lg:space-x-12  flex-row hidden lg:block md:block sm:block${inter.className}`}
              >
                <Link href={"#features"}>Features</Link>
                <Link href={"#about"}>About Us</Link>
                <Link href="#howitwork">How it works</Link>
                <Link href="#about">Pricing</Link>
              </div>
            )}

            <div className="flex items-center space-x-4">
              {/* <ModeToggle /> */}
                <Link
                  href="/platform-setup"
                  className="w-full sm:w-auto flex justify-center"
                >
                  <Button className="w-full sm:w-[140px] lg:w-[157px] lg:h-[37.34px] h-[30px] sm:h-[35px]  px-2 sm:px-6 lg:px-8 text-sm sm:text-base lg:text-base gap-2 bg-blue-600 hover:bg-blue-700 text-white">
                    Get STARTED
                    <MoveRight className="h-4 w-4 sm:h-5 sm:w-5" />
                  </Button>
                </Link>
            
              {user && (
                <div>
            <HeadderUser />
                </div>
              )}
            </div>
          </div>
        </nav>
      )}
    </>
  );
};
