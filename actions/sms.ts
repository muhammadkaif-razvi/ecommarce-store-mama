"use server";
import { z } from "zod";
import { sendVerificationSMS } from "@/lib/SMS";
import { generateVerificationTokenByPhoneNumber } from "@/lib/tokens";
import { Step3Schema } from "@/schemas";
import { db } from "@/lib/db";
import { getUserByPhoneNumber, getUserByEmail } from "@/data/user";

export const initiatePhoneVerificationStep = async (
  values: z.infer<typeof Step3Schema>,
  email: string
) => {
  if (!values) return { error: "Invalid input data" };

  const validatedFields = Step3Schema.safeParse(values);
  if (!validatedFields.success) return { error: "Invalid phone number" };

  const { phonenumber } = validatedFields.data;

  let user = await getUserByPhoneNumber(phonenumber);

  if (user && user.phoneNumberVerified) {
    return { error: "This phone number is already verified. Use another number." };
  }

  if (!user && email) {
    user = await getUserByEmail(email);
  }

  if (!user) {
    return { error: "User not found! Please verify your email first." };
  }

  if (!user.emailVerified) {
    return { error: "Please verify your email first." };
  }

  if (user.phonenumber !== phonenumber) {
    await db.user.update({
      where: { id: user.id },
      data: { phonenumber, phoneNumberVerified: null },
    });

    user.phonenumber = phonenumber; 
  }

  const phoneToken = await generateVerificationTokenByPhoneNumber(phonenumber);
  await sendVerificationSMS(phonenumber, phoneToken.token);
  return {
     success: "Phone OTP sent. Please check your messages." ,otp:phoneToken.token };
};
