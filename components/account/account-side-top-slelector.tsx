"use client"
import React from 'react';
import { cn } from "@/lib/utils";
import Link from "next/link";
import { usePathname } from 'next/navigation';
import { User, Settings } from 'lucide-react';
import { Separator } from '../ui/separator';

interface AccountSelectorItemProps {
  label: string;
  href: string;
  isActive: boolean;
  icon: React.ReactNode;
}

const AccountSelectorItem: React.FC<AccountSelectorItemProps> = ({ label, href, isActive, icon }) => {
  return (
    <Link href={href} className="w-full h-full">
      <div
        className={cn(
          'p-3 sm:p-4 md:p-5 w-full h-full flex items-center justify-center md:justify-start',
          'cursor-pointer transition-colors duration-200',
          'hover:bg-gray-100 dark:hover:bg-gray-800',
          isActive
            ? 'border-b-2 md:border-b-0 md:border-r-2 border-blue-500 font-semibold text-blue-600 dark:text-blue-400'
            : 'text-gray-700 dark:text-gray-300',
          'gap-3 sm:gap-4 md:gap-5'
        )}
      >
        <span className={cn(
          "flex-shrink-0",
          "text-current",
          "h-5 w-5 sm:h-6 sm:w-6 md:h-7 md:w-7", // Responsive icon sizing
          "flex items-center justify-center"
        )}>
          {icon}
        </span>
        <span className={cn(
          "whitespace-nowrap",
          "text-sm sm:text-base md:text-lg", // Responsive text sizing
          "font-medium font-sans",
          "transition-all duration-200",
          "hidden sm:block" // Hide text on smallest screens, show icon only
        )}>
          {label}
        </span>
      </div>
      <Separator className="bg-gray-200 dark:bg-gray-700" />
    </Link>
  );
};

export const AccountSlelector = () => {
  const pathname = usePathname();

  const items = [
    { label: 'Profile', href: '/account/profile', icon: <User className="w-full h-full" /> },
    // { label: 'Orders', href: '/account/orders', icon: <ListChecks className="w-full h-full" /> },
    { label: 'Settings', href: '/account/settings', icon: <Settings className="w-full h-full" /> },
  ];

  return (
    <div
      className={cn(
        'flex flex-row md:flex-col',
        'bg-white dark:bg-gray-900',
        'w-full md:w-48 lg:w-56', // Responsive width
        'h-auto',
        'rounded-lg overflow-hidden'
      )}
    >
      {items.map((item) => (
        <AccountSelectorItem
          key={item.href}
          label={item.label}
          href={item.href}
          isActive={pathname.startsWith(item.href)}
          icon={item.icon}
        />
      ))}
    </div>
  );
};