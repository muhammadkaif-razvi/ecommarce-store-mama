"use client";

import { Button } from "@/components/ui/button";
import Link from "next/link";
import Image from "next/image";
import { MoveRight } from "lucide-react";
import {
  FaGoogle,
  FaLinkedin,
  FaCcVisa,
  FaSpotify,
  FaStripe,
} from "react-icons/fa";

export const Hero = () => {
  const brands = [
    { icon: FaStripe, label: "Stripe" },
    { icon: FaGoogle, label: "Google" },
    // { imageSrc: "", label: "Samsung" },
    { icon: FaCcVisa, label: "Visa" },
    { icon: FaSpotify, label: "Spotify" },
    { icon: FaLinkedin, label: "LinkedIn" },
  ];
  return (
    <section className="bg-gradient-to-b from-blue-100 to-blue-50 dark:from-slate-900 dark:to-slate-800 py-20 px-3">
      <div className="container mx-auto ">
        <div className="flex flex-col lg:flex-row items-center gap-8 lg:gap-12">
          {/* Text Content */}
          <div className="flex-1 space-y-6 md:space-y-8 text-center lg:text-left ">
            <h1 className="text-4xl sm:text-5xl md:text-6xl font-bold text-slate-900 dark:text-slate-100 leading-tight">
              AI-Powered Referral
              <br className="hidden sm:block" />{" "}
              {/* Line break only on larger screens */}
              <span>Platform for Growing Brands</span>
            </h1>

            <p className="text-lg sm:text-xl text-slate-600 dark:text-slate-400 max-w-2xl mx-auto lg:mx-0">
              Empower your existing customer base to spread the word, while our
              smart AI assistant guides you through creating and managing
              referral campaigns that actually convert.
            </p>

            {/* Buttons */}
            <div className="flex flex-col sm:flex-row gap-3 sm:gap-4 justify-center lg:justify-start">
              <Link href="/platform-setup" className="w-full sm:w-auto">
                <Button className="w-full sm:w-auto h-12 px-6 sm:px-8 text-base sm:text-lg gap-2 bg-blue-600 hover:bg-blue-700 text-white">
                  Get STARTED
                  <MoveRight className="h-4 w-4 sm:h-5 sm:w-5" />
                </Button>
              </Link>
            </div>
          </div>

          {/* Image Section */}
          <div className="flex-1 w-full lg:w-auto mt-8 lg:mt-0 ">
            <div
              className="relative rounded-lg lg:rounded-2xl overflow-hidden shadow-lg lg:shadow-xl max-w-lg mx-auto lg:mx-0"
              style={{ aspectRatio: "845 / 695" }}
            >
              <Image
                src="/refere.png"
                alt="AI-Powered Referral Platform Dashboard"
                fill
                style={{ objectFit: "cover" }}
                priority
              />
            </div>
          </div>
        </div>
        <div className="mt-16 py-8 text bg-slate-800 rounded-sm">
          <h2 className="text-center text-white font-semibold text-sm uppercase tracking-wider mb-4">
            Trusted by Leading Global Brands
          </h2>
          <div className="flex items-center justify-around flex-wrap gap-6 ">
            {brands.map((brand) =>
              brand.icon ? (
                <brand.icon
                  key={brand.label}
                  className="h-10 w-20 text-white"
                  aria-label={brand.label}
                />
              ) : null
              // : brand.imageSrc ? (
              //   <Image
              //     key={brand.label}
              //     src={brand?.imageSrc}
              //     alt={brand.label}
              //     height={24}
              //     width={70}
              //     className="object-contain"
              //   />
              // ) : null
            )}
          </div>
        </div>
      </div>
    </section>
  );
};
