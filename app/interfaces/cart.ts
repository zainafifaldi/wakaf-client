import { Pagination } from './common/pagination';
import { Product } from './product';

export interface CartEntryParams extends Pagination {
  selected_ids?: number[];
}

export interface CartPayload {
  product_id?: number;
  quantity: number;
}

export interface Cart {
  id: number;
  quantity: number;
  product: Product;
  created_at: string;
  updated_at: string;
}
