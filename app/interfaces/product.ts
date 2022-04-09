export interface ProductImage {
  id: number;
  product_id: number;
  image_url: string;
  order: number;
}

export interface Product {
  id: number;
  name: string;
  price: number;
  description: string;
  stock: number;
  sold_count: number;
  image?: ProductImage;
}
