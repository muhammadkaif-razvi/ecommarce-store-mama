import NextAuth, { DefaultSession, DefaultUser } from "next-auth";

declare module "next-auth" {
  interface User extends DefaultUser {
    phonenumber?: string | null;
    isTwoFactorEnabled?: boolean;
  }

  interface Session extends DefaultSession {
    user: User;
  }
}

declare module "next-auth/jwt" {
  interface JWT {
    phonenumber?: string | null;
    isTwoFactorEnabled?: boolean;
  }
}
