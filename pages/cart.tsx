import { useEffect, useState } from 'react';
import {
  AspectRatio,
  Flex,
  Spacer,
  Stack,
  StackDivider,
  Container,
  Image,
  Box,
  Text,
  Checkbox,
  IconButton,
  Button,
  Link,
  Skeleton,
} from '@chakra-ui/react';
import { BiTrash } from 'react-icons/bi';
import Head from 'next/head';
import NextLink from 'next/link';
import { useRouter } from 'next/router';
import debounce from 'lodash/debounce';

import { IMAGE_PLACEHOLDER } from 'lib/constants';
import { Cart } from 'interfaces/cart';
import CartAPI from 'lib/api/carts';
import PublicLayout from 'layouts/public/index';
import { money } from 'helpers/number';
import { productUrl } from 'helpers/product';
import NumberInput from 'components/Form/NumberInput';

export default function CartPage() {
  const router = useRouter();
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const [carts, setCarts] = useState<Cart[]>([]);
  const [selected, setSelected] = useState<number[]>([]);

  const totalAmount = selected.reduce((acc, id) => {
    const cart = carts.find((cart) => cart.id === id);
    return acc + (cart.product.price * cart.quantity);
  }, 0);

  const isAllSelected = selected.length && selected.length === carts.length;

  function toggleSelectAll() {
    if (isAllSelected) {
      setSelected([]);
    } else {
      setSelected(carts.map((cart) => cart.id));
    }
  }

  function toggleSelected(id: number) {
    const newSelected = [...selected];
    const index = selected.indexOf(id);
    if (index === -1) {
      newSelected.push(id);
    } else {
      newSelected.splice(index, 1);
    }
    setSelected(newSelected);
  }

  async function handleDelete(id: number) {
    try {
      await CartAPI.deleteCartItem(id);
      setSelected(selected.filter((selectedId) => selectedId !== id));
      setCarts(carts.filter((cart) => cart.id !== id));
    } catch (error) {
      console.log(error);
    }
  }

  const handleQuantityChange = debounce(async (cart: Cart, quantity: number) => {
    try {
      await CartAPI.updateCart(cart.id, { quantity });
      setCarts(carts.map((currentCart) =>
        currentCart.id === cart.id ? { ...cart, quantity } : currentCart
      ));
    } catch (error) {
      console.log(error);
    }
  }, 500);

  function handleCheckout() {
    router.push({
      pathname: '/checkout',
      query: {
        ids: selected,
      },
    });
  }

  useEffect(() => {
    setIsLoading(true);
    CartAPI.getCarts().then(({ data }) => {
      setCarts(data);
    }).catch(() => {
      setCarts([]);
    }).finally(() => {
      setIsLoading(false);
    });
  }, []);

  return (
    <>
      <Head>
        <title>Keranjang | Wakaf</title>
      </Head>
      <Container
        maxW='5xl'
        p='6'
        mb='20'
        bg='white'
        boxShadow='2xl'
      >
        <Stack
          direction='row'
          spacing='6'
        >
          <Stack w='full' direction='column' spacing='6'>
            <Text fontWeight='500' fontSize='xl'>
              Keranjang Saya
            </Text>

            <Box
              pos='sticky'
              top='0'
              py='4'
              bg='white'
              borderBottomWidth='3px'
              zIndex='1'
            >
              <Checkbox
                isChecked={isAllSelected}
                onChange={toggleSelectAll}
              >
                Pilih semua
              </Checkbox>
            </Box>

            <Stack
              direction='column'
              spacing='6'
              divider={
                <StackDivider borderColor='gray.200' />
              }
            >
              {isLoading
                ? Array(2).fill(null).map((_, index) => (
                  <Stack key={index} direction='column'>
                    <Stack
                      direction='row'
                      spacing='4'
                      pl='8'
                    >
                      <Skeleton w='75px' h='75px' />
                      <Box>
                        <Skeleton w='150px' h='23px' mb='2' />
                        <Skeleton w='100px' h='18px' />
                      </Box>
                    </Stack>
                    <Flex>
                      <Spacer />
                      <Skeleton w='36px' h='36px' />
                      <Skeleton w='150px' h='36px' ml='5' />
                    </Flex>
                  </Stack>
                ))
                : carts.map((cart) => (
                  <Stack key={cart.id} direction='column'>
                    <Stack direction='row' spacing='4'>
                      <Checkbox
                        isChecked={selected.includes(cart.id)}
                        onChange={() => toggleSelected(cart.id)}
                      />
                      <NextLink href={productUrl(cart.product)} passHref>
                        <Link>
                          <AspectRatio w='75px' ratio={1}>
                            <Image
                              src={cart.product.image?.image_url}
                              fallbackSrc={IMAGE_PLACEHOLDER}
                              alt={cart.product.name}
                              fit='cover'
                              align='center'
                            />
                          </AspectRatio>
                        </Link>
                      </NextLink>
                      <Box>
                        <NextLink href={productUrl(cart.product)} passHref>
                          <Link>
                            {cart.product.name}
                          </Link>
                        </NextLink>
                        <Text fontSize='sm' fontWeight='700'>
                          {money(cart.product.price)}
                        </Text>
                      </Box>
                    </Stack>
                    <Flex>
                      <Spacer />
                      <IconButton
                        aria-label='Delete item'
                        size='sm'
                        colorScheme='red'
                        icon={<BiTrash />}
                        onClick={() => handleDelete(cart.id)}
                      />
                      <Box maxW='150px' ml='5'>
                        <NumberInput
                          value={cart.quantity}
                          min={1}
                          max={cart.product.stock}
                          size='sm'
                          onChange={(quantity) => handleQuantityChange(cart, quantity)}
                        />
                      </Box>
                    </Flex>
                  </Stack>
              ))}
            </Stack>
          </Stack>
          <Box>
            <Box
              pos='sticky'
              top='6'
              w='sm'
              borderWidth='1px'
              borderRadius='md'
              overflow='hidden'
              p='6'
            >
              <Text
                fontWeight='500'
                fontSize='xl'
              >
                Ringkasan belanja
              </Text>
              <Flex mt='6'>
                <Text fontWeight='500'>
                  Total harga ({selected.length} barang)
                </Text>
                <Spacer />
                <Text fontWeight='700'>
                  {money(totalAmount)}
                </Text>
              </Flex>
              <Button
                rounded='none'
                w='full'
                mt='6'
                bg='gray.900'
                color='white'
                textTransform='uppercase'
                _hover={{
                  transform: 'translateY(2px)',
                  boxShadow: 'lg',
                }}
                onClick={handleCheckout}
              >
                Berwakaf sekarang
              </Button>
            </Box>
          </Box>
        </Stack>
      </Container>
    </>
  );
}

CartPage.Layout = PublicLayout;
