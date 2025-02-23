import NextAuth from "next-auth";
import { authConfig } from "@/auth.config";
import { db } from "@/lib/db";
import { PrismaAdapter } from "@auth/prisma-adapter";
import { getUserById } from "./data/user";

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
    session: async ({ session, token, user }) => {
      if (token?.id && session?.user) {
        session.user.id = token.id as string;
      }
      if (token?.phoneNumberVerified && session?.user) {
        session.user.phoneNumberVerified =
          token.phoneNumberVerified as Date | null;
      }
      if (token?.phonenumber && session?.user) {
        session.user.phonenumber = token.phonenumber as string;
      }
      if (token?.emailVerified && session?.user) {
        session.user.emailVerified = token.emailVerified as Date | null;
      }
      if (token?.role && session?.user) {
        session.user.role = token.role as "USER" | "ADMIN";
      }
      if (session?.user) {
        session.user.name = token.name as string;
        session.user.email = token.email as string;}

      return session;
    },
    jwt: async ({ token }) => {
      if (!token.sub) return token;
      const existingUser = await getUserById(token.sub);

      if (!existingUser) return token;
      token.name = existingUser.name;
      token.email = existingUser.email;
      token.id = existingUser.id;
      token.phonenumber = existingUser.phonenumber;
      token.phoneNumberVerified = existingUser.phoneNumberVerified;
      token.emailVerified = existingUser.emailVerified;
      token.role = existingUser.role;

      return token;
    },
  },
  adapter: PrismaAdapter(prisma),
  secret: process.env.NEXTAUTH_SECRET,
  session: { strategy: "jwt" },

  ...authConfig,
});
