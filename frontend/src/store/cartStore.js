import {create} from 'zustand';
import { cartService } from '../utils/services';

const useCartStore = create((set) => ({
  cartCount: 0,
  setCartCount: (count) => set({ cartCount: count }),
  updateCartCount: async (userId) => {
    try {
      const carts = await cartService.getCarts(userId);
      set({ cartCount: carts.length });
    } catch (error) {
      console.error('Error fetching cart count:', error);
    }
  }
}));

export default useCartStore;