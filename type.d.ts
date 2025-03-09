export type ExtendedUser = DefaultSession["user"] & {
  id: string;
  name?: string;
  role?: UserRole;
  phonenumber?: string;
  isTwoFactorEnabled?: boolean;
  phoneNumberVerified?: Date | null;
  emailVerified?: Date | null;
  isOAuth?: boolean;
  stores?: { id: string; name: string }[]; // Include stores in session
};

declare module "next-auth" {
  interface Session {
    user: ExtendedUser;
  }

  interface User {
    id: string;
    name?: string;
    role?: "USER" | "ADMIN";
    phonenumber?: string;
    phoneNumberVerified?: Date | null;
    emailVerified?: Date | null;
    stores?: { id: string; name: string }[];
  }
}
