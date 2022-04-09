import {
  SimpleGrid,
  Container,
} from '@chakra-ui/react';
import Head from 'next/head';

import ProductAPI from 'library/api/products';
import PublicLayout from 'layouts/public/index';
import Banner from 'components/Banner';
import ProductCard from 'components/ProductCard';

export async function getServerSideProps() {
  const { data } = await ProductAPI.getProducts();
  return {
    props: {
      products: data,
    },
  };
}

export default function Home({ products }) {
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

Home.Layout = PublicLayout;
