import {
  AspectRatio,
  Stack,
  Flex,
  Image,
  Text,
  Box,
  Link,
  Spacer,
  Badge,
} from '@chakra-ui/react';

import { IMAGE_PLACEHOLDER } from 'lib/constants';
import { money } from 'helpers/number';
import { shortDate } from 'helpers/date';

export default function TransactionCard({ transaction, onOpen }) {
  const firstProduct = transaction.products[0];
  const totalProducts = transaction.products.length;
  const totalAmount = transaction.products.reduce(
    (total, product) => total + product.price * product.quantity,
    0
  );

  return (
    <Stack
      p='4'
      direction='column'
      borderWidth='1px'
      spacing='4'
    >
      <Flex direction='row'>
        <Text color='gray.500'>
          {transaction.transaction_number}
        </Text>
        <Box ml='2'>
          <Badge>
            {transaction.state}
          </Badge>
        </Box>
        <Spacer />
        <Box w='250px' pl='4'>
          <Text fontSize='sm'>
            {shortDate(transaction.created_at)}
          </Text>
        </Box>
      </Flex>
      <Stack direction='row' spacing='4'>
        <Link>
          <AspectRatio w='75px' ratio={1}>
            <Image
              src={firstProduct.image_urls?.[0]}
              fallbackSrc={IMAGE_PLACEHOLDER}
              alt={firstProduct.name}
              fit='cover'
              align='center'
              borderRadius='md'
            />
          </AspectRatio>
        </Link>
        <Box>
          <Text fontWeight='700'>
            {firstProduct.name}
          </Text>
          <Text color='gray.500' fontSize='sm'>
            {firstProduct.quantity} barang x {money(firstProduct.price)}
          </Text>
          {totalProducts > 1 && (
            <Text mt='2' color='gray.500' fontSize='xs'>
              + {totalProducts - 1} wakaf lainnya
            </Text>
          )}
        </Box>
        <Spacer />
        <Flex
          w='250px'
          pl='4'
          alignItems='center'
          borderLeftWidth='1px'
        >
          <Box>
            <Text color='gray.500' fontSize='sm'>
              Total Harga
            </Text>
            <Text fontWeight='700'>
              {money(totalAmount)}
            </Text>
          </Box>
        </Flex>
      </Stack>
      <Flex>
        <Spacer />
        <Link
          color='green.500'
          fontWeight='700'
          fontSize='sm'
          onClick={() => onOpen(transaction)}
        >
          Lihat Detail
        </Link>
      </Flex>
    </Stack>
  )
}
