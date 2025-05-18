"use client";
import Link from "next/link";
import { useRef, useEffect, useState } from "react";

import Image from "next/image";

import { ModeToggle } from "../togglebtn";

export const Navbar = () => {
  const navRef = useRef<HTMLElement>(null);

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
    <nav
      ref={navRef}
      className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300  ${
        isScrolled ? "shadow-md bg-blue-50" : "shadow-none bg-blue-100"
      }`}
    >
      <div className="container mx-auto flex items-center justify-between p-5 px-6 py-2 lg:py-4  sm:py-3 ">
        <Link href="/">
          <Image
            src="/mamaearth-logo.avif"
            alt="logo"
            width={170}
            height={60}
            className="max-w-[120px] sm:max-w-[170px] h-auto sm:h-auto"
          />
        </Link>

        <div className="flex items-center space-x-4">
          <ModeToggle />
        </div>
      </div>
    </nav>
  );
};
