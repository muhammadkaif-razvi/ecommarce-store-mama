"use server";
import { getUserByEmail } from "@/data/user";
import { db } from "@/lib/db";
import { sendEmailOTP } from "@/lib/mail";
import { generateVerificationOtp } from "@/lib/tokens";
import { Step1Schema } from "@/schemas";
import { z } from "zod";

export const initiateEmailVerificationStep = async (values: z.infer<typeof Step1Schema>) => {
  if (!values) return { error: "Invalid input data" };

  const validatedFields = Step1Schema.safeParse(values);
  if (!validatedFields.success) return { error: "Invalid fields" };

  const { email, name } = validatedFields.data;

  // Ensure name is a valid string
  if (!name || typeof name !== "string") {
    return { error: "Invalid name provided" };
  }

  const normalizedEmail = email.trim().toLowerCase();
  const normalizedName = name.trim(); // Ensure name is trimmed

  let existingUser = await getUserByEmail(normalizedEmail);

  if (existingUser) {
    await db.user.update({
      where: { email: normalizedEmail },
      data: { name: normalizedName },
    });

    if (existingUser.emailVerified && !existingUser.phoneNumberVerified) {
      return { phoneNotVerified: true, email: normalizedEmail };
    }

    if (existingUser.emailVerified) {
      return { error: "Email already exists and is verified!" };
    }

    // ✅ Continue OTP process
    const verificationToken = await generateVerificationOtp(normalizedEmail);
    await sendEmailOTP(normalizedEmail, verificationToken.token);
    return { success: "OTP resent. Please check your inbox." };
  }

  try {
    existingUser = await db.user.create({
      data: {
        name: normalizedName, // Store trimmed name
        email: normalizedEmail,
        phonenumber: null,
        emailVerified: null,
        phoneNumberVerified: null,
      },
    });
  } catch (error) {
    console.error("DB Error:", error);
    return { error: "Could not create user. Please try again." };
  }

  // Send OTP
  const verificationToken = await generateVerificationOtp(normalizedEmail);
  await sendEmailOTP(normalizedEmail, verificationToken.token);
  return { success: "OTP sent. Please check your inbox." };
};
