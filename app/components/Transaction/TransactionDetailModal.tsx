import {
  AspectRatio,
  Stack,
  StackDivider,
  Flex,
  Box,
  Spacer,
  Modal,
  ModalOverlay,
  ModalContent,
  ModalHeader,
  ModalCloseButton,
  ModalBody,
  Text,
  Link,
  Image,
} from '@chakra-ui/react';
import NextLink from 'next/link';

import { Transaction } from 'interfaces/transaction';
import { IMAGE_PLACEHOLDER } from 'lib/constants';
import { dateTime } from 'helpers/date';
import { money } from 'helpers/number';
import { productUrl } from 'helpers/product';
import { paymentMethod, stateLabel } from 'helpers/invoice';

import PaymentInstruction from './PaymentInstruction';
import TransactionStateProgress from './TransactionStateProgress';

interface TransactionDetailModalProps {
  transaction: Transaction;
  onClose?: () => void;
  isOpen?: boolean;
}

export default function TransactionDetailModal({
  transaction,
  onClose,
  isOpen,
}: TransactionDetailModalProps) {
  const isPendingTransaction = transaction.invoice.state === 'pending';

  return (
    <>
      <Modal
        isCentered
        size="4xl"
        onClose={onClose}
        isOpen={isOpen}
      >
        <ModalOverlay />
        <ModalContent>
          <ModalHeader>
            Detail Transaksi
          </ModalHeader>
          <ModalCloseButton />
          <ModalBody pt="0" px="0">
            <Flex>
              <Stack divider={<StackDivider borderWidth="5px" borderColor="gray.200" />}>
                <Stack
                  px="6"
                  py="2"
                  divider={<StackDivider borderStyle="dashed" borderColor="gray.200" />}
                >
                  <Flex justifyContent="space-between" alignItems="center">
                    <Text fontWeight="700">
                      {stateLabel(transaction.invoice.state)}
                    </Text>
                    <Box w="200px">
                      <TransactionStateProgress transaction={transaction} />
                    </Box>
                  </Flex>
                  <Box>
                    <Flex justifyContent="space-between">
                      <Text color="gray.500">
                        No. Invoice
                      </Text>
                      <Text fontWeight="700">
                        {transaction.invoice.invoice_number}
                      </Text>
                    </Flex>
                    <Flex justifyContent="space-between">
                      <Text color="gray.500">
                        Tanggal Transaksi
                      </Text>
                      <Text>
                        {dateTime(transaction.created_at)}
                      </Text>
                    </Flex>
                  </Box>
                </Stack>

                <Stack px="6" py="2" spacing="2">
                  <Text fontWeight="700">
                    Detail Produk
                  </Text>
                  {transaction.products.map((product) => (
                    <Stack
                      key={product.id}
                      direction="row"
                      borderWidth="1px"
                      rounded="md"
                      spacing="4"
                      p="4"
                    >
                      <NextLink href={productUrl(product)} passHref>
                        <Link>
                          <AspectRatio w="50px" ratio={1}>
                            <Image
                              src={product.image_urls?.[0]}
                              fallbackSrc={IMAGE_PLACEHOLDER}
                              alt={product.name}
                              fit="cover"
                              align="center"
                              rounded="md"
                            />
                          </AspectRatio>
                        </Link>
                      </NextLink>
                      <Box>
                        <NextLink href={productUrl(product)} passHref>
                          <Link fontWeight="700">
                            {product.name}
                          </Link>
                        </NextLink>
                        <Text color="gray.500" fontSize="sm">
                          {product.quantity} barang x {money(product.price)}
                        </Text>
                      </Box>
                      <Spacer />
                      <Flex
                        justifyContent="flex-end"
                        w="150px"
                        pl="4"
                        alignItems="center"
                        borderLeftWidth="1px"
                        borderLeftStyle="dashed"
                      >
                        <Box textAlign="right">
                          <Text color="gray.500" fontSize="sm">
                            Total Harga
                          </Text>
                          <Text fontWeight="700">
                            {money(product.quantity * product.price)}
                          </Text>
                        </Box>
                      </Flex>
                    </Stack>
                  ))}
                </Stack>

                <Stack px="6" py="2" spacing="2">
                  <Text fontWeight="700">
                    Info Pewakaf
                  </Text>
                  <Stack direction="row" divider={<Text mx="2">:</Text>}>
                    <Text color="gray.500" minW="180px">
                      Nama Pewakaf
                    </Text>
                    <Text>
                      {transaction.donor_name}
                    </Text>
                  </Stack>
                  <Stack direction="row" divider={<Text mx="2">:</Text>}>
                    <Text color="gray.500" minW="180px">
                      Nomor HP Pewakaf
                    </Text>
                    <Text>
                      {transaction.donor_phone_number}
                    </Text>
                  </Stack>
                  <Stack direction="row" divider={<Text mx="2">:</Text>}>
                    <Text color="gray.500" minW="180px">
                      Email Pewakaf
                    </Text>
                    <Text>
                      {transaction.donor_email}
                    </Text>
                  </Stack>
                </Stack>

                <Stack px="6" py="2" spacing="2">
                  <Text fontWeight="700">
                    Rincian Pembayaran
                  </Text>
                  <Stack divider={<StackDivider borderStyle="dashed" />}>
                    <Stack direction="row">
                      <Text color="gray.500">
                        Metode Pembayaran
                      </Text>
                      <Spacer />
                      <Text>
                        {paymentMethod(transaction.invoice)}
                      </Text>
                    </Stack>
                    <Stack direction="row">
                      <Text color="gray.500">
                        Total Harga ({transaction.products.length} barang)
                      </Text>
                      <Spacer />
                      <Text>
                        {money(transaction.invoice.amount)}
                      </Text>
                    </Stack>
                    <Stack direction="row">
                      <Text fontWeight="700">
                        Total Wakaf
                      </Text>
                      <Spacer />
                      <Text fontWeight="700">
                        {money(transaction.invoice.amount)}
                      </Text>
                    </Stack>
                  </Stack>
                </Stack>
              </Stack>

              {isPendingTransaction && (
                <Box w="lg" borderLeftWidth="1px">
                  <PaymentInstruction invoice={transaction.invoice} />
                </Box>
              )}
            </Flex>
          </ModalBody>
        </ModalContent>
      </Modal>
    </>
  )
}
