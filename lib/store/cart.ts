import { create } from 'zustand';
import { toast } from 'sonner';

export interface CartItem {
  id: string;
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
  isLoading: boolean;
  isSaving: boolean;
  error: string | null;

  setLoading: (loading: boolean) => void;
  setSaving: (saving: boolean) => void;
  setError: (error: string | null) => void;
  setItems: (items: CartItem[]) => void;

  loadCart: (userId: string | undefined | null, previousUserId: string | undefined | null) => Promise<void>;

  addItem: (item: Omit<CartItem, 'quantity'> & { quantity?: number }, userId: string | undefined | null) => Promise<void>;
  removeItem: (variantId: string, userId: string | undefined | null) => Promise<void>;
  updateQuantity: (variantId: string, quantity: number, userId: string | undefined | null) => Promise<void>;
  clearCart: (userId: string | undefined | null) => Promise<void>;
  saveCartState: (itemsToSave: CartItem[], userId: string | undefined | null) => Promise<void>;
}

const GUEST_CART_STORAGE_KEY = 'guestCart';

export const useCartStore = create<CartState>((set, get) => ({
  items: [],
  isLoading: true,
  isSaving: false,
  error: null,

  setLoading: (loading) => set({ isLoading: loading }),
  setSaving: (saving) => set({ isSaving: saving }),
  setError: (error) => set({ error: error }),
  setItems: (items) => set({ items: items }),

  loadCart: async (userId, previousUserId) => {
    const { setLoading, setError, setItems } = get();
    setLoading(true);
    setError(null);

    try {
      if (userId && (previousUserId === null || previousUserId === undefined)) {
        let guestCartItems: CartItem[] = [];
        try {
             const guestCartString = localStorage.getItem(GUEST_CART_STORAGE_KEY);
             guestCartItems = guestCartString ? JSON.parse(guestCartString) : [];
        } catch (e) {
            console.error("Failed to parse guest cart from localStorage", e);
            localStorage.removeItem(GUEST_CART_STORAGE_KEY);
        }

        const dbResponse = await fetch('/api/cart');
        if (!dbResponse.ok) {
            throw new Error(`Failed to load DB cart: ${dbResponse.statusText}`);
        }
        const dbCart = await dbResponse.json();
        const dbCartItems: CartItem[] = dbCart.items || [];

        const mergedItemsMap = new Map<string, CartItem>();

        dbCartItems.forEach(item => {
            mergedItemsMap.set(item.id, { ...item });
        });

        guestCartItems.forEach(guestItem => {
            if (mergedItemsMap.has(guestItem.id)) {
                const existingItem = mergedItemsMap.get(guestItem.id)!;
                mergedItemsMap.set(guestItem.id, {
                    ...existingItem,
                    quantity: existingItem.quantity + guestItem.quantity
                });
            } else {
                 mergedItemsMap.set(guestItem.id, { ...guestItem });
            }
        });

        const mergedItems = Array.from(mergedItemsMap.values());

        const saveResponse = await fetch('/api/cart', {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({ items: mergedItems.map(({ id, productId, quantity }) => ({ variantId: id, productId, quantity })) }),
        });

        if (!saveResponse.ok) {
             console.error("Failed to save merged cart to DB:", saveResponse.status, saveResponse.statusText);
             setError(`Failed to sync cart to DB: ${saveResponse.statusText}`);
        } else {
            localStorage.removeItem(GUEST_CART_STORAGE_KEY);
        }

        setItems(mergedItems);

      } else if (userId) {
        const response = await fetch('/api/cart');
        if (!response.ok) {
            console.error("Failed to load cart from DB:", response.statusText);
            throw new Error(`Failed to load cart: ${response.statusText}`);
        }
        const cart = await response.json();
        setItems(cart.items || []);

      } else {
         let guestCartItems: CartItem[] = [];
         try {
             const guestCartString = localStorage.getItem(GUEST_CART_STORAGE_KEY);
             guestCartItems = guestCartString ? JSON.parse(guestCartString) : [];
         } catch (e) {
             console.error("Failed to parse guest cart from localStorage", e);
             localStorage.removeItem(GUEST_CART_STORAGE_KEY);
         }
        setItems(guestCartItems);
      }

    } catch (err: any) {
      console.error("Error loading cart:", err);
      setError(err.message || "Failed to load cart.");
      setItems([]);
    } finally {
      setLoading(false);
    }
  },

  saveCartState: async (itemsToSave, userId) => {
    const { setSaving, setError } = get();
    setSaving(true);
    setError(null);

    try {
      if (userId) {
         const apiItems = itemsToSave.map(({ id, productId, quantity }) => ({
              variantId: id,
              productId: productId,
              quantity: quantity,
            }));

         const response = await fetch('/api/cart', {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({ items: apiItems }),
         });

         if (!response.ok) {
             console.error("Failed to save cart to DB:", response.status, response.statusText);
             throw new Error(`Failed to save cart to DB: ${response.statusText}`);
         }

      } else {
        localStorage.setItem(GUEST_CART_STORAGE_KEY, JSON.stringify(itemsToSave));
      }
    } catch (err: any) {
        console.error("Error saving cart:", err);
        setError(err.message || "Failed to save cart.");
        toast.error(`Failed to save cart: ${err.message || 'Unknown error'}`);
    } finally {
        setSaving(false);
    }
  },

  addItem: async (item, userId) => {
    const { items, setItems, saveCartState } = get();
    const itemToAdd = { ...item, quantity: item.quantity ?? 1 };

    const existingItemIndex = items.findIndex(i => i.id === itemToAdd.id);

    let newItems: CartItem[];
    if (existingItemIndex > -1) {
      newItems = items.map((i, index) =>
        index === existingItemIndex ? { ...i, quantity: i.quantity + itemToAdd.quantity } : i
      );
       toast.success(`${itemToAdd.name} quantity updated in cart!`);
    } else {
      newItems = [...items, itemToAdd];
      toast.success(`${itemToAdd.name} added to cart!`);
    }

    setItems(newItems);
    await saveCartState(newItems, userId);
  },

  removeItem: async (variantId, userId) => {
    const { items, setItems, saveCartState } = get();
    const itemToRemove = items.find(item => item.id === variantId);

    const newItems = items.filter(item => item.id !== variantId);

    setItems(newItems);
    toast.error(`${itemToRemove?.name || 'Item'} removed from cart!`);

    await saveCartState(newItems, userId);
  },

  updateQuantity: async (variantId, quantity, userId) => {
    const { items, setItems, saveCartState } = get();

    if (quantity <= 0) {
      return get().removeItem(variantId, userId);
    }

    const newItems = items.map(item =>
      item.id === variantId ? { ...item, quantity: quantity } : item
    );

    setItems(newItems);

    await saveCartState(newItems, userId);
  },

  clearCart: async (userId) => {
    const { setItems, saveCartState } = get();
    setItems([]);
    toast.success('Cart cleared!');

    await saveCartState([], userId);
  },
}));