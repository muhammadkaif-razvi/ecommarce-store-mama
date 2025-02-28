"use server";

import * as z from "zod";
import { db } from "@/lib/db";

import { settingsSchema } from "@/schemas";
import { getUserByEmail, getUserById } from "@/data/user";
import { currentUser } from "@/lib/auth";
// import {
//   generateEmailVerificationToken,
// } from "@/lib/tokens";
// import { sendVerificationEmail } from "@/lib/mail";
import bcrypt from "bcryptjs";

export const settings = async (values: z.infer<typeof settingsSchema>) => {
  const user = await currentUser();
  if (!user) {
    return { error: "You must be logged in to update settings" };
  }

  const dbUser = await getUserById(user.id);
  if (!dbUser) {
    return { error: "User not found" };
  }
  if (user.isOAuth) {
    values.email = undefined;
    values.password = undefined;
    values.newPassword = undefined;
    values.isTwoFactorEnabled = undefined;
  }
  // if (values.email && values.email !== dbUser.email) {
  //   const existingUser = await getUserByEmail(values.email);

  //   if (existingUser && existingUser.id !== user.id) {
  //     return { error: "Email already in use" };
  //   }

  //   const verificationToken = await generateEmailVerificationToken(
  //     values.email
  //   );
  //   await sendVerificationEmail(
  //     verificationToken.email,
  //     verificationToken.token,
  //   );
  //   return { success: "Verification eamil send" };
  // }

  if (values.password && values.newPassword && dbUser.password) {
    const passwordsMatch = await bcrypt.compare(
      values.password,
      dbUser.password
    );
    if (!passwordsMatch) {
      return { error: "Current password is incorrect" };
    }
    const hashedPassword = await bcrypt.hash(values.newPassword, 10);
    values.password = hashedPassword;
    values.newPassword =undefined;
  }

   await db.user.update({
    where: { id: user.id },
    data: {
      ...values,
    },
  });

 

  return { success: "Settings updated successfully" };
};
