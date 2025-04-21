"use client";

import { MailIcon, PhoneIcon, MapPinIcon } from 'lucide-react'; // Or other appropriate icons

export const Contact = () => {
  return (
    <section className="py-16 bg-gradient-to-r from-indigo-500 via-sky-500 to-white">
      <div className="container mx-auto px-4 sm:px-6 lg:px-12">
        <div className="text-center mb-10">
          <h2 className="text-3xl font-bold text-slate-900 dark:text-slate-100 mb-4">
            Get in Touch
          </h2>
          <p className="text-lg text-slate-600 dark:text-slate-400 max-w-2xl mx-auto">
            We'd love to hear from you. Contact us with any questions or feedback.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          <div className="bg-white dark:bg-slate-800 rounded-lg shadow-md p-6 text-center">
            <div className="inline-flex items-center justify-center rounded-full bg-blue-100 dark:bg-blue-900 text-blue-600 dark:text-blue-400 p-3 mb-4">
              <MailIcon className="h-6 w-6" />
            </div>
            <h3 className="text-xl font-semibold text-slate-900 dark:text-slate-100 mb-2">Email</h3>
            <p className="text-slate-600 dark:text-slate-400">
              <a href="mailto:support@example.com" className="hover:underline">
                support@example.com
              </a>
            </p>
          </div>

          <div className="bg-white dark:bg-slate-800 rounded-lg shadow-md p-6 text-center">
            <div className="inline-flex items-center justify-center rounded-full bg-blue-100 dark:bg-blue-900 text-blue-600 dark:text-blue-400 p-3 mb-4">
              <PhoneIcon className="h-6 w-6" />
            </div>
            <h3 className="text-xl font-semibold text-slate-900 dark:text-slate-100 mb-2">Phone</h3>
            <p className="text-slate-600 dark:text-slate-400">
              <a href="tel:+15551234567" className="hover:underline">
                +1 (555) 123-4567
              </a>
            </p>
          </div>

          <div className="bg-white dark:bg-slate-800 rounded-lg shadow-md p-6 text-center">
            <div className="inline-flex items-center justify-center rounded-full bg-blue-100 dark:bg-blue-900 text-blue-600 dark:text-blue-400 p-3 mb-4">
              <MapPinIcon className="h-6 w-6" />
            </div>
            <h3 className="text-xl font-semibold text-slate-900 dark:text-slate-100 mb-2">Address</h3>
            <p className="text-slate-600 dark:text-slate-400">
              123 Main Street
              <br />
              Anytown, CA 91234
            </p>
          </div>
        </div>
      </div>
    </section>
  );
};