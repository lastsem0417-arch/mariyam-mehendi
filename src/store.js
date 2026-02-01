import { create } from 'zustand';
import { persist } from 'zustand/middleware'; // <--- YE IMPORT KARO

export const useStore = create(
  persist(
    (set) => ({
      cart: [],
      
      addToCart: (product) => set((state) => {
        const existing = state.cart.find(item => item._id === product._id);
        if (existing) {
          return {
            cart: state.cart.map(item => 
              item._id === product._id ? { ...item, quantity: item.quantity + 1 } : item
            )
          };
        }
        return { cart: [...state.cart, { ...product, quantity: 1 }] };
      }),

      removeFromCart: (id) => set((state) => ({
        cart: state.cart.filter(item => item._id !== id)
      })),

      clearCart: () => set({ cart: [] })
    }),
    {
      name: 'mariyam-cart-storage', // Is naam se data browser mein save hoga
    }
  )
);