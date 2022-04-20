import { Cart, CartEntryParams, CartPayload } from 'interfaces/cart';
import ApiClient from '.';

const api = {
  getCarts(params?: CartEntryParams) {
    return ApiClient.get<Cart[]>('/carts', 'public', { params });
  },
  addToCart(data: CartPayload) {
    return ApiClient.post('/carts', 'public', { data });
  },
  updateCart(id: number | string, data: CartPayload) {
    return ApiClient.patch(`/carts/${id}`, 'public', { data });
  },
  deleteCartItem(id: number | string) {
    return ApiClient.delete(`/carts/${id}`, 'public');
  },
};

export default api;
