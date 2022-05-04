import { GetState, SetState } from 'zustand';

import CartAPI from 'lib/api/carts';
import { StoreState } from '.';

export interface CartState {
  cartCount: number;
  getCartCount: () => Promise<void>;
}

const createCartState = (set: SetState<StoreState>, get: GetState<StoreState>) => ({
  cartCount: 0,
  getCartCount: async () => {
    const { meta } = await CartAPI.getCarts({ per_page: 1 });
    set({ cartCount: meta.total });
  },
});

export default createCartState;
