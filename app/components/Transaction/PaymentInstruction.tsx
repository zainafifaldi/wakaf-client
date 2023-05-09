import {
  AspectRatio,
  HStack,
  VStack,
  Box,
  Text,
  Image,
  OrderedList,
  ListItem,
  Button,
} from '@chakra-ui/react';

import { Invoice } from 'interfaces/invoice';
import { paymentMethod } from 'helpers/invoice';
import { fullDate } from 'helpers/date';
import { money } from 'helpers/number';
import ButtonCopy from 'components/ButtonCopy';

interface PaymentInstructionProps {
  invoice: Invoice;
}

export default function PaymentInstruction({ invoice }: PaymentInstructionProps) {
  return (
    <VStack
      textAlign="center"
      px="6"
      spacing="6"
    >
      <Text>
        Pembayaran via <strong>{paymentMethod(invoice)}</strong>
      </Text>
      <Box fontSize="sm" mt="6">
        <Text>
          Segera lakukan pembayaran sebelum :
        </Text>
        <Text fontWeight="700">
          {fullDate(invoice.expire_time)}
        </Text>
      </Box>
      <Box>
        <Text>Nominal Transfer :</Text>
        <HStack>
          <Text fontSize="3xl" fontWeight="700">
            {money(invoice.total_amount)}
          </Text>
          <ButtonCopy
            ariaLabel="Copy nominal transfer"
            copyText={invoice.total_amount}
          />
        </HStack>
      </Box>
      <VStack
        spacing="0"
        borderWidth="1px"
        py="4"
        px="6"
        rounded="md"
      >
        <HStack direction="row" spacing="4">
          <AspectRatio w="50px" ratio={1}>
            <Image
              src="/images/payment/bank_muamalat.svg"
              alt="Bank Muamalat"
              fit="cover"
              align="center"
            />
          </AspectRatio>
          <Text fontWeight="500">
            {invoice.payment_detail.name}
          </Text>
        </HStack>
        <HStack>
          <Text fontSize="3xl" fontWeight="700">
            {invoice.payment_detail.number}
          </Text>
          <ButtonCopy
            ariaLabel="Copy nomor rekening"
            copyText={invoice.payment_detail.number}
          />
        </HStack>
        <Text pt="2">
          a.n. <strong>{invoice.payment_detail.behalf}</strong>
        </Text>
      </VStack>

      <Box
        bg="gray.100"
        w="full"
        px="6"
        py="4"
        rounded="md"
        textAlign="left"
      >
        <OrderedList>
          <ListItem>
            Transfer <strong>tepat sesuai dengan jumlah yang tertera</strong> di atas ke rekening yang telah kamu pilih.
          </ListItem>
          <ListItem>
            Sistem akan melakukan <strong>pengecekan secara otomatis</strong> berdasarkan nominal pembayaran.
          </ListItem>
          <ListItem>
            Jika pembayaran belum terkonfirmasi.
            <OrderedList type="a">
              <ListItem>
                Ambil screenshot atau foto bukti transfer.
              </ListItem>
              <ListItem>
                Kirim foto bukti transfer sebelum <strong>{fullDate(invoice.expire_time)}</strong> agar order tidak dibatalkan secara otomatis.
              </ListItem>
            </OrderedList>
          </ListItem>
        </OrderedList>
      </Box>
      {/* <Button w="full" size="lg" colorScheme="green">
        Kirim Bukti Transfer
      </Button> */}
    </VStack>
  )
}
