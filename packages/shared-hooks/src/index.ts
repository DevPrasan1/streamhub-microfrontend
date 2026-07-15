import { useEffect, useState } from 'react';
import { useAuthStore, useProductStore, useCartStore, useUIStore } from '@mfe/shared-store';

export function useAuth() {
  const { user, loading, setUser, setLoading } = useAuthStore();
  return { user, loading, setUser, setLoading };
}

export function useProduct() {
  const { selectedProduct, setSelectedProduct } = useProductStore();
  return { selectedProduct, setSelectedProduct };
}

export function useCart() {
  const { cartItems, addToCart, removeFromCart, clearCart } = useCartStore();
  return { cartItems, addToCart, removeFromCart, clearCart };
}

export function useTheme() {
  const { theme, toggleTheme, setTheme } = useUIStore();
  return { theme, toggleTheme, setTheme };
}

export function useDebounce<T>(value: T, delay: number): T {
  const [debouncedValue, setDebouncedValue] = useState<T>(value);

  useEffect(() => {
    const handler = setTimeout(() => {
      setDebouncedValue(value);
    }, delay);

    return () => {
      clearTimeout(handler);
    };
  }, [value, delay]);

  return debouncedValue;
}

export function useFirestore() {
  return {};
}

export function useSearch() {
  const { searchQuery, setSearchQuery } = useUIStore();
  return { searchQuery, setSearchQuery };
}
