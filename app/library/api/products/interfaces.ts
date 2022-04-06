const interfaces = {
  transactions(params) {
    return this.get('/transactions', { params });
  },
  transaction(id) {
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
