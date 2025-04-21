"use client";

import Image from 'next/image';

export const About = () => {
  return (
    <section className="py-16 bg-slate-900 dark:bg-slate-800  shadow-md">
      <div className="container mx-auto px-4 sm:px-6 lg:px-12">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 items-center">
          <div className="lg:order-1 text-white dark:text-slate-300">
            <h2 className="text-3xl font-bold mb-4">
              About Our AI-Powered Referral Platform
            </h2>
            <p className="text-lg mb-6">
              We are dedicated to helping brands grow through the power of
              referrals. Our AI-driven platform makes it easy to create, manage,
              and optimize referral campaigns that convert.
            </p>
            <p className="text-lg">
              Our mission is to empower businesses of all sizes to leverage their
              existing customer base to acquire new customers and increase
              revenue.
            </p>
          </div>
          <div className="relative rounded-lg overflow-hidden shadow-lg lg:shadow-xl" style={{ aspectRatio: '600 / 400' }}>
            <Image
              src="/authimage.jpg" // Replace with your actual image
              alt="About Us"
              fill
              style={{ objectFit: 'cover' }}
              priority
            />
          </div>
        </div>
      </div>
    </section>
  );
};