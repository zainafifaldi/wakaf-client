import { User, UserCredential, AuthUser } from 'interfaces/user';
import ApiClient from '.';

const api = {
  register(data: User) {
    return ApiClient.post<AuthUser>('/auth/register', 'public', { data });
  },
  signIn(data: UserCredential) {
    return ApiClient.post<AuthUser>('/auth/sign_in', 'public', { data });
  },
};

export default api;
