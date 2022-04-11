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

import PublicLayout from 'layouts/public/index';

export default function Cart() {
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
              {Array(5).fill(0).map((_, i) => (
                <Stack key={i} direction='column'>
                  <Stack direction='row' spacing='4'>
                    <Checkbox />
                    <AspectRatio w='75px' ratio={1}>
                      <Image
                        src='https://via.placeholder.com/75'
                        fallbackSrc='https://via.placeholder.com/75'
                        alt='lorem ipsum'
                        fit='cover'
                        align='center'
                      />
                    </AspectRatio>
                    <Box>
                      <Text>
                        Contoh produk A
                      </Text>
                      <Text
                        fontSize='sm'
                      >
                        Rp20.000
                      </Text>
                    </Box>
                  </Stack>
                  <Flex>
                    <Spacer />
                    <IconButton
                      aria-label='Delete item'
                      size='sm'
                      icon={<DeleteIcon />}
                    />
                    <NumberInput
                      defaultValue={1}
                      min={0}
                      max={20}
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
                  Total harga (2 barang)
                </Text>
                <Spacer />
                <Text fontWeight='500'>
                  Rp20.000
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
