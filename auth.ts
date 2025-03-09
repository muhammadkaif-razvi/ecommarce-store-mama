import NextAuth from "next-auth";
import { authConfig } from "@/auth.config";
import { db } from "@/lib/db";
import { PrismaAdapter } from "@auth/prisma-adapter";
import { getUserById } from "./data/user";
import { getAccountByUserId } from "./data/account";

const prisma = db;

export const { handlers, auth, signIn, signOut } = NextAuth({
  pages: {
    signIn: "/login",
    error: "error",
  },
  events: {
    async linkAccount({ user }) {
      await db.user.update({
        where: { id: user.id },
        data: {
          emailVerified: new Date(),
        },
      });
    },
  },

  callbacks: {
    async signIn({ user, account }) {
      if (account?.provider !== "credentials") {
        return true;
      }

      if (!user.phoneNumberVerified || !user.emailVerified) {
        return false;
      }

      return true;
    },
    async session({ session, token }) {
      if (token?.id && session?.user) {
        session.user.id = token.id as string;
        session.user.phoneNumberVerified =
          token.phoneNumberVerified as Date | null;
        session.user.phonenumber = token.phonenumber as string;
        session.user.emailVerified = token.emailVerified as Date | null;
        session.user.role = token.role as "USER" | "ADMIN";
        session.user.name = token.name as string;
        session.user.email = token.email as string;
        session.user.isTwoFactorEnabled = token.isTwoFactorEnabled as boolean;
        session.user.isOAuth = token.isOAuth as boolean;
        session.user.image = token.image as string;
        session.user.stores = token.stores as { id: string; name: string }[];
      }

      return session;
    },

    jwt: async ({ token }) => {
      if (!token.sub) return token;
      const existingUser = await getUserById(token.sub);

      if (!existingUser) return token;

      const existingAccount = await getAccountByUserId(existingUser.id);
      const userStores = await db.store.findMany({
        where: { userId: existingUser.id },
        select: { id: true, name: true },
      });

      token.isOAuth = !!existingAccount;
      token.name = existingUser.name;
      token.email = existingUser.email;
      token.id = existingUser.id;
      token.phonenumber = existingUser.phonenumber;
      token.phoneNumberVerified = existingUser.phoneNumberVerified;
      token.emailVerified = existingUser.emailVerified;
      token.role = existingUser.role;
      token.isTwoFactorEnabled = existingUser.isTwoFactorEnabled;
      token.image = existingUser.image;
      token.stores = userStores;

      return token;
    },
  },
  adapter: PrismaAdapter(prisma),
  secret: process.env.NEXTAUTH_SECRET,
  session: { strategy: "jwt" },

  ...authConfig,
});
