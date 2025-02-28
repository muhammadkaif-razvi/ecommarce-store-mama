
import { getVerificationOtpByEmail,  getVerificationTokenByPhoneNumber } from "@/data/verificiation-tokens";
import { db } from "@/lib/db";
import crypto from "crypto";
import { getTwoFactorTokenbyEmail } from "@/data/two-factor-token";
import { getPasswordResetTokenByTokenEmail, getResetPasswordTokenByTokenPhone } from "@/data/password-reset-token";


// console.log("DB Models:", Object.keys(db)); 
export const generatePasswordResetTokenByEmail = async (email: string) => {

  const token = crypto.randomBytes(32).toString("hex");
  const expires = new Date(Date.now() + 15 * 60 * 1000); // 15 minutes expiry

  const existingToken = await getPasswordResetTokenByTokenEmail(email);
      if (existingToken) {
    await db.resetPasswordEmailToken.delete({
      where: { id: existingToken.id },
    });
  }

  const passwordResetToken = await db.resetPasswordEmailToken.create({
    data: { token, email, expires },
  });
  return passwordResetToken;
}



// Generate reset password token for phone.
export const generateResetPasswordTokenByPhoneNumber = async (
  phonenumber: string
) => {
  const token = crypto.randomInt(100_000, 1_000_000).toString();
  const expires = new Date(new Date().getTime() + 10 * 60 * 1000);


  const existingToken = await getResetPasswordTokenByTokenPhone(token);
  if (existingToken) {
    await db.resetPasswordPhoneToken.delete({
      where: { id: existingToken.id },
    });
  }
  const resetPasswordToken = await db.resetPasswordPhoneToken.create({
    data: { token, phonenumber, expires },
  });
  return resetPasswordToken;  
};



export const generateVerificationOtp = async (email: string) => {
  const normalizedEmail = email.trim().toLowerCase(); // Normalize email

  const token = Math.floor(100000 + Math.random() * 900000).toString();
  const expires = new Date(Date.now() + 15 * 60 * 1000); // 15 minutes expiry

  const existingToken = await getVerificationOtpByEmail(normalizedEmail);

  // If an existing token is present, delete it
  if (existingToken) {
    await db.emailVerificationToken.delete({
      where: { id: existingToken.id },
    });
  }

  // Store new OTP in the database
  const verificationToken = await db.emailVerificationToken.create({
    data: { token, email: normalizedEmail, expires },
  });


  return verificationToken;
};




// Generate verification token for phone.
export const generateVerificationTokenByPhoneNumber = async (
  phonenumber: string
) => {
  const token = crypto.randomInt(100_000, 1_000_000).toString();
  const expires = new Date(new Date().getTime() + 10 * 60 * 1000);


  const existingToken = await getVerificationTokenByPhoneNumber(phonenumber);

  if (existingToken) {
    await db.phoneNumberVerificationToken.delete({
      where: { id: existingToken.id },
    });
  }
  const verificationotpToken = await db.phoneNumberVerificationToken.create({
    data: { token, phonenumber, expires },
  });
  return verificationotpToken;  

};



export const generateTwoFactorToken = async (email: string) => {
  const token = crypto.randomInt(100_000, 1_000_000).toString();
  const expires = new Date(new Date().getTime() + 5 * 60 * 1000);

  const existingToken = await getTwoFactorTokenbyEmail(email);

  if (existingToken) {
    await db.twoFactorToken.delete({
      where: { id: existingToken.id },
    });
  }

  const twoFactorToken = await db.twoFactorToken.create({
    data: { token, email, expires },
  });
  return twoFactorToken;
};