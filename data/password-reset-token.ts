export const runtime = "nodejs"; 

import { db } from "@/lib/db";

export const getPasswordResetTokenByTokenEmail = async (token: string) => {
  try {
    const PasswordResetToken = await db.resetPasswordEmailToken.findUnique({
      where: { token },
    });
    return PasswordResetToken;
  } catch {
    return null;
  }
};

export const getResetPasswordTokenByTokenPhone = async (phonenumber: string) => {
  try {
    const resetPasswordToken = await db.resetPasswordPhoneToken.findFirst({
      where: { phonenumber },
      orderBy: { expires: "desc" }, // Get the latest OTP if multiple exist
    });
    return resetPasswordToken;
  } catch {
    return null;
  }
};
