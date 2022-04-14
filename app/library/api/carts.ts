import { Cart, CartEntryParams, CartPayload } from 'interfaces/cart';
import ApiClient from './';

const api = {
  getCarts(params?: CartEntryParams) {
    return ApiClient.get<Cart[]>('/carts', { params });
  },
  addToCart(data: CartPayload) {
    return ApiClient.post('/carts', { data });
  },
  updateCart(id: number | string, data: CartPayload) {
    return ApiClient.patch(`/carts/${id}`, { data });
  },
  deleteCartItem(id: number | string) {
    return ApiClient.delete(`/carts/${id}`);
  },
};

export default api;
