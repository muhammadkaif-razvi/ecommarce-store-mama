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

export const getStoreById = async (storeId: string): Promise<Store | null> => {
  const user = await currentUser();

  if (!user || !user.stores) return null;

  return user.stores.find((store: Store) => store.id === storeId) || null;
};
