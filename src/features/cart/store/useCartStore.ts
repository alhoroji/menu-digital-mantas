// src/features/cart/store/useCartStore.ts
import { create } from 'zustand';
import { Dish } from '@/core/types/menu.types';

export interface CartItem {
  dish: Dish;
  quantity: number;
  notes?: string;
}

interface CartState {
  items: CartItem[];
  addItem: (dish: Dish) => void;
  removeItem: (dishId: string) => void;
  updateQuantity: (dishId: string, quantity: number) => void;
  clearCart: () => void;
  getTotalAmount: () => number;
  getTotalItems: () => number;
}

export const useCartStore = create<CartState>((set, get) => ({
  items: [],
  
  addItem: (dish) => {
    set((state) => {
      const existingItem = state.items.find(item => item.dish.id === dish.id);
      if (existingItem) {
        return {
          items: state.items.map(item =>
            item.dish.id === dish.id ? { ...item, quantity: item.quantity + 1 } : item
          )
        };
      }
      return { items: [...state.items, { dish, quantity: 1 }] };
    });
  },

  removeItem: (dishId) => {
    set((state) => ({ items: state.items.filter(item => item.dish.id !== dishId) }));
  },

  updateQuantity: (dishId, quantity) => {
    set((state) => ({
      items: quantity <= 0 
        ? state.items.filter(item => item.dish.id !== dishId)
        : state.items.map(item => item.dish.id === dishId ? { ...item, quantity } : item)
    }));
  },

  clearCart: () => set({ items: [] }),

  getTotalAmount: () => {
    return get().items.reduce((total, item) => {
      const price = item.dish.price.table || item.dish.price.standard;
      return total + (price * item.quantity);
    }, 0);
  },
  
  getTotalItems: () => {
    return get().items.reduce((total, item) => total + item.quantity, 0);
  }
}));