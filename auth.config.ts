import Credentials from "next-auth/providers/credentials";
import Google from "next-auth/providers/google";
import GitHub from "next-auth/providers/github";
import { NextAuthConfig, User } from "next-auth";
import { LoginSchema } from "@/schemas";
import { getUserByEmailOrPhone } from "@/data/user";
import bcrypt from "bcryptjs";

export const authConfig: NextAuthConfig = {
  providers: [
    Google({
      clientId: process.env.GOOGLE_CLIENT_ID!,
      clientSecret: process.env.GOOGLE_CLIENT_SECRET!,
    }),
    GitHub({
      clientId: process.env.GITHUB_CLIENT_ID!,
      clientSecret: process.env.GITHUB_CLIENT_SECRET!,
    }),
    Credentials({
      credentials: {
        emailOrPhone: {},
        password: {},
      },
      async authorize(credentials) {
        const validatedFields = LoginSchema.safeParse(credentials);

        if (validatedFields.success) {
          const { emailOrPhone, password } = validatedFields.data as {
            emailOrPhone: string;
            password: string;
          };

          const user = await getUserByEmailOrPhone(emailOrPhone);

          if (
            !user?.emailVerified ||
            !user?.phoneNumberVerified ||
            !user.password
          )
            return null;
          const passwordMatch = await bcrypt.compare(password, user.password);

          if (passwordMatch) {
            return {
              id: user.id,
              name: user.name ?? undefined,
              email: user.email,
              image: user.image,
              phonenumber: user.phonenumber ?? undefined,
              emailVerified: user.emailVerified,
              phoneNumberVerified: user.phoneNumberVerified,
              role: user.role,
              isTwoFactorEnabled: user.isTwoFactorEnabled,
            };
          }
        }

        return null;
      },
    }),
  ],
} satisfies NextAuthConfig;
