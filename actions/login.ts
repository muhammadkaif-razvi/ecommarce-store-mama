"use server";
import * as z from "zod";
import { LoginSchema } from "@/schemas";
import {  signIn } from "@/auth";
import { AuthError } from "next-auth";
import { generateTwoFactorToken } from "@/lib/tokens";
import { sendTwoFactorTokenEmail } from "@/lib/mail";
import { getTwoFactorTokenbyEmail } from "@/data/two-factor-token";
import { db } from "@/lib/db";
import { getTwoFactorConfirmationbyUserId } from "@/data/two-factor-confirmation";
import bcrypt from "bcryptjs";
import { DEFAULT_REDIRECT_URL } from "@/routes";
import { getUserByEmailOrPhone } from "@/data/user";

export const login = async (
  values: z.infer<typeof LoginSchema>,
  callbackUrl?: string | null,
) => {
  const validatedFields = LoginSchema.safeParse(values);

  if (!validatedFields.success) {
    return { error: "Invalid fields!" };
  }

  const { emailOrPhone, password, code } = validatedFields.data;

  const existingUser = await getUserByEmailOrPhone(emailOrPhone);

  if (!existingUser) {
    return { error: "User not found!" };
  }
  if (!existingUser.emailVerified) {
    return { error: "Email is not verified" };
  }
  if (!existingUser.phoneNumberVerified) {
    return { error: "Phone Number is not verified" };
  }
  if (!existingUser.password) {
    return { error: "This email is used with Google or Github" };
  }
  const isPasswordCorrect = await bcrypt.compare(
    password,
    existingUser.password
  );
  if (!isPasswordCorrect) return { error: "Password Not Match!" };

  if (existingUser.isTwoFactorEnabled && existingUser.email) {
    if (code) {
      const twoFactorToken = await getTwoFactorTokenbyEmail(existingUser.email);
      if (!twoFactorToken || twoFactorToken.token !== code) {
        return { error: "Invalid code!" };
      }
      if (twoFactorToken.expires < new Date()) {
        return { error: "Code expired!" };
      }

      await db.twoFactorToken.delete({ where: { id: twoFactorToken.id } });

      const existingConfirmation = await getTwoFactorConfirmationbyUserId(
        existingUser.id
      );
      if (existingConfirmation) {
        await db.twoFactorConfirmation.delete({
          where: { id: existingConfirmation.id },
        });
      }

      await db.twoFactorConfirmation.create({
        data: { userId: existingUser.id },
      });
    } else {
      const twoFactorToken = await generateTwoFactorToken(existingUser.email);
      await sendTwoFactorTokenEmail(existingUser.email, twoFactorToken.token);
      return { twoFactor: true };
    }
  }

  try {
    await signIn("credentials", {
      emailOrPhone: existingUser.email || existingUser.phonenumber,
      password,
      redirectTo:  callbackUrl || DEFAULT_REDIRECT_URL,
    });

    return { success: " Logging in shortly..."  };
  } catch (error) {
    if (error instanceof AuthError) {
      switch (error.type) {
        case "CredentialsSignin":
          return { error: "Invalid credentials!" };
        default:
          return { error: "Something went wrong!" };
      }
    }
    throw error;
  }
};
