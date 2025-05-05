import { create } from "zustand"
import { persist, createJSONStorage } from "zustand/middleware"

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
    (set) => ({
      items: [],

      addItem: (item) =>
        set((state) => {
          const existingItem = state.items.find((i) => i.id === item.id)

          if (existingItem) {
            // Update quantity if item already exists
            return {
              items: state.items.map((i) => (i.id === item.id ? { ...i, quantity: i.quantity + item.quantity } : i)),
            }
          }

          // Add new item
          return { items: [...state.items, item] }
        }),

      removeItem: (id) =>
        set((state) => ({
          items: state.items.filter((item) => item.id !== id),
        })),

      updateQuantity: (id, quantity) =>
        set((state) => ({
          items: state.items.map((item) => (item.id === id ? { ...item, quantity } : item)),
        })),

      clearCart: () => set({ items: [] }),
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
