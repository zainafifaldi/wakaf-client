import {
  SimpleGrid,
  Stack,
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
      <Stack spacing='8'>
        <Banner />
        <Container maxW='full' pb='6' centerContent>
          <SimpleGrid
            minChildWidth='260px'
            spacing='6'
            w='5xl'
            maxW='full'
          >
            {Array(10)
              .fill('')
              .map((_, i) => (
                <ProductCard key={i} />
              ))}
          </SimpleGrid>
        </Container>
      </Stack>
    </>
  );
}

Home.Layout = PublicLayout
