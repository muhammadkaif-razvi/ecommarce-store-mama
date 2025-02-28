"use server"
import { Resend } from "resend";

const resend = new Resend(process.env.RESEND_API_KEY);
const domain = process.env.NEXT_PUBLIC_URL;


export const sendEmailOTP = async (
  email: string,
  token: string,
) => {
  await resend.emails.send({
    from: "onboarding@resend.dev",
    to: email,
    subject: "Verification Email",
    html: `<p>Your one time OTP is ${token}.</p>`,
  });
  console.log(`Email sent to ${email} with OTP: ${token}`);
};

export const sendTwoFactorTokenEmail = async (
  email: string,
  token: string,
) => {
  await resend.emails.send({
    from: "onboarding@resend.dev",
    to: email,
    subject: "Two Factor Authentication",
    html: `<p>Your two factor authentication token is ${token}.</p>`,


  });
  console.log(`Email sent to ${email} with OTP: ${token}`);

};

export const sendResetPasswordEmail = async (
  email: string,
  token: string,
) => {
  const resetPasswordLink = `${domain}/new-password?token=${token}`;
  await resend.emails.send({
    from: "onboarding@resend.dev",
    to: email,
    subject: "Reset Password",
    html: `<p>Hello user,</p>
    <p>You are receiving this email because you (or someone else) have requested the reset of your password.</p>
    <p>Please click the link below to reset your password:</p>
    <a href="${resetPasswordLink}">Reset Password</a>
    <p>If you did not request this, please ignore this email.</p>
    <p>Best regards,</p>
    `,
  });
  console.log(`Email sent to ${email} with reset password link: ${resetPasswordLink}`);
};


