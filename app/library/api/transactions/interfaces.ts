const interfaces = {
  products(params) {
    return this.get('/products', { params });
  },
  product(id) {
    return this.get(`/products/${id}`);
  },
  productImages(id) {
    return this.get(`/products/${id}/images`);
  },
}

export default interfaces;
