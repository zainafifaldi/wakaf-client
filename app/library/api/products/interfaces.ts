const interfaces = {
  getProducts(params) {
    return this.get('/products', { params });
  },
  getProduct(id) {
    return this.get(`/products/${id}`);
  },
  getProductImages(id) {
    return this.get(`/products/${id}/images`);
  },
}

export default interfaces;
