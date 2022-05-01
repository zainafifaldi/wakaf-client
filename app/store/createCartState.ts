import { GetState, SetState } from 'zustand';

import { StoreState } from '.';

export interface CartState {
  cartCount: number;
  setCartCount: (cartCount: number) => void;
}

const createCartState = (set: SetState<StoreState>, get: GetState<StoreState>) => ({
  cartCount: 0,
  setCartCount: (cartCount: number) => set(() => ({ cartCount })),
});

export default createCartState;
