"use server";
import { z } from "zod";
import { getUserByEmailOrPhone } from "@/data/user";
import { ResetPasswordEnterSchema } from "@/schemas";
import {
  generatePasswordResetTokenByEmail,
  generateResetPasswordTokenByPhoneNumber,
} from "@/lib/tokens";
import { sendResetPasswordEmail } from "@/lib/mail";
 import { sendResetPasswordSMS } from "@/lib/SMS";

export const resetPasswordEnter = async (
  values: z.infer<typeof ResetPasswordEnterSchema>
) => {
  const validatedFields = ResetPasswordEnterSchema.safeParse(values);

  if (!validatedFields.success) {
    return { error: "Invalid Email or Phone Number!" };
  }
  const { emailOrPhone } = validatedFields.data;

  const existingUser = await getUserByEmailOrPhone(emailOrPhone);

  if (!existingUser) {
    return { error: "User not found Please register first" };
  }
  if (!existingUser.emailVerified) {
    return { error: " Email not found " };
  }
  if (!existingUser.phoneNumberVerified) {
    return { error: "Phone Number not found " };
  }
  if (!existingUser.password) {
    return { error: "Email is used with different provider" };
  }

  if (emailOrPhone.includes("@")) {
    const passwordResetToken = await generatePasswordResetTokenByEmail(
      emailOrPhone
    );
    await sendResetPasswordEmail(
      passwordResetToken.email,
      passwordResetToken.token
    );
    return { success: "Password reset link sent to email" };
  } else {
    const passwordResetToken = await generateResetPasswordTokenByPhoneNumber(
      emailOrPhone
    );
    await sendResetPasswordSMS(
      passwordResetToken.phonenumber,
      passwordResetToken.token,
      
    );
   

    return { success: "OTP sent to phone number" };
  }
};
