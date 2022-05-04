import create from 'zustand';

import createUserState, { UserState } from './user';
import createCartState, { CartState } from './cart';

export type StoreState = UserState & CartState;

const useStore = create<StoreState>((set, get) => ({
  ...createUserState(set, get),
  ...createCartState(set, get),
}));

export default useStore;
