import { Product } from './product';

export interface TransactionPayload {
  donor_name: string;
  donor_phone_number: string;
  donor_email: string;
  cart_ids: number[];
  payment_method: string;
  bank_name: string;
}

export interface TransactionStatePayload {
  state: string;
}

export interface TransactionProduct extends Product {
  image_urls: string[];
  state: string;
}

export interface Transaction {
  id: 1;
  transaction_number: string;
  donor_name: string;
  donor_phone_number: string;
  donor_email: string;
  products: TransactionProduct[];
  state: string;
  created_at: string;
  updated_at: string;
}
