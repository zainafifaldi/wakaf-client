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
import NextLink from 'next/link';

import { Transaction } from 'interfaces/transaction';
import { IMAGE_PLACEHOLDER } from 'lib/constants';
import { money } from 'helpers/number';
import { shortDate } from 'helpers/date';
import { productUrl } from 'helpers/product';
import { stateLabel } from 'helpers/invoice';

interface TransactionCardProps {
  transaction: Transaction;
  onOpen?: Function;
}

export default function TransactionCard({ transaction, onOpen }: TransactionCardProps) {
  const firstProduct = transaction.products[0];
  const totalProducts = transaction.products.length;
  const totalAmount = transaction.products.reduce(
    (total, product) => total + product.price * product.quantity,
    0
  );

  return (
    <Stack
      p="4"
      direction="column"
      borderWidth="1px"
      rounded="md"
      spacing="4"
    >
      <Flex direction="row">
        <Text color="gray.500">
          {transaction.invoice.invoice_number}
        </Text>
        <Box ml="2">
          <Badge>
            {stateLabel(transaction.invoice.state)}
          </Badge>
        </Box>
        <Spacer />
        <Box w="250px" pl="4">
          <Text fontSize="sm">
            {shortDate(transaction.created_at)}
          </Text>
        </Box>
      </Flex>
      <Stack direction="row" spacing="4">
        <NextLink href={productUrl(firstProduct)} passHref>
          <Link>
            <AspectRatio w="75px" ratio={1}>
              <Image
                src={firstProduct.image_urls?.[0]}
                fallbackSrc={IMAGE_PLACEHOLDER}
                alt={firstProduct.name}
                fit="cover"
                align="center"
                rounded="md"
              />
            </AspectRatio>
          </Link>
        </NextLink>
        <Box>
          <NextLink href={productUrl(firstProduct)} passHref>
            <Link fontWeight="700">
              {firstProduct.name}
            </Link>
          </NextLink>
          <Text color="gray.500" fontSize="sm">
            {firstProduct.quantity} barang x {money(firstProduct.price)}
          </Text>
          {totalProducts > 1 && (
            <Text mt="2" color="gray.500" fontSize="xs">
              + {totalProducts - 1} barang lainnya
            </Text>
          )}
        </Box>
        <Spacer />
        <Flex
          w="250px"
          pl="4"
          alignItems="center"
          borderLeftWidth="1px"
        >
          <Box>
            <Text color="gray.500" fontSize="sm">
              Total Harga
            </Text>
            <Text fontWeight="700">
              {money(totalAmount)}
            </Text>
          </Box>
        </Flex>
      </Stack>
      <Flex>
        <Spacer />
        <Link
          color="green.500"
          fontWeight="700"
          fontSize="sm"
          _hover={{
            color: 'green.600'
          }}
          onClick={() => onOpen(transaction)}
        >
          Lihat Detail
        </Link>
      </Flex>
    </Stack>
  )
}
