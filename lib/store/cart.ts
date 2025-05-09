import { create } from "zustand";
import { toast } from "sonner";

export interface CartItem {
  id: string; // Variant ID
  productId: string;
  name: string;
  price: number;
  variantName?: string;
  variantQuantity?: string;
  image?: string;
  quantity: number;
}

interface CartState {
  items: CartItem[];
  error: string | null;

  setError: (error: string | null) => void;
  setItems: (items: CartItem[]) => void;

  loadCart: () => void;
  saveCartState: (itemsToSave: CartItem[]) => void;

  addItem: (item: Omit<CartItem, "quantity"> & { quantity?: number }) => void;
  removeItem: (variantId: string) => void;
  updateQuantity: (variantId: string, quantity: number) => void;
  clearCart: () => void;
}

const LOCAL_STORAGE_CART_KEY = "guestCart";
const MAX_DISTINCT_ITEMS = 8; // Limit for the number of different items
const MAX_VARIANT_QUANTITY = 5; // Limit for the quantity of a single variant

export const useCartStore = create<CartState>((set, get) => ({
  items: [],
  error: null,

  setError: (error) => set({ error: error }),
  setItems: (items) => set({ items: items }),

  loadCart: () => {
    get().setError(null);
    let storedItems: CartItem[] = [];
    if (typeof window !== "undefined") {
      try {
        const storedCartString = localStorage.getItem(LOCAL_STORAGE_CART_KEY);
        storedItems = storedCartString ? JSON.parse(storedCartString) : [];
        storedItems = storedItems
          .map((item) => ({
            ...item,
            quantity: Number(item.quantity) || 0,
          }))
          .filter((item) => item.quantity > 0) // Remove items with invalid/zero quantity
          .slice(0, MAX_DISTINCT_ITEMS); // Also enforce distinct item limit on load if needed
      } catch (e) {
        console.error("Failed to parse cart from localStorage", e);
        get().setError("Failed to load cart from local storage.");
        localStorage.removeItem(LOCAL_STORAGE_CART_KEY);
        storedItems = [];
      }
    }
    set({ items: storedItems });
  },

  saveCartState: (itemsToSave: CartItem[]) => {
    get().setError(null);

    if (typeof window !== "undefined") {
      try {
        localStorage.setItem(
          LOCAL_STORAGE_CART_KEY,
          JSON.stringify(itemsToSave)
        );
      } catch (e) {
        console.error("Failed to save cart to localStorage", e);
        get().setError("Failed to save cart to local storage.");
      }
    } else {
    }
  },

  addItem: (item) => {
    const { items, setItems, saveCartState } = get();
    const itemToAdd = { ...item, quantity: item.quantity ?? 1 };

    const existingItemIndex = items.findIndex((i) => i.id === itemToAdd.id);

    let newItems: CartItem[];
    if (existingItemIndex > -1) {
      const currentItem = items[existingItemIndex];
      const potentialQuantity = currentItem.quantity + itemToAdd.quantity;

      if (potentialQuantity > MAX_VARIANT_QUANTITY) {
        if (currentItem.quantity >= MAX_VARIANT_QUANTITY) {
          toast.info(
            `Cannot add more. Maximum quantity of ${MAX_VARIANT_QUANTITY} reached for this item.`
          );
          return;
        } else {
          newItems = items.map((i, index) =>
            index === existingItemIndex
              ? { ...i, quantity: MAX_VARIANT_QUANTITY }
              : i
          );
          toast.warning(
            `Added to cart, but quantity capped at maximum of ${MAX_VARIANT_QUANTITY} for this item.`
          );
        }
      } else {
        newItems = items.map((i, index) =>
          index === existingItemIndex
            ? { ...i, quantity: potentialQuantity }
            : i
        );
        toast.success(`${itemToAdd.name} quantity updated in cart!`);
      }

      setItems(newItems);
      saveCartState(newItems);
    } else {
      if (items.length >= MAX_DISTINCT_ITEMS) {
        toast.error(
          `You can add a maximum of ${MAX_DISTINCT_ITEMS} different items to your cart.`
        );
        return;
      }

      let quantityToAdd = itemToAdd.quantity;
      if (quantityToAdd > MAX_VARIANT_QUANTITY) {
        quantityToAdd = MAX_VARIANT_QUANTITY;
        toast.warning(
          `Maximum quantity per item is ${MAX_VARIANT_QUANTITY}. Added as ${MAX_VARIANT_QUANTITY}.`
        );
      } else {
        toast.success(`${itemToAdd.name} added to cart!`);
      }

      newItems = [...items, { ...itemToAdd, quantity: quantityToAdd }];

      setItems(newItems);
      saveCartState(newItems);
    }
  },

  removeItem: (variantId) => {
    const { items, setItems, saveCartState } = get();
    const itemToRemove = items.find((item) => item.id === variantId);

    const newItems = items.filter((item) => item.id !== variantId);

    setItems(newItems);
    toast.error(`${itemToRemove?.name || "Item"} removed from cart!`);
    saveCartState(newItems);
  },

  updateQuantity: (variantId, quantity) => {
    const { items, setItems, saveCartState } = get();

    let newQuantity = quantity;
    if (newQuantity > MAX_VARIANT_QUANTITY) {
      newQuantity = MAX_VARIANT_QUANTITY;
      toast.warning(
        `Maximum quantity per item is ${MAX_VARIANT_QUANTITY}. Quantity set to ${MAX_VARIANT_QUANTITY}.`
      );
    }

    if (newQuantity <= 0) {
      return get().removeItem(variantId);
    }

    const newItems = items.map((item) =>
      item.id === variantId ? { ...item, quantity: newQuantity } : item
    );

    setItems(newItems);
    saveCartState(newItems);
  },

  clearCart: () => {
    const { setItems, saveCartState } = get();
    setItems([]);
    toast.success("Cart cleared!");
    saveCartState([]);
  },
}));
