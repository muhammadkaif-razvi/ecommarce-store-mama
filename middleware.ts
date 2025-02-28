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
  adminRoutes, // Import admin routes
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

  // Route checks
  const isApiAuthRoute = nextUrl.pathname.startsWith(apiAuthPrefix);
  const isPublicRoute = publicRoutes.includes(nextUrl.pathname);
  const isAuthRoute = authRoutes.includes(nextUrl.pathname);
  const isProtectedRoute = protectedRoutes.includes(nextUrl.pathname);
  const isAdminRoute = adminRoutes.includes(nextUrl.pathname);

  if (isApiAuthRoute) {
    return NextResponse.next();
  }

  if (isAuthRoute) {
    if (isLoggedIn) {
      return NextResponse.redirect(new URL(DEFAULT_REDIRECT_URL, nextUrl));
    }
    return NextResponse.next();
  }

  if (isAdminRoute) {
    if (!isLoggedIn || userRole !== "ADMIN") {
      return NextResponse.redirect(new URL("/", nextUrl)); // Redirect non-admins to home
    }
    return NextResponse.next();
  }

  if (isProtectedRoute) {
    if (!isLoggedIn) {
      return NextResponse.redirect(new URL("/login", nextUrl));
    }
  }
  if (!isLoggedIn && !isPublicRoute) {
    let callbackUrl = nextUrl.pathname;
    if(nextUrl.search) {
      callbackUrl += nextUrl.search;
    }
    const encodedCallbackUrl = encodeURIComponent(callbackUrl);
    return NextResponse.redirect(new URL(`/login?callbackUrl=${encodedCallbackUrl}`, nextUrl));
  }

  return NextResponse.next();
});

export const config = {
  matcher: ["/((?!.+\\.[\\w]+$|_next).*)", "/", "/(api|trpc)(.*)"],
};
