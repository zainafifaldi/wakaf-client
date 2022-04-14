import { Product, ProductImage, ProductEntryParams } from 'interfaces/product';
import ApiClient from './';

const api = {
  getProducts(params?: ProductEntryParams) {
    return ApiClient.get<Product[]>('/products', { params });
  },
  getProduct(id: number | string) {
    return ApiClient.get<Product>(`/products/${id}`);
  },
  getProductImages(id: number | string) {
    return ApiClient.get<ProductImage>(`/products/${id}/images`);
  },
}

export default api;
