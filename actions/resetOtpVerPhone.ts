"use server";
import { z } from "zod";
import { getUserByPhoneNumber } from "@/data/user";
import { PhoneResetPassSchema } from "@/schemas";
import { getResetPasswordTokenByTokenPhone } from "@/data/password-reset-token";

export const resetOtpVerPhone = async (
    values: z.infer<typeof PhoneResetPassSchema>
) => {
  const parsedValues = PhoneResetPassSchema.safeParse(values);
  if (!parsedValues.success) {
    return { error: "Invalid input data. Please enter a valid phone number and OTP." };
  }

  const { phonenumber, phonenumberotp } = parsedValues.data;

  const storedToken = await getResetPasswordTokenByTokenPhone(phonenumber);
  if (!storedToken) {
    return { error: "No OTP found. Please request a new one." };
  }

  const isExpired = new Date(storedToken.expires) < new Date();
  if (isExpired) {
    return { error: "The OTP has expired. Please request a new one." };
  }

  if (storedToken.token !== phonenumberotp) {
    return { error: "The provided OTP is incorrect. Please try again." };
  }



  const user = await getUserByPhoneNumber(phonenumber);
  if (!user) {
    return { error: "User not found. Please restart verification." };
  }



  return { success: "Verified successfully!" };
};