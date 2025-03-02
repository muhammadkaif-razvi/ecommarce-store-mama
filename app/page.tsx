"use client";

import { Hero } from "@/components/Hero";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import Link from "next/link";
import { FaCogs, FaGoogle, FaGithub } from "react-icons/fa";
import {
  ShieldCheckIcon,
  LockIcon,
  SmartphoneIcon,
  MailIcon,
  KeyIcon,
  CodeIcon,
  DatabaseIcon,
  ZapIcon,
  UserCheckIcon,
  ShoppingCartIcon,
} from "lucide-react";

export default function HomePage() {
  return (
    <div className="bg-gray-50 dark:bg-gray-900 text-gray-900 dark:text-gray-100">
      {/* Hero Section */}
      <Hero />

      {/* Features Section */}
      <section className="py-24 bg-white dark:bg-slate-900">
        <div className="container mx-auto px-4">
          <div className="max-w-3xl mx-auto text-center mb-16">
            <h2 className="text-4xl font-bold text-slate-900 dark:text-slate-100 mb-4">
              Everything You Need for Secure Authentication
            </h2>
            <p className="text-xl text-slate-600 dark:text-slate-400">
              A complete authentication solution built with modern security
              practices and developer-friendly tools.
            </p>
          </div>

          <div className="grid gap-8 md:grid-cols-2 lg:grid-cols-3">
            {/* 1. Security First */}
            <Card className="hover:border-purple-500 transition-colors">
              <CardHeader>
                <div className="mb-4 flex items-center justify-center w-12 h-12 rounded-lg bg-purple-100 dark:bg-purple-900/20">
                  <ShieldCheckIcon className="w-7 h-7 text-purple-600 dark:text-purple-400" />
                </div>
                <CardTitle className="text-slate-900 dark:text-slate-100">
                  Security First
                </CardTitle>
              </CardHeader>
              <CardContent>
                <p className="text-slate-600 dark:text-slate-400">
                  OAuth 2.0, OpenID Connect, and JWT-based authentication for
                  enterprise-grade security.
                </p>
              </CardContent>
            </Card>

            {/* 2. Two-Factor Authentication */}
            <Card className="hover:border-purple-500 transition-colors">
              <CardHeader>
                <div className="mb-4 flex items-center justify-center w-12 h-12 rounded-lg bg-purple-100 dark:bg-purple-900/20">
                  <LockIcon className="w-7 h-7 text-purple-600 dark:text-purple-400" />
                </div>
                <CardTitle className="text-slate-900 dark:text-slate-100">
                  2FA Support
                </CardTitle>
              </CardHeader>
              <CardContent>
                <p className="text-slate-600 dark:text-slate-400">
                  Enable two-factor authentication for enhanced account
                  security.
                </p>
              </CardContent>
            </Card>

            {/* 3. Phone OTP Login */}
            <Card className="hover:border-purple-500 transition-colors">
              <CardHeader>
                <div className="mb-4 flex items-center justify-center w-12 h-12 rounded-lg bg-purple-100 dark:bg-purple-900/20">
                  <SmartphoneIcon className="w-7 h-7 text-purple-600 dark:text-purple-400" />
                </div>
                <CardTitle className="text-slate-900 dark:text-slate-100">
                  Phone OTP Login
                </CardTitle>
              </CardHeader>
              <CardContent>
                <p className="text-slate-600 dark:text-slate-400">
                  Login with one-time passwords sent via SMS for quick access.
                </p>
              </CardContent>
            </Card>

            {/* 4. Email Magic Links */}
            <Card className="hover:border-purple-500 transition-colors">
              <CardHeader>
                <div className="mb-4 flex items-center justify-center w-12 h-12 rounded-lg bg-purple-100 dark:bg-purple-900/20">
                  <MailIcon className="w-7 h-7 text-purple-600 dark:text-purple-400" />
                </div>
                <CardTitle className="text-slate-900 dark:text-slate-100">
                  Email Magic Links
                </CardTitle>
              </CardHeader>
              <CardContent>
                <p className="text-slate-600 dark:text-slate-400">
                  Passwordless login with secure magic links sent to your email.
                </p>
              </CardContent>
            </Card>

            {/* 5. Social Login */}
            <Card className="hover:border-purple-500 transition-colors">
              <CardHeader>
                <div className="mb-4 flex items-center justify-center w-12 h-12 rounded-lg bg-purple-100 dark:bg-purple-900/20">
                  <FaGoogle className="w-7 h-7 text-purple-600 dark:text-purple-400" />
                </div>
                <CardTitle className="text-slate-900 dark:text-slate-100">
                  Social Login
                </CardTitle>
              </CardHeader>
              <CardContent>
                <p className="text-slate-600 dark:text-slate-400">
                  Login with Google, GitHub, and other social providers.
                </p>
              </CardContent>
            </Card>

            {/* 6. Password Recovery */}
            <Card className="hover:border-purple-500 transition-colors">
              <CardHeader>
                <div className="mb-4 flex items-center justify-center w-12 h-12 rounded-lg bg-purple-100 dark:bg-purple-900/20">
                  <KeyIcon className="w-7 h-7 text-purple-600 dark:text-purple-400" />
                </div>
                <CardTitle className="text-slate-900 dark:text-slate-100">
                  Password Recovery
                </CardTitle>
              </CardHeader>
              <CardContent>
                <p className="text-slate-600 dark:text-slate-400">
                  Reset passwords securely via SMS OTP or email magic links.
                </p>
              </CardContent>
            </Card>

            {/* 7. Developer Friendly */}
            <Card className="hover:border-purple-500 transition-colors">
              <CardHeader>
                <div className="mb-4 flex items-center justify-center w-12 h-12 rounded-lg bg-purple-100 dark:bg-purple-900/20">
                  <CodeIcon className="w-7 h-7 text-purple-600 dark:text-purple-400" />
                </div>
                <CardTitle className="text-slate-900 dark:text-slate-100">
                  Developer Friendly
                </CardTitle>
              </CardHeader>
              <CardContent>
                <p className="text-slate-600 dark:text-slate-400">
                  Built with Next.js, Prisma, and TypeScript for seamless
                  integration.
                </p>
              </CardContent>
            </Card>

            {/* 8. Scalable Infrastructure */}
            <Card className="hover:border-purple-500 transition-colors">
              <CardHeader>
                <div className="mb-4 flex items-center justify-center w-12 h-12 rounded-lg bg-purple-100 dark:bg-purple-900/20">
                  <DatabaseIcon className="w-7 h-7 text-purple-600 dark:text-purple-400" />
                </div>
                <CardTitle className="text-slate-900 dark:text-slate-100">
                  Scalable Infrastructure
                </CardTitle>
              </CardHeader>
              <CardContent>
                <p className="text-slate-600 dark:text-slate-400">
                  Powered by NeonDB (PostgreSQL) for serverless scalability.
                </p>
              </CardContent>
            </Card>

            {/* 9. High Performance */}
            <Card className="hover:border-purple-500 transition-colors">
              <CardHeader>
                <div className="mb-4 flex items-center justify-center w-12 h-12 rounded-lg bg-purple-100 dark:bg-purple-900/20">
                  <ZapIcon className="w-7 h-7 text-purple-600 dark:text-purple-400" />
                </div>
                <CardTitle className="text-slate-900 dark:text-slate-100">
                  High Performance
                </CardTitle>
              </CardHeader>
              <CardContent>
                <p className="text-slate-600 dark:text-slate-400">
                  Optimized for fast authentication with minimal latency.
                </p>
              </CardContent>
            </Card>

            {/* 10. User Management */}
            <Card className="hover:border-purple-500 transition-colors">
              <CardHeader>
                <div className="mb-4 flex items-center justify-center w-12 h-12 rounded-lg bg-purple-100 dark:bg-purple-900/20">
                  <UserCheckIcon className="w-7 h-7 text-purple-600 dark:text-purple-400" />
                </div>
                <CardTitle className="text-slate-900 dark:text-slate-100">
                  User Management
                </CardTitle>
              </CardHeader>
              <CardContent>
                <p className="text-slate-600 dark:text-slate-400">
                  Easily manage users, roles, and permissions.
                </p>
              </CardContent>
            </Card>

            {/* 11. Customizable */}
            <Card className="hover:border-purple-500 transition-colors">
              <CardHeader>
                <div className="mb-4 flex items-center justify-center w-12 h-12 rounded-lg bg-purple-100 dark:bg-purple-900/20">
                  <FaCogs className="w-7 h-7 text-purple-600 dark:text-purple-400" />
                </div>
                <CardTitle className="text-slate-900 dark:text-slate-100">
                  Fully Customizable
                </CardTitle>
              </CardHeader>
              <CardContent>
                <p className="text-slate-600 dark:text-slate-400">
                  Tailor the system to fit your application&apos;s needs.
                </p>
              </CardContent>
            </Card>

            <Card className="hover:border-purple-500 transition-colors">
              <CardHeader>
                <div className="mb-4 flex items-center justify-center w-12 h-12 rounded-lg bg-purple-100 dark:bg-purple-900/20">
                  <FaGithub className="w-7 h-7 text-purple-600 dark:text-purple-400" />
                </div>
                <CardTitle className="text-slate-900 dark:text-slate-100">
                  Open Source
                </CardTitle>
              </CardHeader>
              <CardContent>
                <p className="text-slate-600 dark:text-slate-400">
                  Built with open-source tools for transparency and flexibility.
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
            Get the Full Source Code
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
                <CodeIcon className="h-5 w-5" /> {/* Icon for Gumroad */}
                Buy on Gumroad
              </Link>
            </Button>
          </div>
        </div>
      </section>
    </div>
  );
}
