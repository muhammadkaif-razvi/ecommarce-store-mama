"use server";

import * as z from "zod";
import bcrypt from "bcryptjs";
import { db } from "@/lib/db";
import { signIn } from "@/auth";
import { AuthError } from "next-auth";

import { NewPasswordSchema } from "@/schemas";
import { getUserByPhoneNumber } from "@/data/user";
import { DEFAULT_REDIRECT_URL } from "@/routes";


export async function newPasswordPhone(
  values: z.infer<typeof NewPasswordSchema>,
  phonenumber: string
) {
  try {
    if (!phonenumber) {
      return { error: "Phone number is missing" };
    }

    if (!values || !values.password || !values.confirmPassword) {
      return { error: "Invalid input data" };
    }

    const { password, confirmPassword } = values;

    if (password !== confirmPassword) {
      return { error: "Passwords do not match" };
    }

    const validatedFields = NewPasswordSchema.safeParse(values);
    if (!validatedFields.success) {
      return { error: "Invalid fields" };
    }

    const existingUser = await getUserByPhoneNumber(phonenumber);

    if (!existingUser) {
      return { error: "User not found" };
    }
    if (!existingUser.phoneNumberVerified) {
      return { error: "Phone number not verified" };
    }
    if (!existingUser.email) {
      return { error: "User email not found" };
    }

    const hashedPassword = await bcrypt.hash(password, 10);
    await db.user.update({
      where: { id: existingUser.id },
      data: { password: hashedPassword },
    });



    await signIn("credentials", {
      emailOrPhone: existingUser.email,
      password,
      redirectTo: DEFAULT_REDIRECT_URL,
    });

    return { success: "Password reset successfully! Logging in shortly..." };
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
}
