"use client";

import { Hero } from "@/components/Hero";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import Link from "next/link";
import {
  ShoppingCartIcon,
  UsersIcon,
  PackageIcon,
  CreditCardIcon,
  BarChartIcon,
  FileTextIcon,
  TagIcon,
  GlobeIcon,
  BellIcon,
  ShieldIcon,
} from "lucide-react";

export default function AdminDashboard() {
  return (
    <div className="bg-gray-50 dark:bg-gray-900 text-gray-900 dark:text-gray-100">
      {/* Hero Section */}
      <Hero />

      {/* Features Section */}
      <section className="py-24 bg-white dark:bg-slate-900">
        <div className="container mx-auto px-4">
          <div className="max-w-3xl mx-auto text-center mb-16">
            <h2 className="text-4xl font-bold text-slate-900 dark:text-slate-100 mb-4">
              Manage Your E-commerce Store with Ease
            </h2>
            <p className="text-xl text-slate-600 dark:text-slate-400">
              A powerful admin CMS designed to streamline your e-commerce
              operations.
            </p>
          </div>

          <div className="grid gap-8 md:grid-cols-2 lg:grid-cols-3">
            {/* 1. Product Management */}
            <Card className="hover:border-purple-500 transition-colors">
              <CardHeader>
                <div className="mb-4 flex items-center justify-center w-12 h-12 rounded-lg bg-purple-100 dark:bg-purple-900/20">
                  <PackageIcon className="w-7 h-7 text-purple-600 dark:text-purple-400" />
                </div>
                <CardTitle className="text-slate-900 dark:text-slate-100">
                  Product Management
                </CardTitle>
              </CardHeader>
              <CardContent>
                <p className="text-slate-600 dark:text-slate-400">
                  Add, edit, and manage products with ease. Organize by
                  categories, tags, and inventory.
                </p>
              </CardContent>
            </Card>

            {/* 2. Order Management */}
            <Card className="hover:border-purple-500 transition-colors">
              <CardHeader>
                <div className="mb-4 flex items-center justify-center w-12 h-12 rounded-lg bg-purple-100 dark:bg-purple-900/20">
                  <ShoppingCartIcon className="w-7 h-7 text-purple-600 dark:text-purple-400" />
                </div>
                <CardTitle className="text-slate-900 dark:text-slate-100">
                  Order Management
                </CardTitle>
              </CardHeader>
              <CardContent>
                <p className="text-slate-600 dark:text-slate-400">
                  Track and manage orders, process refunds, and handle shipping.
                </p>
              </CardContent>
            </Card>

            {/* 3. Customer Management */}
            <Card className="hover:border-purple-500 transition-colors">
              <CardHeader>
                <div className="mb-4 flex items-center justify-center w-12 h-12 rounded-lg bg-purple-100 dark:bg-purple-900/20">
                  <UsersIcon className="w-7 h-7 text-purple-600 dark:text-purple-400" />
                </div>
                <CardTitle className="text-slate-900 dark:text-slate-100">
                  Customer Management
                </CardTitle>
              </CardHeader>
              <CardContent>
                <p className="text-slate-600 dark:text-slate-400">
                  Manage customer profiles, view order history, and send
                  targeted promotions.
                </p>
              </CardContent>
            </Card>

            {/* 4. Payment Processing */}
            <Card className="hover:border-purple-500 transition-colors">
              <CardHeader>
                <div className="mb-4 flex items-center justify-center w-12 h-12 rounded-lg bg-purple-100 dark:bg-purple-900/20">
                  <CreditCardIcon className="w-7 h-7 text-purple-600 dark:text-purple-400" />
                </div>
                <CardTitle className="text-slate-900 dark:text-slate-100">
                  Payment Processing
                </CardTitle>
              </CardHeader>
              <CardContent>
                <p className="text-slate-600 dark:text-slate-400">
                  Integrate with multiple payment gateways for seamless
                  transactions.
                </p>
              </CardContent>
            </Card>

            {/* 5. Analytics & Reports */}
            <Card className="hover:border-purple-500 transition-colors">
              <CardHeader>
                <div className="mb-4 flex items-center justify-center w-12 h-12 rounded-lg bg-purple-100 dark:bg-purple-900/20">
                  <BarChartIcon className="w-7 h-7 text-purple-600 dark:text-purple-400" />
                </div>
                <CardTitle className="text-slate-900 dark:text-slate-100">
                  Analytics & Reports
                </CardTitle>
              </CardHeader>
              <CardContent>
                <p className="text-slate-600 dark:text-slate-400">
                  Gain insights with detailed sales, customer, and product
                  reports.
                </p>
              </CardContent>
            </Card>

            {/* 6. Discounts & Promotions */}
            <Card className="hover:border-purple-500 transition-colors">
              <CardHeader>
                <div className="mb-4 flex items-center justify-center w-12 h-12 rounded-lg bg-purple-100 dark:bg-purple-900/20">
                  <TagIcon className="w-7 h-7 text-purple-600 dark:text-purple-400" />
                </div>
                <CardTitle className="text-slate-900 dark:text-slate-100">
                  Discounts & Promotions
                </CardTitle>
              </CardHeader>
              <CardContent>
                <p className="text-slate-600 dark:text-slate-400">
                  Create and manage discounts, coupons, and promotional
                  campaigns.
                </p>
              </CardContent>
            </Card>

            {/* 7. Multi-language Support */}
            <Card className="hover:border-purple-500 transition-colors">
              <CardHeader>
                <div className="mb-4 flex items-center justify-center w-12 h-12 rounded-lg bg-purple-100 dark:bg-purple-900/20">
                  <GlobeIcon className="w-7 h-7 text-purple-600 dark:text-purple-400" />
                </div>
                <CardTitle className="text-slate-900 dark:text-slate-100">
                  Multi-language Support
                </CardTitle>
              </CardHeader>
              <CardContent>
                <p className="text-slate-600 dark:text-slate-400">
                  Support multiple languages for a global customer base.
                </p>
              </CardContent>
            </Card>

            {/* 8. Notifications */}
            <Card className="hover:border-purple-500 transition-colors">
              <CardHeader>
                <div className="mb-4 flex items-center justify-center w-12 h-12 rounded-lg bg-purple-100 dark:bg-purple-900/20">
                  <BellIcon className="w-7 h-7 text-purple-600 dark:text-purple-400" />
                </div>
                <CardTitle className="text-slate-900 dark:text-slate-100">
                  Notifications
                </CardTitle>
              </CardHeader>
              <CardContent>
                <p className="text-slate-600 dark:text-slate-400">
                  Send automated notifications for orders, updates, and alerts.
                </p>
              </CardContent>
            </Card>

            {/* 9. Security */}
            <Card className="hover:border-purple-500 transition-colors">
              <CardHeader>
                <div className="mb-4 flex items-center justify-center w-12 h-12 rounded-lg bg-purple-100 dark:bg-purple-900/20">
                  <ShieldIcon className="w-7 h-7 text-purple-600 dark:text-purple-400" />
                </div>
                <CardTitle className="text-slate-900 dark:text-slate-100">
                  Security
                </CardTitle>
              </CardHeader>
              <CardContent>
                <p className="text-slate-600 dark:text-slate-400">
                  Advanced security features to protect your store and customer
                  data.
                </p>
              </CardContent>
            </Card>
          </div>
        </div>
      </section>

      {/* Call-to-Action Section */}
      <section className="py-24 bg-gradient-to-r from-purple-600 to-indigo-600 dark:from-purple-800 dark:to-indigo-800">
        <div className="container mx-auto px-4 text-center">
          <h2 className="text-4xl font-bold text-white mb-6">
            Get Started Today
          </h2>
          <p className="text-xl text-purple-100 dark:text-purple-200 mb-8">
            One-time purchase. Full source code included. Available on:
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Button
              asChild
              className="h-12 px-8 text-lg gap-2 bg-white text-purple-600 hover:bg-purple-50"
            >
              <Link
                href="https://codecanyon.net/item/your-product/12345678"
                target="_blank"
                rel="noopener noreferrer"
              >
                <ShoppingCartIcon className="h-5 w-5" />
                Buy on CodeCanyon
              </Link>
            </Button>
            <Button
              asChild
              variant="outline"
              className="h-12 px-8 text-lg gap-2 border-white text-white hover:bg-white/10"
            >
              <Link
                href="https://your-store.gumroad.com/l/your-product"
                target="_blank"
                rel="noopener noreferrer"
              >
                <FileTextIcon className="h-5 w-5" />
                Buy on Gumroad
              </Link>
            </Button>
          </div>
        </div>
      </section>
    </div>
  );
}
