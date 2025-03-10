import { auth } from "@/auth";
import { ExtendedUser } from "@/type.d"; // Ensure this type is defined

interface Store {
  id: string;
  name: string;
}

export const currentUser = async (): Promise<ExtendedUser | null> => {
  try {
    const session = await auth();
    return session?.user ?? null;
  } catch (error) {
    console.error("Error fetching current user:", error);
    return null;
  }
};
