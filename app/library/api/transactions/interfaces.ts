const interfaces = {
  getTransactions(params) {
    return this.get('/transactions', { params });
  },
  getTransaction(id) {
    return this.get(`/transactions/${id}`);
  },
  createTransaction(data) {
    return this.post('/transactions', { data });
  },
  updateTransactionState(id, { data }) {
    return this.patch(`/transactions/${id}/state`, { data });
  },
}

export default interfaces;
