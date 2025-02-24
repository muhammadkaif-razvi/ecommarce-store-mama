"use server";
export const runtime = "nodejs";
import { getUserByEmail } from "@/data/user";
import { getVerificationOtpByEmail } from "@/data/verificiation-tokens";
import { db } from "@/lib/db";
import { Step2Schema } from "@/schemas";
import { z } from "zod";

export const verifyEmailOTPStep = async (values: z.infer<typeof Step2Schema>) => {
  if (!values) return { error: "Invalid input data" };

  const validatedFields = Step2Schema.safeParse(values);
  if (!validatedFields.success) return { error: "Invalid OTP format" };

  const { email, otp } = validatedFields.data;

  // Get user by email
  const normalizedEmail = email.trim().toLowerCase();
  const existingUser = await getUserByEmail(normalizedEmail);

  if (!existingUser) return { error: "User not found! Please restart verification." };

  // Get OTP token from the database
  const verificationToken = await getVerificationOtpByEmail(normalizedEmail);
  if (!verificationToken) return { error: "OTP not found! Please request a new OTP." };


  // Check if OTP is expired
  const hasExpired = new Date(verificationToken.expires) < new Date();
  if (hasExpired) return { error: "OTP has expired! Please request a new one." };


  // Check if OTP matches
  if (verificationToken.token !== otp) return { error: "Incorrect OTP!" };

  // Delete OTP from the database after successful verification
  await db.emailVerificationToken.delete({
    where: { id: verificationToken.id },
  });

  // Update user's emailVerified field
  await db.user.update({
    where: { email: normalizedEmail },
    data: { emailVerified: new Date() },
  });

  return { success: "✅ Email verified successfully." };
};

