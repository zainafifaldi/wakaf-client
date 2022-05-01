import create from 'zustand';

import createUserState, { UserState } from './createUserState';
import createCartState, { CartState } from './createCartState';

export type StoreState = UserState & CartState;

const useStore = create<StoreState>((set, get) => ({
  ...createUserState(set, get),
  ...createCartState(set, get),
}));

export default useStore;
