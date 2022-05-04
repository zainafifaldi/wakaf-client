import { GetState, SetState } from 'zustand';

import { AuthUser } from 'interfaces/user';
import { StoreState } from '.';

export interface UserState {
  user: AuthUser;
  setUser: (user: AuthUser) => void;
}

const createUserState = (set: SetState<StoreState>, get: GetState<StoreState>) => ({
  user: {
    user_id: null,
    name: '',
    email: '',
    phone_number: '',
    address: '',
    token: '',
  },
  setUser: (user: AuthUser) => set(() => ({ user })),
});

export default createUserState;
