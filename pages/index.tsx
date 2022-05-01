import {
  Container,
  SimpleGrid,
  Flex,
  Stack,
  Box,
  Text,
  Skeleton,
  AspectRatio,
  InputGroup,
  Input,
  InputRightElement,
} from '@chakra-ui/react';
import Head from 'next/head';
import { useRouter } from 'next/router';
import { BiSearchAlt } from 'react-icons/bi';
import { useEffect, useState } from 'react';

import { Product } from 'interfaces/product';
import ProductAPI from 'lib/api/products';
import PublicLayout from 'layouts/public/index';
import Banner from 'components/Banner';
import ProductCard from 'components/Product/ProductCard';

export default function HomePage() {
  const router = useRouter();
  const [isLoading, setIsLoading] = useState<boolean>(true);
  const [products, setProducts] = useState<Product[]>([]);
  const [sort, setSort] = useState<string>();

  const sortOptions = {
    most_popular: 'Paling populer',
    least_popular: 'Kurang populer',
    newest: 'Terbaru',
    oldest: 'Terlama',
    price_lowest: 'Termurah',
    price_highest: 'Termahal',
  };

  function handleFilterChange(key: string, value: any) {
    setSort(router.query.sort as string);
    router.push({
      pathname: '/',
      query: {
        ...router.query,
        [key]: value,
      },
    }, undefined, { scroll: false });
  }

  useEffect(() => {
    if (!router.isReady) return;

    const sort = router.query.sort as string || 'oldest';
    setIsLoading(true);
    setSort(sort);

    ProductAPI.getProducts({
      sort,
    }).then(({ data }) => {
      setProducts(data);
    }).catch(() => {
      setProducts([]);
    }).finally(() => {
      setIsLoading(false);
    });
  }, [router.isReady, router.query]);

  return (
    <>
      <Head>
        <title>Home | Wakaf</title>
      </Head>
      <Container
        maxW='5xl'
        px='0'
        mb='20'
        bg='white'
        boxShadow='2xl'
      >
        <Banner />
        <Flex alignItems='stretch'>
          <Box
            w='250px'
            borderRight='1px'
            borderColor='gray.200'
          >
            <Box pos='sticky' top='0'>
              <Box
                p='4'
                bg='whitesmoke'
                fontWeight='700'
                borderBottom='1px'
                borderColor='gray.200'
              >
                Filter
              </Box>
              <Box p='4'>
                <Text
                  fontSize='sm'
                  fontWeight='800'
                  letterSpacing='widest'
                  textTransform='uppercase'
                  mb='2'
                >
                  Urutkan
                </Text>
                <Box>
                  {Object.keys(sortOptions).map((key) => (
                    <Text
                      key={key}
                      py='1'
                      cursor='pointer'
                      color='gray.500'
                      fontSize='sm'
                      sx={sort === key
                        ? {
                            color: 'black',
                            textDecor: 'underline',
                          }
                        : {}
                      }
                      _hover={{
                        color: 'black',
                      }}
                      onClick={() => handleFilterChange('sort', key)}
                    >
                      {sortOptions[key]}
                    </Text>
                  ))}
                </Box>
              </Box>
            </Box>
          </Box>

          <Stack flexGrow={1} spacing='0'>
            <Box
              p='2'
              bg='whitesmoke'
              borderBottom='1px'
              borderColor='gray.200'
              >
              <InputGroup>
                <Input
                  p='2'
                  variant='unstyled'
                  placeholder='Cari wakaf...'
                  fontWeight='700'
                />
                <InputRightElement>
                  <BiSearchAlt />
                </InputRightElement>
              </InputGroup>
            </Box>

            <SimpleGrid
              columns={4}
              gap='1'
              mt='0'
            >
              {isLoading
                ? Array(4).fill(null).map((_, index) => (
                  <AspectRatio key={index} ratio={1}>
                    <Box
                      p='4'
                      bg='gray.100'
                      flexDir='column'
                      sx={{
                        alignItems: 'flex-start !important',
                        justifyContent: 'flex-end !important',
                      }}
                    >
                      <Skeleton h='23px' w='150px' maxW='full' mb='2' />
                      <Skeleton h='18px' w='100px' />
                    </Box>
                  </AspectRatio>
                ))
                : products.map((product) => (
                  <ProductCard
                    key={product.id}
                    product={product}
                  />
                ))
              }
            </SimpleGrid>
          </Stack>
        </Flex>
      </Container>
    </>
  );
}

HomePage.Layout = PublicLayout;
