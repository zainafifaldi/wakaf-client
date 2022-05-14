import { User, UserCredential, AuthUser } from 'interfaces/user';
import ApiClient from '.';

const api = {
  getMe() {
    return ApiClient.get('/users/me', 'user');
  },
  updateMe(data) {
    return ApiClient.patch('/users/me', 'public', { data });
  },
};

export default api;
