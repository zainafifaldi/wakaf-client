import { TransactionPayload, TransactionStatePayload, Transaction } from 'interfaces/transaction';
import ApiClient from '.';

const api = {
  getTransactions(params?: object) {
    return ApiClient.get<Transaction[]>('/transactions', 'user', { params });
  },
  getTransaction(id: number | string) {
    return ApiClient.get<Transaction>(`/transactions/${id}`, 'user');
  },
  createTransaction(data: TransactionPayload) {
    return ApiClient.post<Transaction>('/transactions', 'user', { data });
  },
  updateTransactionState(id: number | string, data: TransactionStatePayload) {
    return ApiClient.patch<Transaction>(`/transactions/${id}/state`, 'user', { data });
  },
};

export default api;
