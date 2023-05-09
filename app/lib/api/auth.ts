import { PhoneCredential, User, UserCredential, AuthUser } from 'interfaces/user';
import { OTP } from 'interfaces/otp';
import ApiClient from '.';

const api = {
  register(data: User) {
    return ApiClient.post<AuthUser>('/auth/register', 'public', { data });
  },
  registerWithPhone(data: User) {
    return ApiClient.post<User>('/auth/phones/register', 'public', { data });
  },
  signIn(data: UserCredential) {
    return ApiClient.post<AuthUser>('/auth/sign_in', 'public', { data });
  },
  signInWithPhone(data: PhoneCredential) {
    return ApiClient.post<any>('/auth/phones/sign_in', 'public', { data });
  },
  validateOTP(data: OTP) {
    return ApiClient.post<AuthUser>('/auth/phones/otp', 'public', { data });
  },
};

export default api;
