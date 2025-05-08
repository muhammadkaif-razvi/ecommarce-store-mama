import { useEffect, useRef } from 'react';
import { useCartStore, CartItem } from '@/lib/store/cart';
import { useCurrentUser } from '@/hooks/use-current-user';

export const useCart = () => {
  const store = useCartStore();
  const user  = useCurrentUser();

  const previousUserIdRef = useRef(user?.id);

  useEffect(() => {
    if (previousUserIdRef.current !== undefined && previousUserIdRef.current !== null && (user?.id === null || user?.id === undefined)) {
        const currentCartItems = store.items;
         const GUEST_CART_STORAGE_KEY = 'guestCart';
        if (currentCartItems.length > 0) {
             try {
                localStorage.setItem(GUEST_CART_STORAGE_KEY, JSON.stringify(currentCartItems));
             } catch (e) {
                 console.error("Failed to save cart to localStorage on logout", e);
             }
        }
         store.setItems([]);
    }

    store.loadCart(user?.id, previousUserIdRef.current);

    previousUserIdRef.current = user?.id;

    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [user?.id]);

  return {
    items: store.items,
    isLoading: store.isLoading,
    isSaving: store.isSaving,
    error: store.error,
    addItem: (item: Omit<CartItem, 'quantity'> & { quantity?: number }) => store.addItem(item, user?.id),
    removeItem: (variantId: string) => store.removeItem(variantId, user?.id),
    updateQuantity: (variantId: string, quantity: number) => store.updateQuantity(variantId, quantity, user?.id),
    clearCart: () => store.clearCart(user?.id),
    cartState: store,
  };
};