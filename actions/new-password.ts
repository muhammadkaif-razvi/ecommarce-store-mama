"use server";
import * as z from "zod";
import { NewPasswordSchema } from "@/schemas";
import { db } from "@/lib/db";
import { getPasswordResetTokenByTokenEmail } from "@/data/password-reset-token";
import bcrypt from "bcryptjs";
import { getUserByEmail } from "@/data/user";
import { signIn } from "@/auth";
import { DEFAULT_REDIRECT_URL } from "@/routes";
import { AuthError } from "next-auth";

export async function newPassword(
  values: z.infer<typeof NewPasswordSchema>,
  token: string | null
) {
  try {
    const { password, confirmPassword } = values;

    if (password !== confirmPassword) {
      return { error: "Passwords do not match" };
    }

    if (!token) {
      return { error: "Invalid token" };
    }
    const validatedFields = NewPasswordSchema.safeParse(values);
    if (!validatedFields.success) {
      return { error: "Invalid fields" };
    }

    const existingToken = await getPasswordResetTokenByTokenEmail(token);

    if (!existingToken) {
      return { error: "Invalid token" };
    }

    const hasExpired = new Date(existingToken.expires) < new Date();

    if (hasExpired) {
      return { error: "Token has expired" };
    }
    const existingUser = await getUserByEmail(existingToken.email);

    if (!existingUser) {
      return { error: " Email not found" };
    }

    const hashedPassword = await bcrypt.hash(password, 10);
    await db.user.update({
      where: { id: existingUser.id },
      data: { password: hashedPassword },
    });

    await db.resetPasswordEmailToken.delete({
      where: { id: existingToken.id },
    });


      await signIn("credentials", {
        emailOrPhone: existingToken.email,
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