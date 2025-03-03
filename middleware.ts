import NextAuth from "next-auth";
import { authConfig } from "@/auth.config";
import { currentUser } from "@/lib/auth";
import { currentUserRole } from "@/lib/admin";
import {
  authRoutes,
  apiAuthPrefix,
  DEFAULT_REDIRECT_URL,
  publicRoutes,
  protectedRoutes,
  adminRoutes,
} from "@/routes";
import { NextRequest as OriginalNextRequest, NextResponse } from "next/server";

interface NextRequest extends OriginalNextRequest {
  auth?: any;
}

const { auth } = NextAuth(authConfig);

export default auth(async function middleware(req: NextRequest) {
  const user = await currentUser(); // Get user session
  const userRole = await currentUserRole(); // Get user role
  const { nextUrl } = req;

  const isLoggedIn = !!user; // Check if user is logged in
  const isOAuthUser = user?.isOAuth; // Check if user is authenticated via OAuth
  const isPhoneVerified = user?.phoneNumberVerified; // Check if user's phone number is verified

  // Treat OAuth users without verified phone numbers as not logged in for protected routes
  const isEffectivelyLoggedIn = isLoggedIn && (!isOAuthUser || isPhoneVerified);

  // Route checks
  const isApiAuthRoute = nextUrl.pathname.startsWith(apiAuthPrefix);
  const isPublicRoute = publicRoutes.includes(nextUrl.pathname);
  const isAuthRoute = authRoutes.includes(nextUrl.pathname);
  const isProtectedRoute = protectedRoutes.includes(nextUrl.pathname);
  const isAdminRoute = adminRoutes.includes(nextUrl.pathname);
  const isVerifyPhoneRoute = nextUrl.pathname === "/verify-phone"; // Check if the route is verify-phone

  if (isApiAuthRoute) {
    return NextResponse.next();
  }

  // Redirect OAuth users with unverified phone numbers away from auth routes
  if (isAuthRoute) {
    if (isOAuthUser && !isPhoneVerified) {
      return NextResponse.redirect(new URL("/verify-phone", nextUrl));
    }
    return NextResponse.next();
  }

  // Redirect users away from verify-phone route if they are effectively logged in
  if (isVerifyPhoneRoute) {
    if (isEffectivelyLoggedIn) {
      return NextResponse.redirect(new URL(DEFAULT_REDIRECT_URL, nextUrl));
    }
    return NextResponse.next();
  }

  if (isAdminRoute) {
    if (!isEffectivelyLoggedIn || userRole !== "ADMIN") {
      return NextResponse.redirect(new URL("/", nextUrl)); // Redirect non-admins to home
    }
    return NextResponse.next();
  }

  // Allow OAuth users with unverified phone numbers to access public routes
  if (isPublicRoute) {
    return NextResponse.next();
  }

  if (isProtectedRoute) {
    if (!isEffectivelyLoggedIn) {
      return NextResponse.redirect(new URL("/login", nextUrl));
    }
  }

  // Handle OAuth users without verified phone numbers
  if (isOAuthUser && !isPhoneVerified && !isVerifyPhoneRoute) {
    return NextResponse.redirect(new URL("/verify-phone", nextUrl));
  }

  if (!isEffectivelyLoggedIn && !isPublicRoute) {
    let callbackUrl = nextUrl.pathname;
    if (nextUrl.search) {
      callbackUrl += nextUrl.search;
    }
    const encodedCallbackUrl = encodeURIComponent(callbackUrl);
    return NextResponse.redirect(
      new URL(`/login?callbackUrl=${encodedCallbackUrl}`, nextUrl)
    );
  }

  return NextResponse.next();
});

export const config = {
  matcher: ["/((?!.+\\.[\\w]+$|_next).*)", "/", "/(api|trpc)(.*)"],
};