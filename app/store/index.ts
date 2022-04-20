import create from 'zustand';

import createUserState, { UserState } from './createUserState';

export type StoreState = UserState;

const useStore = create<StoreState>((set, get) => ({
  ...createUserState(set, get),
}));

export default useStore;
