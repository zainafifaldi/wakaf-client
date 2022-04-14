import { User, UserToken, UserCredential, AuthUser } from 'interfaces/user';
import ApiClient from './';

const api = {
  guestIn() {
    return ApiClient.post<UserToken>('/auth/guest_in');
  },
  register(data: User) {
    return ApiClient.post('/auth/register', { data });
  },
  signIn(data: UserCredential) {
    return ApiClient.post<AuthUser>('/auth/sign_in', { data });
  },
};

export default api;
