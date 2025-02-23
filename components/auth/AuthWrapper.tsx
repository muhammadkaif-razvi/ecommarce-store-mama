"use client";
import { JSX, useEffect } from "react";
import Link from "next/link";
import {
  Card,
  CardContent,

} from "@/components/ui/card";
import { cn } from "@/lib/utils";
import { SocialSignIn } from "./Social/SocialSignIn";
import { signOut } from "next-auth/react";
import { usePathname} from "next/navigation";
import Image from "next/image";

type AuthWrapperProps = {
  children: React.ReactNode;
  headerLabel: string;
  src: string;
  alt: string;
  mainhead: string;
  BesiderHrefLabel: string;
  BackHref: string;
  BackHrefLabel: string;
  showSocial?: boolean;
  continueLabel?: string;
  showContinueSeparator?: boolean;
};

interface WrapperProps {
  className?: string;
  [key: string]: any;
}

export function AuthWrapper({
  children,
  mainhead,
  headerLabel,
  BesiderHrefLabel,
  BackHref,
  BackHrefLabel,
  src,
  alt,
  showContinueSeparator,
  continueLabel,
  showSocial,
  className,
  ...props
}: AuthWrapperProps & WrapperProps): JSX.Element {

  const pathname = usePathname();

  const handleSignOut = (e: React.MouseEvent<HTMLAnchorElement>) => {
    if (pathname === "/verify-phone") {
      e.preventDefault(); // Prevent default navigation
      signOut({ callbackUrl: "/" }); // Sign out and redirect
    }
  };



  return (
    <div
      suppressHydrationWarning
      className={cn("flex flex-col gap-6", className)}
      {...props}
    >
      <Card className="overflow-hidden">
        <CardContent className="grid p-0 md:grid-cols-2">
          <div className="p-6 md:p-8">
            <div className="flex flex-col gap-6">
              <div className="flex flex-col items-center text-center">
                <h1 className="text-2xl font-bold">{mainhead}</h1>
                <p className="text-balance text-muted-foreground">
                  {headerLabel}
                </p>
              </div>

              {children}
              {showContinueSeparator && (
                <div className="relative text-center text-sm after:absolute after:inset-0 after:top-1/2 after:z-0 after:flex after:items-center after:border-t after:border-border">
                  <span className="relative z-10 bg-background px-2 text-muted-foreground">
                    {continueLabel}
                  </span>
                </div>
              )}
              {showSocial && (
                <SocialSignIn />
              )}

              <div className="text-center text-sm inline">
                {BesiderHrefLabel}
                <Link href={BackHref} onClick={handleSignOut} className="underline underline-offset-4">
                  {BackHrefLabel}
                </Link>
              </div>
            </div>
          </div>
          <div className="relative hidden bg-muted md:block">
            <Image
              src={src}
              alt={alt}
              className="absolute inset-0 h-full w-full object-cover dark:brightness-[0.2] dark:grayscale"
            />
          </div>
        </CardContent>
      </Card>
      <div className="text-balance text-center text-xs text-muted-foreground [&_a]:underline [&_a]:underline-offset-4 hover:[&_a]:text-primary">
        By clicking continue, you agree to our <a href="#">Terms of Service</a>{" "}
        and <a href="#">Privacy Policy</a>.
      </div>
    </div>
  );
}

export default AuthWrapper;
