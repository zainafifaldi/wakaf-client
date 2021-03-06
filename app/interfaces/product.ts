import { Pagination } from './common/pagination';

export interface ProductEntryParams extends Pagination {
  query?: string;
  sort?: string;
}

export interface ProductImage {
  id: number;
  product_id: number;
  image_url: string;
  order: number;
  created_at: string;
  updated_at: string;
}

export interface Product {
  id: number;
  name: string;
  price: number;
  description: string;
  stock: number;
  sold_count: number;
  image?: ProductImage;
  images?: ProductImage | [];
  created_at: string;
  updated_at: string;
}
