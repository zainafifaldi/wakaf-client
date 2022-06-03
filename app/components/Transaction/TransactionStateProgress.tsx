import {
  Flex,
  Box,
  Icon,
  Tooltip,
} from '@chakra-ui/react';
import { Transaction } from 'interfaces/transaction';
import {
  BiTimeFive,
  BiPackage,
  BiHourglass,
  BiCheckShield,
  BiCheckCircle,
} from 'react-icons/bi';

interface TransactionStateProgressProps {
  transaction: Transaction;
}

export default function TransactionStateProgress({ transaction }: TransactionStateProgressProps) {
  const steps = [
    {
      icon: BiTimeFive,
      title: 'Menunggu Pembayaran',
      isDone: ['waiting_verification', 'paid', 'finished'].includes(transaction.invoice.state),
      isActive: transaction.invoice.state === 'pending',
    },
    {
      icon: BiHourglass,
      title: 'Menunggu Verifikasi',
      isDone: ['paid', 'finished'].includes(transaction.invoice.state),
      isActive: transaction.invoice.state === 'waiting_verification',
    },
    {
      icon: BiCheckShield,
      title: 'Dibayar',
      isDone: ['finished'].includes(transaction.invoice.state),
      isActive: transaction.invoice.state === 'paid',
    },
    {
      icon: BiPackage,
      title: 'Proses Pengelolaan Dana Wakaf',
      isDone: ['finished'].includes(transaction.invoice.state),
      isActive: transaction.state === 'ready',
    },
    {
      icon: BiCheckCircle,
      title: 'Selesai',
      isDone: ['finished'].includes(transaction.invoice.state),
      isActive: false,
    },
  ];

  const stepProgressBar = function () {
    const activeIndex = steps.findIndex(step => step.isActive);
    return ((100 * (activeIndex + 1)) - 100) / (steps.length - 1);
  }

  return (
    <Flex
      justifyContent="space-between"
      m="2"
      pos="relative"
      _before={{
        content: '""',
        height: '2px',
        width: 'full',
        pos: 'absolute',
        top: '50%',
        left: '0',
        bg: 'gray.200',
      }}
      _after={{
        content: '""',
        height: '2px',
        width: `${stepProgressBar()}%`,
        pos: 'absolute',
        top: '50%',
        left: '0',
        bg: 'green.500',
      }}
    >
      {steps.map((step, index) => (
        <Tooltip key={index} label={step.title}>
          <Box
            as={Flex}
            w="7"
            h="7"
            alignItems="center"
            justifyContent="center"
            rounded="full"
            bg={step.isDone || step.isActive ? 'green.500' : 'gray.200'}
            pos="relative"
            borderWidth="3px"
            borderColor="white"
            zIndex="1"
            _before={step.isActive && {
              content: '""',
              pos: 'absolute',
              top: '-3px',
              left: '-3px',
              right: '-3px',
              bottom: '-3px',
              rounded: 'full',
              borderWidth: '1px',
              borderColor: 'green.500',
            }}
          >
            <Icon
              as={step.icon}
              w="4"
              h="4"
              display="block"
              color={step.isDone || step.isActive ? 'white' : 'gray.500'}
            />
          </Box>
        </Tooltip>
      ))}
    </Flex>
  )
}
