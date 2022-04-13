const interfaces = {
  getCarts(params) {
    return this.get('/carts', { params });
  },
  addToCart(data) {
    return this.post('/carts', { data });
  },
  updateCart(id, data) {
    return this.patch(`/carts/${id}`, { data });
  },
  deleteCartItem(id) {
    return this.delete(`/carts/${id}`);
  },
}

export default interfaces;
