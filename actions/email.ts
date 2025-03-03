"use server";
import { getUserByEmail } from "@/data/user";
import { db } from "@/lib/db";
import { sendEmailOTP } from "@/lib/mail";
import { generateVerificationOtp } from "@/lib/tokens";
import { Step1Schema } from "@/schemas";
import { z } from "zod";

export const initiateEmailVerificationStep = async (
  values: z.infer<typeof Step1Schema>
) => {
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

  // Check if the user already exists
  let existingUser = await getUserByEmail(normalizedEmail);

  if (existingUser) {

    // Update the user's name if it has changed
    if (existingUser.name !== normalizedName) {
      await db.user.update({
        where: { email: normalizedEmail },
        data: { name: normalizedName },
      });
    }

    // If the user is fully verified, prevent further OTP generation
    if (existingUser.emailVerified && existingUser.password) {
      return { error: "Email already exists and is fully verified!" };
    }

    
      
    

      const verificationToken = await generateVerificationOtp(normalizedEmail);
      await sendEmailOTP(normalizedEmail, verificationToken.token);
      return { success: "OTP resent. Please check your inbox." };
    
  }

  // If the user does not exist, create a new user
  try {
    existingUser = await db.user.create({
      data: {
        name: normalizedName, // Store trimmed name
        email: normalizedEmail,
        phonenumber: null,
        emailVerified: null,
        phoneNumberVerified: null,
        password: null, // Ensure password is null for new users
      },
    });
  } catch (error) {
    console.error("Error creating user:", error);
    return { error: "Could not create user. Please try again." };
  }

  // Generate and send OTP for email verification
  const verificationToken = await generateVerificationOtp(normalizedEmail);
  await sendEmailOTP(normalizedEmail, verificationToken.token);

  return {
    success: "OTP sent. Please check your inbox.",
  };
};