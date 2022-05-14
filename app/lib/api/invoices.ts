import { Invoice, InvoicePayload } from 'interfaces/invoice';
import ApiClient from '.';

const api = {
  getInvoices(params?: object) {
    return ApiClient.get<Invoice[]>('/invoices', 'user', { params });
  },
  getInvoiceByTransactionId(id: number | string) {
    return ApiClient.get<Invoice>(`/invoices/trx/${id}`, 'user');
  },
  updateInvoice(id: number | string, data: InvoicePayload) {
    return ApiClient.patch(`/invoices/${id}/state`, 'user', { data });
  },
};

export default api;
