/*
 *An array of routes that are public
 * There routes are accessible to everyone
 * /@type {string[]}
 */

export const publicRoutes = ["/"];
export const adminRoutes = ["/admin"];

/*
 *An array of routes that are protected
 * There routes are accessible to authenticated users
 * /@type {string[]}
 */
export const protectedRoutes = ["/profile", "/new-verification", "/settings"];

/*
 *An array of routes that are auth routes
 * There routes are accessible to unauthenticated users
 * /@type {string[]}
 */
export const authRoutes = [
  "/login",
  "/register",
  "/error",
  "/reset-password",
  "/new-password",
];

/*
 *The prefix for the api auth routes
 * /@type {string}
 */
export const apiAuthPrefix = "/api/auth";

export const DEFAULT_REDIRECT_URL = "/profile";
