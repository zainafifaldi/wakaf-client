import { Product } from './product';

export interface InvoicePayload {
  payment_evidence_url: string;
}

export interface InvoicePaymentDetail {
  name: string;
  number: number;
  behalf: string;
}

export interface Invoice {
  id: 1;
  invoice_number: string;
  transaction_id: number;
  amount: number;
  payment_method: string;
  payment_detail: InvoicePaymentDetail;
  state: string;
  payment_evidence_url: string;
  expire_time: string;
  created_at: string;
  updated_at: string;
}
