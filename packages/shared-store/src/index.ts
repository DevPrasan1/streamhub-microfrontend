import { create } from 'zustand';
import { User, Product, CartItem } from '@mfe/shared-types';

// --- AUTH STORE ---
interface AuthState {
  user: User | null;
  loading: boolean;
  setUser: (user: User | null) => void;
  setLoading: (loading: boolean) => void;
}

const getAuthStore = () => {
  const key = '__mfe_auth_store__';
  if (typeof window !== 'undefined') {
    if (!(window as any)[key]) {
      (window as any)[key] = create<AuthState>((set) => ({
        user: null,
        loading: true,
        setUser: (user) => set({ user }),
        setLoading: (loading) => set({ loading }),
      }));
    }
    return (window as any)[key];
  }
  return create<AuthState>((set) => ({
    user: null,
    loading: true,
    setUser: (user) => set({ user }),
    setLoading: (loading) => set({ loading }),
  }));
};

export const useAuthStore = getAuthStore();

// --- PRODUCT STORE ---
interface ProductState {
  selectedProduct: Product | null;
  setSelectedProduct: (product: Product | null) => void;
  activeCategory: string;
  setActiveCategory: (category: string) => void;
}

const getProductStore = () => {
  const key = '__mfe_product_store__';
  if (typeof window !== 'undefined') {
    if (!(window as any)[key]) {
      (window as any)[key] = create<ProductState>((set) => ({
        selectedProduct: null,
        setSelectedProduct: (selectedProduct) => set({ selectedProduct }),
        activeCategory: 'All',
        setActiveCategory: (activeCategory) => set({ activeCategory }),
      }));
    }
    return (window as any)[key];
  }
  return create<ProductState>((set) => ({
    selectedProduct: null,
    setSelectedProduct: (selectedProduct) => set({ selectedProduct }),
    activeCategory: 'All',
    setActiveCategory: (activeCategory) => set({ activeCategory }),
  }));
};

export const useProductStore = getProductStore();

// --- CART STORE ---
interface CartState {
  cartItems: CartItem[];
  addToCart: (product: Product) => void;
  removeFromCart: (productId: number) => void;
  clearCart: () => void;
}

const getCartStore = () => {
  const key = '__mfe_cart_store__';
  if (typeof window !== 'undefined') {
    if (!(window as any)[key]) {
      (window as any)[key] = create<CartState>((set) => ({
        cartItems: [],
        addToCart: (product) =>
          set((state) => {
            const existingIndex = state.cartItems.findIndex((item) => item.product.id === product.id);
            if (existingIndex > -1) {
              const newItems = [...state.cartItems];
              newItems[existingIndex].quantity += 1;
              return { cartItems: newItems };
            }
            return { cartItems: [...state.cartItems, { product, quantity: 1 }] };
          }),
        removeFromCart: (productId) =>
          set((state) => {
            const existingIndex = state.cartItems.findIndex((item) => item.product.id === productId);
            if (existingIndex > -1) {
              const newItems = [...state.cartItems];
              if (newItems[existingIndex].quantity > 1) {
                newItems[existingIndex].quantity -= 1;
                return { cartItems: newItems };
              }
              return { cartItems: newItems.filter((item) => item.product.id !== productId) };
            }
            return state;
          }),
        clearCart: () => set({ cartItems: [] }),
      }));
    }
    return (window as any)[key];
  }
  return create<CartState>((set) => ({
    cartItems: [],
    addToCart: (product) =>
      set((state) => {
        const existingIndex = state.cartItems.findIndex((item) => item.product.id === product.id);
        if (existingIndex > -1) {
          const newItems = [...state.cartItems];
          newItems[existingIndex].quantity += 1;
          return { cartItems: newItems };
        }
        return { cartItems: [...state.cartItems, { product, quantity: 1 }] };
      }),
    removeFromCart: (productId) =>
      set((state) => {
        const existingIndex = state.cartItems.findIndex((item) => item.product.id === productId);
        if (existingIndex > -1) {
          const newItems = [...state.cartItems];
          if (newItems[existingIndex].quantity > 1) {
            newItems[existingIndex].quantity -= 1;
            return { cartItems: newItems };
          }
          return { cartItems: newItems.filter((item) => item.product.id !== productId) };
        }
        return state;
      }),
    clearCart: () => set({ cartItems: [] }),
  }));
};

export const useCartStore = getCartStore();

// --- UI STORE ---
interface UIState {
  theme: 'light' | 'dark';
  sidebarOpen: boolean;
  searchQuery: string;
  language: string;
  toggleTheme: () => void;
  setTheme: (theme: 'light' | 'dark') => void;
  toggleSidebar: () => void;
  setSidebarOpen: (open: boolean) => void;
  setSearchQuery: (query: string) => void;
  setLanguage: (language: string) => void;
}

const getUIStore = () => {
  const key = '__mfe_ui_store__';
  if (typeof window !== 'undefined') {
    if (!(window as any)[key]) {
      (window as any)[key] = create<UIState>((set) => ({
        theme: 'light',
        sidebarOpen: true,
        searchQuery: '',
        language: 'en',
        toggleTheme: () => set((state) => ({ theme: state.theme === 'light' ? 'dark' : 'light' })),
        setTheme: (theme) => set({ theme }),
        toggleSidebar: () => set((state) => ({ sidebarOpen: !state.sidebarOpen })),
        setSidebarOpen: (sidebarOpen) => set({ sidebarOpen }),
        setSearchQuery: (searchQuery) => set({ searchQuery }),
        setLanguage: (language) => set({ language }),
      }));
    }
    return (window as any)[key];
  }
  return create<UIState>((set) => ({
    theme: 'light',
    sidebarOpen: true,
    searchQuery: '',
    language: 'en',
    toggleTheme: () => set((state) => ({ theme: state.theme === 'light' ? 'dark' : 'light' })),
    setTheme: (theme) => set({ theme }),
    toggleSidebar: () => set((state) => ({ sidebarOpen: !state.sidebarOpen })),
    setSidebarOpen: (sidebarOpen) => set({ sidebarOpen }),
    setSearchQuery: (searchQuery) => set({ searchQuery }),
    setLanguage: (language) => set({ language }),
  }));
};

export const useUIStore = getUIStore();
export type { AuthState, ProductState, CartState, UIState };
