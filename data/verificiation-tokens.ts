export const runtime = "nodejs"; 


import { db } from "@/lib/db";




export const getVerificationEmailTokenByToken = async (token: string) => {
  try {
    const verificationToken = await db.emailVerificationToken.findUnique({
      where: {
        token,
        expires : { gt: new Date() },
      },
    });
    return verificationToken;
  } catch {
    return null;
  }
};




export const getVerificationOtpByEmail = async (email: string) => {
  try {
    const verificationToken = await db.emailVerificationToken.findFirst({
      where: {
        email: email.trim().toLowerCase(), // Normalize email
        expires: { gt: new Date() }, // Ensure OTP is not expired
      },
    });
    return verificationToken;
  } catch (error) {
    return null;
  }
};



export const getVerificationTokenByPhoneNumber = async (phonenumber: string) => {
  try {
    const verificationToken = await db.phoneNumberVerificationToken.findUnique({
      where: {

          phonenumber,


      },
    });
    return verificationToken;
  } catch {
    return null;
  }
};
