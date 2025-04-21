"use client";

import Link from 'next/link';

export const Footer = () => {
  return (
    <footer className="bg-slate-900 dark:bg-slate-800 py-12 text-slate-400 dark:text-slate-300 shadow-inner">
      <div className="container mx-auto px-4 sm:px-6 lg:px-12">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
          <div>
            <h4 className="text-lg font-semibold mb-4 text-white dark:text-slate-100">
              About Us
            </h4>
            <p className="text-sm">
              Your AI-powered referral platform for growing brands. We help you
              empower your customers to spread the word.
            </p>
          </div>

          <div>
            <h4 className="text-lg font-semibold mb-4 text-white dark:text-slate-100">
              Company
            </h4>
            <ul className="text-sm">
              <li>
                <Link href="/about" className="hover:underline">
                  About
                </Link>
              </li>
              <li>
                <Link href="/features" className="hover:underline">
                  Features
                </Link>
              </li>
              <li>
                <Link href="/contact" className="hover:underline">
                  Contact
                </Link>
              </li>
            </ul>
          </div>

          <div>
            <h4 className="text-lg font-semibold mb-4 text-white dark:text-slate-100">
              Resources
            </h4>
            <ul className="text-sm">
              <li>
                <Link href="/blog" className="hover:underline">
                  Blog
                </Link>
              </li>
              <li>
                <Link href="/help" className="hover:underline">
                  Help Center
                </Link>
              </li>
              <li>
                <Link href="/terms" className="hover:underline">
                  Terms of Service
                </Link>
              </li>
              <li>
                <Link href="/privacy" className="hover:underline">
                  Privacy Policy
                </Link>
              </li>
            </ul>
          </div>

          <div>
            <h4 className="text-lg font-semibold mb-4 text-white dark:text-slate-100">
              Follow Us
            </h4>
            <ul className="text-sm">
              <li>
                <a href="#" className="hover:underline">
                  Facebook
                </a>
              </li>
              <li>
                <a href="#" className="hover:underline">
                  Twitter
                </a>
              </li>
              <li>
                <a href="#" className="hover:underline">
                  LinkedIn
                </a>
              </li>
            </ul>
          </div>
        </div>

        <div className="mt-8 pt-8 border-t border-slate-700 dark:border-slate-700 text-center text-sm">
          &copy; {new Date().getFullYear()} Example Company. All rights reserved.
        </div>
      </div>
    </footer>
  );
};