"use client";

import { RocketIcon, GiftIcon, UsersIcon } from "lucide-react";

interface FeatureCardProps {
  icon: React.ComponentType<React.SVGProps<SVGSVGElement>>;
  title: string;
  description: string;
}

const FeatureCard = ({ icon: Icon, title, description }: FeatureCardProps) => (
  <div className="bg-white dark:bg-slate-800 rounded-lg shadow-md p-6 text-center">
    <div className="inline-flex items-center justify-center rounded-full bg-blue-100 dark:bg-blue-900 text-blue-600 dark:text-blue-400 p-3 mb-4">
      <Icon className="h-8 w-8" />
    </div>
    <h3 className="text-xl font-semibold text-slate-900 dark:text-slate-100 mb-2">{title}</h3>
    <p className="text-slate-600 dark:text-slate-400 text-sm">{description}</p>
  </div>
);

export const Features = () => {
  return (
    <section className="py-16 bg-slate-50 dark:bg-slate-900">
      <div className="container mx-auto px-4 sm:px-6 lg:px-12">
        <div className="text-center mb-10">
          <h2 className="text-3xl font-bold text-slate-900 dark:text-slate-100 mb-4">
            Supercharge Your Growth with Powerful Features
          </h2>
          <p className="text-lg text-slate-600 dark:text-slate-400 max-w-2xl mx-auto">
            Our AI-powered referral platform is packed with features designed to
            make growing your brand easier and more effective.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          <FeatureCard
            icon={RocketIcon}
            title="Smart AI Campaign Builder"
            description="Effortlessly create and launch referral campaigns with the help of our intelligent AI assistant. Get suggestions for incentives, targeting, and messaging for optimal conversion."
          />
          <FeatureCard
            icon={GiftIcon}
            title="Automated Reward System"
            description="Set up and automate your reward distribution for successful referrals. Offer various incentives like discounts, credits, or exclusive access, all managed seamlessly by the platform."
          />
          <FeatureCard
            icon={UsersIcon}
            title="Real-time Tracking & Analytics"
            description="Monitor the performance of your referral campaigns in real-time. Track key metrics like shares, clicks, conversions, and top referrers to optimize your strategy and maximize ROI."
          />
        </div>
      </div>
    </section>
  );
};