"use server";
export const runtime = "nodejs"; 

import { db } from "@/lib/db";


export const getUserByEmail = async (email: string) => {
  try {
    return await db.user.findUnique({
      where: { email: email.trim().toLowerCase() }, // Normalize email
    });
  } catch (error) {
    return null;
  }
};


export const getUserByPhoneNumber = async (phonenumber: string) => {
  try {
    return await db.user.findUnique({
      where: { phonenumber },
    });
  } catch (error) {
    return null;
  }
};





export const getUserById = async (id: string) => {
  try {
    const user = await db.user.findUnique({
      where: {
        id,
      },
    });
    return user;
  } catch {
    return null;
  }
};

export async function getUserByEmailOrPhone(emailOrPhone: string) {
  return await db.user.findFirst({
    where: {
      OR: [{ email: emailOrPhone }, { phonenumber: emailOrPhone }],
    },
   
  });
} 

