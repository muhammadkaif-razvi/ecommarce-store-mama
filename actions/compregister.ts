"use server";
import { db } from "@/lib/db";
import { z } from "zod";
import bcrypt from "bcrypt";
import { Step5Schema } from "@/schemas";
import { getUserByEmail, getUserByPhoneNumber } from "@/data/user";
import { signIn } from "@/auth";
import { DEFAULT_REDIRECT_URL } from "@/routes";
import { AuthError } from "next-auth";

export const completeRegistration = async (
  values: z.infer<typeof Step5Schema>,
  name: string,
  email: string,
  phonenumber: string
) => {
  try {
    if (!values) return { error: "Invalid input data" };

    const validatedFields = Step5Schema.safeParse(values);
    if (!validatedFields.success) return { error: "Invalid password format" };

    const { password } = validatedFields.data;

    let user = await getUserByEmail(email);

    if (!user) {
      user = await getUserByPhoneNumber(phonenumber);
    }
    if (!user) {
      return {
        error: "User not found! Please complete email verification first.",
      };
    }

    const hashedPassword = await bcrypt.hash(password, 12);

    await db.user.update({
      where: { id: user.id },
      data: {
        
        phonenumber,
        password: hashedPassword,
      },
    });


      await signIn("credentials", {
        emailOrPhone: email,
        password,
        redirectTo: DEFAULT_REDIRECT_URL,
      });
    return { success: "Registration successful! logging you in..." };
  } catch (error) {
    if (error instanceof AuthError) {
      switch (error.type) {
        case "CredentialsSignin":
          return { error: "Invalid credentials!" };
        // default:
        //   return { error: "Something went wrong!" };
      }
    }
    throw error;
  }
};
