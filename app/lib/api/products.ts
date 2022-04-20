import { Product, ProductImage, ProductEntryParams } from 'interfaces/product';
import ApiClient from '.';

const api = {
  getProducts(params?: ProductEntryParams) {
    return ApiClient.get<Product[]>('/products', 'public', { params });
  },
  getProduct(id: number | string) {
    return ApiClient.get<Product>(`/products/${id}`, 'public');
  },
  getProductImages(id: number | string) {
    return ApiClient.get<ProductImage>(`/products/${id}/images`, 'public');
  },
}

export default api;
