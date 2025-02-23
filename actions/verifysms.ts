"use server";
import { z } from "zod";
import { db } from "@/lib/db";
import { getVerificationTokenByPhoneNumber } from "@/data/verificiation-tokens";
import { getUserByPhoneNumber } from "@/data/user";
import { Step4Schema } from "@/schemas";

export const verifyPhoneOTPStep = async (
  values: z.infer<typeof Step4Schema>
) => {
  const parsedValues = Step4Schema.safeParse(values);
  if (!parsedValues.success) {
    return { error: "Invalid input data. Please enter a valid phone number and OTP." };
  }

  const { phonenumber, phonenumberotp } = parsedValues.data;

  // ✅ Fetch stored OTP
  const storedToken = await getVerificationTokenByPhoneNumber(phonenumber);
  if (!storedToken) {
    return { error: "No OTP found. Please request a new one." };
  }

  // ✅ Check OTP expiration
  const isExpired = new Date(storedToken.expires) < new Date();
  if (isExpired) {
    return { error: "The OTP has expired. Please request a new one." };
  }

  // ✅ Verify OTP
  if (storedToken.token !== phonenumberotp) {
    return { error: "The provided OTP is incorrect. Please try again." };
  }

  // ✅ Delete OTP after successful verification
  await db.phoneNumberVerificationToken.delete({
    where: { id: storedToken.id },
  });

  // ✅ Fetch user
  const user = await getUserByPhoneNumber(phonenumber);
  if (!user) {
    return { error: "User not found. Please restart verification." };
  }

  // ✅ Update user phone verification status
  await db.user.update({
    where: { id: user.id }, // Ensuring correct update by user ID
    data: { phoneNumberVerified: new Date() },
  });

  return { success: "✅ Phone number verified successfully!" };
};
