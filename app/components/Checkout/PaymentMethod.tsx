import {
  AspectRatio,
  Box,
  Stack,
  Text,
  Image,
  RadioGroup,
  Radio,
} from '@chakra-ui/react';

export default function PaymentMethod() {
  return (
    <Box>
      <Text
        fontWeight='500'
        fontSize='xl'
        mb='6'
      >
        Metode pembayaran
      </Text>
      <RadioGroup defaultValue='muamalat'>
        <Radio
          w='full'
          value='muamalat'
          flexDirection='row-reverse'
          justifyContent='space-between'
        >
          <Stack direction='row' spacing='4' ml='-2'>
            <AspectRatio w='50px' ratio={1}>
              <Image
                src='/images/payment/bank_muamalat.svg'
                alt='Bank Muamalat'
                fit='cover'
                align='center'
              />
            </AspectRatio>
            <Box>
              <Text fontWeight='500'>
                Bank Muamalat
              </Text>
              <Text fontSize='sm'>
                12361273661 (Yayasan Sukma Sejati)
              </Text>
            </Box>
          </Stack>
        </Radio>
      </RadioGroup>
    </Box>
  )
}
