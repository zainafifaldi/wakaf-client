import { useState } from 'react';
import {
  AspectRatio,
  Flex,
  SimpleGrid,
  Stack,
  HStack,
  StackDivider,
  Container,
  Alert,
  AlertIcon,
  Image,
  Box,
  Heading,
  Text,
  Button,
  useToast,
} from '@chakra-ui/react';
import Head from 'next/head';

import { IMAGE_PLACEHOLDER } from 'lib/constants';
import ProductAPI from 'lib/api/products';
import CartAPI from 'lib/api/carts';
import { money } from 'helpers/number';
import Layout from 'layouts/default';
import NumberInput from 'components/Form/NumberInput';
import useStore from 'store';

export async function getServerSideProps({ res, params }) {
  try {
    res.setHeader('Cache-Control', 's-maxage=60, stale-while-revalidate');

    const [id] = params.slug;
    const [{ data: product }, { data: images }] = await Promise.all([
      ProductAPI.getProduct(id),
      ProductAPI.getProductImages(id),
    ]);

    product.images = images || [];

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

export default function ProductPage({ product }) {
  const toast = useToast();
  const [selectedImage, setSelectedImage] = useState<string>(product.images[0]?.image_url);
  const [quantity, setQuantity] = useState<number>(1);
  const [isSubmitting, setIsSubmitting] = useState<boolean>(false);
  const isOutOfStock = product.stock === 0;
  const totalAmount = product.price * quantity;
  const getCartCount = useStore((state) => state.getCartCount);

  function handleQuantityChange(value: number) {
    setQuantity(value);
  }

  async function addToCart() {
    setIsSubmitting(true);
    try {
      await CartAPI.addToCart({
        quantity,
        product_id: product.id,
      });

      getCartCount();
      toast({
        description: `${product.name} berhasil dimasukkan ke keranjang`,
        status: 'success',
        duration: 5000,
        isClosable: true,
        containerStyle: {
          fontSize: '0.875rem',
        }
      });
    } catch (error) {
      console.log(error);
    } finally {
      setIsSubmitting(false);
    }
  }

  return (
    <>
      <Head>
        <title>{product.name} | Wakaf</title>
      </Head>
      <Container
        maxW="5xl"
        p="6"
        mb="20"
        bg="white"
        boxShadow="2xl"
      >
        <SimpleGrid
          columns={{ base: 1, lg: 2 }}
          spacing="6"
        >
          <Stack direction="column" spacing="4">
            <AspectRatio ratio={1}>
              <Image
                rounded="md"
                alt={product.name}
                src={selectedImage}
                fallbackSrc={IMAGE_PLACEHOLDER}
                fit="cover"
                align="center"
              />
            </AspectRatio>

            {product.images.length > 1 && (
              <SimpleGrid
                columns={{ base: 4, md: 6, lg: 5 }}
                spacing="3"
              >
                {product.images.map((image) => (
                  <AspectRatio
                    key={image.id}
                    ratio={1}
                    rounded="md"
                    cursor="pointer"
                    overflow="hidden"
                    borderWidth="2px"
                    borderColor={selectedImage === image.image_url ? 'green.500' : 'transparent'}
                    onClick={() => setSelectedImage(image.image_url)}
                  >
                    <Image
                      alt={product.name}
                      src={image.image_url}
                      fallbackSrc={IMAGE_PLACEHOLDER}
                      boxSize="100px"
                      fit="cover"
                      align="center"
                      mb="6"
                      mr="6"
                    />
                  </AspectRatio>
                ))}
              </SimpleGrid>
            )}
          </Stack>
          <Stack spacing={{ base: 6, md: 10 }}>
            <Box as="header">
              {isOutOfStock && (
                <Alert status="warning" mb="2">
                  <AlertIcon />
                  Stok tidak tersedia
                </Alert>
              )}

              <Heading
                lineHeight="1.1"
                fontWeight="600"
                fontSize={{ base: '2xl', sm: '4xl', lg: '5xl' }}
              >
                {product.name}
              </Heading>
              <Text
                color="gray.900"
                fontWeight="300"
                fontSize="2xl"
              >
                {money(product.price)}
              </Text>
            </Box>

            <Stack
              spacing={{ base: 4, sm: 6 }}
              direction="column"
              divider={
                <StackDivider borderColor="gray.200" />
              }
            >
              <Text>
                {product.description}
              </Text>
            </Stack>

            <Stack
              p="4"
              borderWidth="1px"
              borderRadius="md"
              direction="column"
              spacing="4"
            >
              <Stack>
                <HStack spacing="6">
                  <NumberInput
                    value={quantity}
                    min={1}
                    max={product.stock}
                    isDisabled={isOutOfStock}
                    onChange={handleQuantityChange}
                  />
                  {!isOutOfStock && (
                    <Box>
                      Stok <Text as="span" fontWeight="700">{product.stock}</Text>
                    </Box>
                  )}
                </HStack>
                <Text fontSize="sm" color="gray.400">
                  Maks. pembelian {product.stock} pcs
                </Text>
              </Stack>
              <Flex justifyContent="space-between">
                <Text>Subtotal</Text>
                <Text fontWeight="700">{ money(totalAmount) }</Text>
              </Flex>
              <Button
                rounded="none"
                w="full"
                mt="8"
                size="lg"
                py="7"
                bg="gray.900"
                color="white"
                textTransform="uppercase"
                isDisabled={isOutOfStock}
                isLoading={isSubmitting}
                _hover={{
                  transform: 'translateY(2px)',
                  boxShadow: 'lg',
                }}
                onClick={addToCart}
              >
                + Keranjang
              </Button>
            </Stack>
          </Stack>
        </SimpleGrid>
      </Container>
    </>
  );
}

ProductPage.Layout = Layout;
