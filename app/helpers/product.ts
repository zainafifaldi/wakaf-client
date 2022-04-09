import { Product } from 'interfaces/product';

export function productUrl(product: Product): string {
  const slug = product.name
    .replace(/[^a-zA-Z0-9\s]/g, '')
    .replace(/\s+/g, '-')
    .toLowerCase();
  return `/product/${product.id}/${slug}`;
}
