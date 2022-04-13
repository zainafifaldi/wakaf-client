import {
  AspectRatio,
  SimpleGrid,
  Stack,
  StackDivider,
  Container,
  Alert,
  AlertIcon,
  Image,
  Box,
  Heading,
  Text,
  Button,
  useColorModeValue,
} from '@chakra-ui/react';
import Head from 'next/head';

import ProductAPI from 'library/api/products';
import { money } from 'helpers/number';
import PublicLayout from 'layouts/public/index';

export async function getServerSideProps({ params }) {
  try {
    const [id] = params.slug;
    const { data: product } = await ProductAPI.getProduct(id);

    try {
      const { data: images } = await ProductAPI.getProductImages(id);
      product.images = images;
    } catch (error) {
      product.images = [];
    }

    return {
      props: {
        product,
      },
    };
  } catch (error) {
    return {
      notFound: true,
    };
  }
}

export default function Home({ product }) {
  return (
    <>
      <Head>
        <title>{product.name} | Wakaf</title>
      </Head>
      <Container maxW='5xl' py='8'>
        <SimpleGrid
          columns={{ base: 1, lg: 2 }}
          spacing={{ base: 8, md: 10 }}
        >
          <Stack direction='column' spacing='6'>
            { product.images.length > 0 &&
              <Image
                rounded='md'
                alt='product image'
                src={product.images[0].image_url}
                fit='cover'
                align='center'
                w='100%'
                h={{ base: '100%', sm: '400px', lg: '500px' }}
              /> ||
              <Image
                rounded='md'
                alt='product image'
                src={process.env.DEFAULT_PRODUCT_IMAGE}
                fit='cover'
                align='center'
                w='100%'
                h={{ base: '100%', sm: '400px', lg: '500px' }}
              />
            }
            <SimpleGrid
              columns={{ base: 4, md: 6, lg: 5 }}
              spacing={{ base: 2, md: 4 }}
            >
              {product.images.map((image) => (
                <AspectRatio key={image.id} ratio={1}>
                  <Image
                    rounded='md'
                    alt={product.name}
                    src={image.image_url}
                    fallbackSrc='https://via.placeholder.com/100'
                    boxSize='100px'
                    fit='cover'
                    align='center'
                    mb='6'
                    mr='6'
                  />
                </AspectRatio>
              ))}
            </SimpleGrid>
          </Stack>
          <Stack spacing={{ base: 6, md: 10 }}>
            <Box as='header'>
              <Alert status='warning' mb='2'>
                <AlertIcon />
                Stok tidak tersedia
              </Alert>
              <Heading
                lineHeight='1.1'
                fontWeight='600'
                fontSize={{ base: '2xl', sm: '4xl', lg: '5xl' }}
              >
                {product.name}
              </Heading>
              <Text
                color={useColorModeValue('gray.900', 'gray.400')}
                fontWeight='300'
                fontSize='2xl'
              >
                {money(product.price)}
              </Text>
            </Box>

            <Stack
              spacing={{ base: 4, sm: 6 }}
              direction='column'
              divider={
                <StackDivider borderColor={useColorModeValue('gray.200', 'gray.600')} />
              }
            >
              <Text>
                {product.description}
              </Text>
            </Stack>

            <Button
              rounded='none'
              w='full'
              mt='8'
              size='lg'
              py='7'
              bg={useColorModeValue('gray.900', 'gray.50')}
              color={useColorModeValue('white', 'gray.900')}
              textTransform='uppercase'
              _hover={{
                transform: 'translateY(2px)',
                boxShadow: 'lg',
              }}
            >
              Berwakaf sekarang
            </Button>
          </Stack>
        </SimpleGrid>
      </Container>
    </>
  );
}

Home.Layout = PublicLayout;
