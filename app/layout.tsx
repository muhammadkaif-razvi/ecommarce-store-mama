import type { Metadata } from "next";

import "@/app/globals.css";

import { auth } from "@/auth";

import { Navbar } from "@/components/Navbar";

import { Providers } from "@/components/Providers";

import { Toaster } from "react-hot-toast";

export const metadata: Metadata = {
  title: "AI Refferal Hub",

  description: "Manage your referral links and earn money with AI Refferal Hub",
};

export default async function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  const session = await auth();

  return (
    <html lang="en" suppressHydrationWarning>
      <body>
        <Providers session={session}>
          <Navbar />

          <main>
            {children}

            <Toaster />
          </main>
        </Providers>
      </body>
    </html>
  );
}
