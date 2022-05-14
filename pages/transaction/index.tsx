import { useEffect, useState } from 'react';
import {
  Stack,
  Container,
  Text,
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
    TransactionAPI.getTransactions().then(({ data }) => {
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
        maxW='5xl'
        p='6'
        mb='20'
        bg='white'
        boxShadow='2xl'
      >
        <Stack w='full' direction='column' spacing='6'>
          <Text fontWeight='500' fontSize='xl'>
            Daftar Transaksi Saya
          </Text>

          <Stack
            direction='column'
            spacing='6'
          >
            {transactions.map((transaction) => (
              <TransactionCard
                key={transaction.id}
                transaction={transaction}
                onOpen={handleOpenTransaction}
              />
            ))}
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
