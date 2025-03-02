"use client";

import { SessionProvider } from "next-auth/react";
import { ThemeProvider as NextThemesProvider } from "next-themes";
import { type ReactNode } from "react";
import { Session } from "next-auth";

export function Providers({
  children,
  session = null, // Default value
}: {
  children: ReactNode;
  session?: Session | null; // Optional session prop
}) {
  return (
    <SessionProvider session={session}>
      <NextThemesProvider attribute="class" defaultTheme="system" enableSystem>
        {children}
      </NextThemesProvider>
    </SessionProvider>
  );
}