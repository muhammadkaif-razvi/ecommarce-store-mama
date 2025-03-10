"use client";

import { Button } from "@/components/ui/button";
import Link from "next/link";
import Image from "next/image";
import { InfoIcon, RocketIcon } from "lucide-react";

export const Hero = () => {
  return (
    <section className="bg-gradient-to-b from-purple-50 to-white dark:from-slate-900 dark:to-slate-800 py-20">
      <div className="container mx-auto px-4 sm:px-6 lg:px-12">
        <div className="flex flex-col lg:flex-row items-center gap-8 lg:gap-12">
          {/* Text Content */}
          <div className="flex-1 space-y-6 md:space-y-8 text-center lg:text-left">
            <h1 className="text-4xl sm:text-5xl md:text-6xl font-bold text-slate-900 dark:text-slate-100 leading-tight">
              Your E-commerce Admin Dashboard
              <br />
              <span className="text-purple-600 dark:text-purple-400">
                Manage, Analyze, and Scale
              </span>
            </h1>

            <p className="text-lg sm:text-xl text-slate-600 dark:text-slate-400 max-w-2xl mx-auto lg:mx-0">
              A complete admin CMS for managing products, orders, customers, and
              analytics. Built with Next.js, Prisma, and modern tools for
              seamless e-commerce operations.
            </p>

            {/* Buttons */}
            <div className="flex flex-col sm:flex-row gap-3 sm:gap-4 justify-center lg:justify-start">
              <Link href="/stores-setup" className="w-full sm:w-auto">
                <Button className="w-full sm:w-auto h-12 px-6 sm:px-8 text-base sm:text-lg gap-2">
                  <RocketIcon className="h-4 w-4 sm:h-5 sm:w-5" />
                  Go to Dashboard
                </Button>
              </Link>
              <Link href="/features" className="w-full sm:w-auto">
                <Button
                  variant="outline"
                  className="w-full sm:w-auto h-12 px-6 sm:px-8 text-base sm:text-lg gap-2"
                >
                  <InfoIcon className="h-4 w-4 sm:h-5 sm:w-5" />
                  Explore Features
                </Button>
              </Link>
            </div>

            {/* Tech Stack Badges */}
            <div className="flex flex-wrap gap-2 justify-center lg:justify-start">
              <span className="bg-purple-100 dark:bg-purple-900/20 text-purple-600 dark:text-purple-400 px-3 py-1 rounded-full text-sm">
                Next.js 15
              </span>
              <span className="bg-purple-100 dark:bg-purple-900/20 text-purple-600 dark:text-purple-400 px-3 py-1 rounded-full text-sm">
                Prisma
              </span>
              <span className="bg-purple-100 dark:bg-purple-900/20 text-purple-600 dark:text-purple-400 px-3 py-1 rounded-full text-sm">
                Tailwind CSS
              </span>
              <span className="bg-purple-100 dark:bg-purple-900/20 text-purple-600 dark:text-purple-400 px-3 py-1 rounded-full text-sm">
                PostgreSQL
              </span>
              <span className="bg-purple-100 dark:bg-purple-900/20 text-purple-600 dark:text-purple-400 px-3 py-1 rounded-full text-sm">
                Stripe
              </span>
            </div>
          </div>

          {/* Image Section */}
          <div className="flex-1 w-full lg:w-auto mt-8 lg:mt-0">
            <div className="relative aspect-video bg-gradient-to-r from-purple-600 to-indigo-600 dark:from-purple-800 dark:to-indigo-800 rounded-lg lg:rounded-2xl overflow-hidden shadow-lg lg:shadow-xl">
              <Image
                src="/authimage.jpg" // Replace with your e-commerce dashboard image
                alt="E"
                fill
                priority
              />
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};
