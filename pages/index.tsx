import {
  SimpleGrid,
  Container,
} from '@chakra-ui/react';
import Head from 'next/head';
import { useEffect, useState } from 'react';

import ProductAPI from 'library/api/products';
import PublicLayout from 'layouts/public/index';
import Banner from 'components/Banner';
import ProductCard from 'components/ProductCard';

export default function HomePage() {
  const [products, setProducts] = useState([]);

  useEffect(() => {
    ProductAPI.getProducts().then(({ data }) => {
      setProducts(data);
    }).catch(() => {
      setProducts([]);
    });
  }, []);

  return (
    <>
      <Head>
        <title>Home | Wakaf</title>
      </Head>
      <Banner />
      <Container maxW='5xl' py='8'>
        <SimpleGrid
          columns={{ base: 2, sm: 3, lg: 4 }}
          spacing={{ base: 2, md: 6 }}
        >
          {products.map((product) => (
            <ProductCard
              key={product.id}
              product={product}
            />
          ))}
        </SimpleGrid>
      </Container>
    </>
  );
}

HomePage.Layout = PublicLayout;
