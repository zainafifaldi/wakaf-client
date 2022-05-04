import { Cart, CartEntryParams, CartPayload } from 'interfaces/cart';
import ApiClient from '.';

const api = {
  getCarts(params?: CartEntryParams) {
    return ApiClient.get<Cart[]>('/carts', 'guest user', { params });
  },
  addToCart(data: CartPayload) {
    return ApiClient.post('/carts', 'guest user', { data });
  },
  updateCart(id: number | string, data: CartPayload) {
    return ApiClient.patch(`/carts/${id}`, 'guest user', { data });
  },
  deleteCartItem(id: number | string) {
    return ApiClient.delete(`/carts/${id}`, 'guest user');
  },
};

export default api;
