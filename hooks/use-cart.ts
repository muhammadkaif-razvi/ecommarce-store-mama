import { useEffect } from 'react';
import { useCartStore, CartItem } from '@/lib/store/cart';

export const useCart = () => {
  const store = useCartStore();

  useEffect(() => {
    store.loadCart();
  }, []);

  return {
    items: store.items,
    error: store.error,
    addItem: (item: Omit<CartItem, 'quantity'> & { quantity?: number }) => store.addItem(item),
    removeItem: (variantId: string) => store.removeItem(variantId),
    updateQuantity: (variantId: string, quantity: number) => store.updateQuantity(variantId, quantity),
    clearCart: () => store.clearCart(),
    cartState: store,
  };
};