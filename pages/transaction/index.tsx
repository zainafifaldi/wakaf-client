import { useEffect, useState } from 'react';
import {
  Stack,
  Container,
  Box,
  Flex,
  Text,
  Spacer,
  Skeleton,
  useDisclosure,
} from '@chakra-ui/react';
import Head from 'next/head';

import { Transaction } from 'interfaces/transaction';
import TransactionAPI from 'lib/api/transactions';
import Layout from 'layouts/default';
import TransactionCard from 'components/Transaction/TransactionCard';
import TransactionDetailModal from 'components/Transaction/TransactionDetailModal';

export default function TransactionPage() {
  const { isOpen, onOpen, onClose } = useDisclosure();
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const [transactions, setTransactions] = useState<any[]>([]);
  const [selectedTransaction, setSelectedTransaction] = useState<Transaction | null>(null);

  function handleOpenTransaction(transaction: Transaction) {
    setSelectedTransaction(transaction);
    onOpen();
  }

  useEffect(() => {
    setIsLoading(true);
    TransactionAPI.getTransactions({
      with_invoice: true
    }).then(({ data }) => {
      setTransactions(data);
    }).catch(() => {
      setTransactions([]);
    }).finally(() => {
      setIsLoading(false);
    });
  }, []);

  return (
    <>
      <Head>
        <title>Daftar Transaksi | Wakaf</title>
      </Head>
      <Container
        maxW="5xl"
        p="6"
        mb="20"
        bg="white"
        boxShadow="2xl"
      >
        <Stack w="full" direction="column" spacing="6">
          <Text fontWeight="500" fontSize="xl">
            Daftar Transaksi Saya
          </Text>

          <Stack
            direction="column"
            spacing="6"
          >
            {isLoading
              ? Array(2).fill(null).map((_, index) => (
                <Stack
                  key={index}
                  p="4"
                  direction="column"
                  borderWidth="1px"
                  rounded="md"
                  spacing="4"
                >
                  <Flex direction="row">
                    <Skeleton w="150px" h="23px" mr="2" />
                    <Skeleton w="100px" h="23px" />
                    <Spacer />
                    <Box w="250px" pl="4">
                      <Skeleton w="100px" h="23px" />
                    </Box>
                  </Flex>
                  <Stack direction="row" spacing="4">
                    <Skeleton w="75px" h="75px" />
                    <Box>
                      <Skeleton w="150px" h="23px" mb="2" />
                      <Skeleton w="100px" h="18px" />
                    </Box>
                    <Spacer />
                    <Flex
                      w="250px"
                      pl="4"
                      alignItems="center"
                      borderLeftWidth="1px"
                    >
                      <Box>
                        <Skeleton w="75px" h="18px" mb="2" />
                        <Skeleton w="150px" h="23px" />
                      </Box>
                    </Flex>
                  </Stack>
                  <Flex>
                    <Spacer />
                    <Skeleton w="75px" h="23px" />
                  </Flex>
                </Stack>
              ))
              : transactions.map((transaction) => (
                <TransactionCard
                  key={transaction.id}
                  transaction={transaction}
                  onOpen={handleOpenTransaction}
                />
              ))
            }
          </Stack>
        </Stack>
      </Container>

      {selectedTransaction && (
        <TransactionDetailModal
          transaction={selectedTransaction}
          onClose={onClose}
          isOpen={isOpen}
        />
      )}
    </>
  );
}

TransactionPage.Layout = Layout;
