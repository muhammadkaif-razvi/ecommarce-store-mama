import { create } from "zustand"
import { persist, createJSONStorage } from "zustand/middleware"
import { toast } from 'sonner'; // Import toast

export interface CartItem {
  id: string // variant id
  productId: string
  name: string
  price: number
  variantName: string
  variantQuantity: string
  image: string
  quantity: number
}

interface CartStore {
  items: CartItem[]
  addItem: (item: CartItem) => void
  removeItem: (id: string) => void
  updateQuantity: (id: string, quantity: number) => void
  clearCart: () => void
}

export const useCartStore = create<CartStore>()(
  persist(
    (set, get) => ({
      items: [],

      addItem: (item) => {
        const existingItem = get().items.find((i) => i.id === item.id);

        if (existingItem) {
          // Update quantity if item already exists
          set((state) => ({
            items: state.items.map((i) =>
              i.id === item.id ? { ...i, quantity: i.quantity + item.quantity } : i
            ),
          }));
          toast.success(`${item.name} quantity updated in cart!`); // Show toast
        } else {
          // Add new item
          set((state) => ({ items: [...state.items, item] }));
          toast.success(`${item.name} added to cart!`); // Show toast
        }
      },

      removeItem: (id) => {
        set((state) => ({
          items: state.items.filter((item) => item.id !== id),
        }));
        toast.error(`Item removed from cart!`); // Show toast
      },

      updateQuantity: (id, quantity) => {
        set((state) => ({
          items: state.items.map((item) =>
            item.id === id ? { ...item, quantity } : item
          ),
        }));
      },

      clearCart: () => {
        set({ items: [] });
        toast.success('Cart cleared!');
      },
    }),
    {
      name: "cart-storage", // name for the storage key
      storage: createJSONStorage(() => localStorage),
      version: 1, // Add version number
      migrate: (persistedState: any, version) => {
        if (version === 0) {
          // If needed, transform the old state shape to the new one
          return { items: [] }
        }
        return persistedState as CartStore
      },
    },
  ),
)
