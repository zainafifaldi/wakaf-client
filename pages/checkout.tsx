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
  NumberInput,
  NumberInputField,
  NumberInputStepper,
  NumberIncrementStepper,
  NumberDecrementStepper,
  FormControl,
  FormLabel,
  Input,
  Textarea,
  useColorModeValue,
} from '@chakra-ui/react';
import Head from 'next/head';
import { useRouter } from 'next/router';

import CartAPI from 'library/api/carts';
import PublicLayout from 'layouts/public/index';
import { money } from 'helpers/number';

export default function CheckoutPage() {
  const router = useRouter();
  const [carts, setCarts] = useState<any[]>([]);

  const totalAmount = carts.reduce((acc, cart) => {
    return acc + (cart.product.price * cart.quantity);
  }, 0);

  useEffect(() => {
    if (!router.isReady) return;

    const selectedIds = Array.isArray(router.query.ids) ? router.query.ids : [router.query.ids];
    CartAPI.getCarts({ selected_ids: selectedIds }).then(({ data }) => {
      setCarts(data);
    }).catch(() => {
      router.replace('/');
    });
  }, [router]);

  return (
    <>
      <Head>
        <title>Checkout | Wakaf</title>
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
              Checkout
            </Text>

            <Stack
              direction='column'
              spacing='6'
              divider={
                <StackDivider borderColor={useColorModeValue('gray.200', 'gray.600')} />
              }
            >
              <Checkbox>
                Berwakaf untuk diri sendiri
              </Checkbox>
              <Stack>
                <FormControl isRequired>
                  <FormLabel htmlFor='donor-name'>Nama Pewakaf</FormLabel>
                  <Input id='donor-name' placeholder='Nama Pewakaf' />
                </FormControl>
                <FormControl>
                  <FormLabel htmlFor='donor-phone-number'>Nomor HP Pewakaf</FormLabel>
                  <Input id='donor-phone-number' placeholder='Nomor HP Pewakaf' />
                </FormControl>
                <FormControl>
                  <FormLabel htmlFor='donor-phone-number'>Alamat Pewakaf</FormLabel>
                  <Textarea resize='none' rows={3} placeholder='Alamat Pewakaf' />
                </FormControl>
              </Stack>
              {carts.map((cart) => (
                <Stack key={cart.id} direction='row' spacing='4'>
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
                  Total harga ({carts.length} barang)
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

CheckoutPage.Layout = PublicLayout;
