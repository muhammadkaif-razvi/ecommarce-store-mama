import { auth } from "@/auth";

export const currentUser = async () => {
  const session = await auth();
  
  if (!session?.user) return null;

  return {
    id: session.user.id ?? "", // Ensure id is always a string
    email: session.user.email ?? "N/A",
    role: session.user.role ?? "N/A",
    phonenumber: session.user.phonenumber ?? "N/A",
    isTwoFactorEnabled: session.user.isTwoFactorEnabled ?? false,
    phoneNumberVerified: session.user.phoneNumberVerified ?? null,
    emailVerified: session.user.emailVerified ?? null,
    name: session.user.name ?? "N/A",
  };
};
