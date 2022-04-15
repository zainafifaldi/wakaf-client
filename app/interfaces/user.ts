export interface UserToken {
  token: string;
  expire_time?: string;
}

export interface UserCredential {
  email: string;
  password?: string;
}

export interface User extends UserCredential {
  name: string;
  phone_number: string;
  address: string;
}

export interface AuthUser extends UserToken, User {
  user_id: number;
}
