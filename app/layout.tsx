import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import "@/app/globals.css";
import { auth } from "@/auth";
import { Navbar } from "@/components/Navbar";
import { Providers } from "@/components/Providers";
import { ModalProvider } from "@/providers/modal-provider";
import { Toaster } from "react-hot-toast";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: "Admin CMS Dashboard",
  description: "Manage your store with ease",
};

export default async function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  const session = await auth();

  return (
    <html lang="en" suppressHydrationWarning>
      <body
        className={`${geistSans.variable} ${geistMono.variable} antialiased`}
      >
        <Providers session={session}>
          <Navbar />
          <main style={{ paddingTop: "var(--navbar-height, 2rem)" }}>
            <ModalProvider />
            {children}
            <Toaster />
          </main>
        </Providers>
      </body>
    </html>
  );
}
