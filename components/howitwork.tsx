"use client";

export const HowItWorks = () => {
  return (
    <section className="py-16 bg-gray-100 dark:bg-slate-800">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        <h2 className="text-3xl font-bold text-center text-gray-800 dark:text-white mb-4">
          How It Works
        </h2>
        <p className="text-lg text-center text-gray-600 dark:text-gray-400 mb-8">
          It simplifies the entire referral process — from building campaigns with AI to
          tracking every lead and rewarding your loyal customers in real-time.
        </p>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 items-center">
          <div className="text-center">
            <div className="relative w-32 h-32 rounded-full bg-blue-500 flex items-center justify-center text-white text-2xl font-bold mb-4 mx-auto">
              1
              <div className="absolute top-1 right-1 rounded-full bg-white text-blue-500 text-xs w-6 h-6 flex items-center justify-center">
                AI
              </div>
            </div>
            <h3 className="text-xl font-semibold text-gray-700 dark:text-gray-300 mb-2">
              Let ReferralHub AI Guide You
            </h3>
            <p className="text-gray-600 dark:text-gray-400 text-sm">
              Leverage our intelligent AI to craft compelling referral programs.
              Get data-driven suggestions for incentives and messaging.
            </p>
          </div>
          <div className="text-center relative before:content-[''] before:absolute before:left-1/2 before:-translate-x-1/2 before:top-16 before:h-0.5 before:w-1/4 before:bg-gray-300 dark:before:bg-gray-700 md:before:block before:hidden">
            <div className="relative w-32 h-32 rounded-full bg-purple-500 flex items-center justify-center text-white text-2xl font-bold mb-4 mx-auto">
              2
              <div className="absolute top-1 right-1 rounded-full bg-white text-purple-500 text-xs w-6 h-6 flex items-center justify-center">
                <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor" className="w-4 h-4">
                  <path fillRule="evenodd" d="M12 2.25c-5.384 0-9.75 4.366-9.75 9.75s4.366 9.75 9.75 9.75 9.75-4.366 9.75-9.75S17.384 2.25 12 2.25zM8.547 9.147a.75.75 0 10-1.06-1.06l-3 3a.75.75 0 001.06 1.06l3-3zM11 11.75a.75.75 0 10-1.5 0v-2.5a.75.75 0 101.5 0v2.5zm2.447-1.06a.75.75 0 10-1.06 1.06l3 3a.75.75 0 001.06-1.06l-3-3z" clipRule="evenodd" />
                </svg>
              </div>
            </div>
            <h3 className="text-xl font-semibold text-gray-700 dark:text-gray-300 mb-2">
              Share Referral Link
            </h3>
            <p className="text-gray-600 dark:text-gray-400 text-sm">
              Easily share your unique referral link through various channels.
              Track the performance of your shared links in real-time.
            </p>
          </div>
          <div className="text-center relative before:content-[''] before:absolute before:left-1/2 before:-translate-x-1/2 before:top-16 before:h-0.5 before:w-1/4 before:bg-gray-300 dark:before:bg-gray-700 md:before:block before:hidden">
            <div className="relative w-32 h-32 rounded-full bg-black dark:bg-gray-700 flex items-center justify-center text-white text-2xl font-bold mb-4 mx-auto">
              3
              <div className="absolute top-1 right-1 rounded-full bg-white text-black dark:text-gray-700 text-xs w-6 h-6 flex items-center justify-center">
                <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor" className="w-4 h-4">
                  <path d="M12 2.25c-5.385 0-9.75 4.365-9.75 9.75s4.365 9.75 9.75 9.75 9.75-4.365 9.75-9.75S17.385 2.25 12 2.25zM8 10a.75.75 0 01.75-.75h6.5a.75.75 0 01.75.75v4a.75.75 0 01-.75.75H8.75a.75.75 0 01-.75-.75v-4z" />
                  <path d="M10 10.75a.75.75 0 01.75-.75h2.5a.75.75 0 01.75.75v2.5a.75.75 0 01-.75.75h-2.5a.75.75 0 01-.75-.75v-2.5z" />
                </svg>
              </div>
            </div>
            <h3 className="text-xl font-semibold text-gray-700 dark:text-gray-300 mb-2">
              Give Rewards
            </h3>
            <p className="text-gray-600 dark:text-gray-400 text-sm">
              Automatically reward referrers and their friends upon successful
              conversions. Choose from various reward options.
            </p>
          </div>
        </div>
      </div>
    </section>
  );
};