import { UserRole } from "@prisma/client";
import NextAuth, { type DefaultSession } from "next-auth";

// Extend the DefaultSession user with your custom properties
export type ExtendedUser = DefaultSession["user"] & {
  id:string;
  role?: UserRole;
  phonenumber?: string;
  isTwoFactorEnabled?: boolean;
  phoneNumberVerified?: Date | null;
  phoneNumberVerified?: Date | null;
  emailVerified?: Date | null;
  isOAuth?: boolean;
};

declare module "next-auth" {
  // Override the default Session interface to include ExtendedUser
  interface Session {
    user: ExtendedUser;
  }
  
  // Optionally, override the User interface (if you're adding custom properties to it)
  interface User {
    id: string;
    role?: "USER" | "ADMIN";
    phonenumber?: string;
    phoneNumberVerified?: Date | null;
    emailVerified?: Date | null;
  }
}
