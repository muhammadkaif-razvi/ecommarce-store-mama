import Credentials from "next-auth/providers/credentials";
import Google from "next-auth/providers/google";
import GitHub from "next-auth/providers/github";
import { NextAuthConfig } from "next-auth";
import bcrypt from "bcryptjs";
import { LoginSchema } from "@/schemas";
import { getUserByEmailOrPhone, getUserByPhoneNumber } from "@/data/user";

export const authConfig: NextAuthConfig = {
  providers: [
    Google({ 
      clientId: process.env.GOOGLE_CLIENT_ID!, 
      clientSecret: process.env.GOOGLE_CLIENT_SECRET! 
    }),
    GitHub({ 
      clientId: process.env.GITHUB_CLIENT_ID!, 
      clientSecret: process.env.GITHUB_CLIENT_SECRET! 
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
          
          if (!user?.emailVerified || !user?.phoneNumberVerified  || !user.password) return null;

          const passwordMatch = await bcrypt.compare(password, user.password);

          if (passwordMatch) return user;
        }

        return null;
      },
    
    }),
    
  ],
} satisfies NextAuthConfig;
