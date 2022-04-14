import { TransactionPayload, TransactionStatePayload, Transaction } from 'interfaces/transaction';
import ApiClient from './';

const api = {
  getTransactions(params?: object) {
    return ApiClient.get<Transaction[]>('/transactions', { params });
  },
  getTransaction(id: number | string) {
    return ApiClient.get<Transaction>(`/transactions/${id}`);
  },
  createTransaction(data: TransactionPayload) {
    return ApiClient.post<Transaction>('/transactions', { data });
  },
  updateTransactionState(id: number | string, data: TransactionStatePayload) {
    return ApiClient.patch<Transaction>(`/transactions/${id}/state`, { data });
  },
};

export default api;
