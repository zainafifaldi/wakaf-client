import {
  SimpleGrid,
  Container,
} from '@chakra-ui/react';
import Head from 'next/head';

import PublicLayout from 'layouts/public/index';
import Banner from 'components/Banner';
import ProductCard from 'components/ProductCard';

export default function Home() {
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
          {Array(10)
            .fill('')
            .map((_, i) => (
              <ProductCard key={i} />
            ))}
        </SimpleGrid>
      </Container>
    </>
  );
}

Home.Layout = PublicLayout
