import {
  SimpleGrid,
  Flex,
  Stack,
  StackDivider,
  Container,
  Alert,
  AlertIcon,
  Image,
  Box,
  Heading,
  Text,
  List,
  ListItem,
  Button,
  useColorModeValue,
} from '@chakra-ui/react';
import Head from 'next/head';

import ProductAPI from 'library/api/products';
import { money } from 'helpers/number';
import PublicLayout from 'layouts/public/index';

export async function getServerSideProps({ params }) {
  const [id] = params.slug;
  const { data: product } = await ProductAPI.getProduct(id);
  const { data: images } = await ProductAPI.getProductImages(id);
  return {
    props: {
      product: {
        ...product,
        images,
      },
    },
  };
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
            <Image
              rounded='md'
              alt='product image'
              src='https://images.unsplash.com/photo-1596516109370-29001ec8ec36?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=MnwyODE1MDl8MHwxfGFsbHx8fHx8fHx8fDE2Mzg5MzY2MzE&ixlib=rb-1.2.1&q=80&w=1080'
              fit='cover'
              align='center'
              w='100%'
              h={{ base: '100%', sm: '400px', lg: '500px' }}
            />
            <Flex direction='row' wrap='wrap'>
              {product.images.map((image) => (
                <Image
                  key={image.id}
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
              ))}
            </Flex>
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
                fontSize={{ base: '2xl', sm: '4xl', lg: '5xl' }}>
                {product.name}
              </Heading>
              <Text
                color={useColorModeValue('gray.900', 'gray.400')}
                fontWeight='300'
                fontSize='2xl'>
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
