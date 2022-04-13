import React, { useEffect } from 'react';
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
  NumberInput,
  NumberInputField,
  NumberInputStepper,
  NumberIncrementStepper,
  NumberDecrementStepper,
  useColorModeValue,
} from '@chakra-ui/react';
import { DeleteIcon } from '@chakra-ui/icons';
import Head from 'next/head';

import CartAPI from 'library/api/carts';
import PublicLayout from 'layouts/public/index';
import { money } from 'helpers/number';

export default function Cart() {
  const [carts, setCarts] = React.useState<any[]>([]);
  const [selected, setSelected] = React.useState<any[]>([]);

  const totalAmount = selected.reduce((acc, id) => {
    const cart = carts.find(cart => cart.id === id);
    return acc + (cart.product.price * cart.quantity);
  }, 0);

  function toggleSelectAll() {
    if (selected.length === carts.length) {
      setSelected([]);
    } else {
      setSelected(carts.map(cart => cart.id));
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

  function handleDelete(id: number) {
    try {
      CartAPI.deleteCartItem(id);
      setCarts(carts.filter(cart => cart.id !== id));
    } catch (error) {
      console.log(error);
    }
  }

  function handleUpdate(id: number, quantity: number) {
    try {
      CartAPI.updateCartItem(id, quantity);
      setCarts(carts.map(cart =>
        cart.id === id ? { ...cart, quantity } : cart
      ));
    } catch (error) {
      console.log(error);
    }
  }

  useEffect(() => {
    CartAPI.getCarts().then(({ data }) => {
      setCarts(data);
    }).catch(() => {
      setCarts([]);
    });
  }, []);

  return (
    <>
      <Head>
        <title>Keranjang | Wakaf</title>
      </Head>
      <Container maxW='5xl' py='8'>
        <Stack
          direction='row'
          spacing='12'
        >
          <Stack w='full' direction='column' spacing='6'>
            <Text
              fontWeight='500'
              fontSize='xl'
            >
              Keranjang Saya
            </Text>

            <Stack
              direction='column'
              spacing='6'
              divider={
                <StackDivider borderColor={useColorModeValue('gray.200', 'gray.600')} />
              }
            >
              {carts.map((cart) => (
                <Stack key={cart.id} direction='column'>
                  <Stack direction='row' spacing='4'>
                    <Checkbox
                      onChange={() => toggleSelected(cart.id)}
                    />
                    <AspectRatio w='75px' ratio={1}>
                      <Image
                        src={cart.product.image.image_url}
                        fallbackSrc='https://via.placeholder.com/75'
                        alt={cart.product.name}
                        fit='cover'
                        align='center'
                      />
                    </AspectRatio>
                    <Box>
                      <Text>
                        {cart.product.name}
                      </Text>
                      <Text fontSize='sm'>
                        {money(cart.product.price)}
                      </Text>
                    </Box>
                  </Stack>
                  <Flex>
                    <Spacer />
                    <IconButton
                      aria-label='Delete item'
                      size='sm'
                      icon={<DeleteIcon />}
                      onClick={() => handleDelete(cart.id)}
                    />
                    <NumberInput
                      defaultValue={cart.quantity}
                      min={0}
                      max={cart.product.stock}
                      size='sm'
                      maxW='20'
                      ml='6'
                    >
                      <NumberInputField />
                      <NumberInputStepper>
                        <NumberIncrementStepper />
                        <NumberDecrementStepper />
                      </NumberInputStepper>
                    </NumberInput>
                  </Flex>
                </Stack>
              ))}
            </Stack>
          </Stack>
          <Box>
            <Box
              w='sm'
              borderWidth='1px'
              borderRadius='lg'
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
                <Text fontWeight='500'>
                  {money(totalAmount)}
                </Text>
              </Flex>
              <Button
                rounded='none'
                w='full'
                mt='6'
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
            </Box>
          </Box>
        </Stack>
      </Container>
    </>
  );
}

Cart.Layout = PublicLayout;
