import type { Metadata } from "next";

import "@/app/globals.css";

import { auth } from "@/auth";


import { Providers } from "@/components/Providers";

import { Toaster } from "react-hot-toast";

export const metadata: Metadata = {
  title: "Mamaearth Natural Skin & Hair Care Products",

  description: " Mamaearth Natural Skin & Hair Care Products",
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
          <main>
            {children}

            <Toaster />
          </main>
        </Providers>
      </body>
    </html>
  );
}
