export interface UserToken {
  token: string;
  expire_time?: string;
}

export interface UserCredential {
  email: string;
  password?: string;
}

export interface PhoneCredential {
  phone_number: string;
}

export interface User {
  name: string;
  email: string;
  phone_number: string;
  address: string;
}

export interface UserRegister extends User, UserCredential {}

export interface UserDetail extends User {
  id: number;
  email_verified: boolean,
  // roles: [string],
  phone_number_verified: boolean,
}

export interface AuthUser extends UserToken {
  user_id: number;
  name: string;
  email: string;
  phone_number: string;
  address: string;
}
