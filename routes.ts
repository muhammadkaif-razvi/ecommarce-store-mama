export const publicRoutes = [
  "/", // Home route
  "/api/(.*)", 
  "/category/(.*)",
  "/cart" ,
  "/product/(.*)",
];

export const adminRoutes = [
  "/admin", // Admin routes
];

export const protectedRoutes = [
  "/profile",
  "/new-verification",
  "/settings",
  "/platform-setup",
  
];

export const authRoutes = [
  "/login",
  "/register",
  "/error",
  "/reset-password",
  "/new-password",
];

export const apiAuthPrefix = "/api/auth"; // Auth API prefix
export const DEFAULT_REDIRECT_URL = "/cart"; // Default redirect URL