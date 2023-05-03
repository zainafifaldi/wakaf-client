import { useState } from 'react';
import {
  Stack,
  StackDivider,
  Box,
  Button,
  Flex,
  Input,
  Modal,
  ModalOverlay,
  ModalContent,
  ModalHeader,
  ModalCloseButton,
  ModalBody,
  Skeleton,
  Spacer,
  Text,
} from '@chakra-ui/react';

import { User } from 'interfaces/user';

interface OTPModalProps {
  onClose?: () => void;
  isOpen?: boolean;
  formValues: User;
  onSubmit: (values: User, { setSubmitting }: any) => void;
}

export default function OTPModal({
  onClose,
  isOpen,
  formValues,
  onSubmit,
}: OTPModalProps) {
  const [content, setContent] = useState<string | ''>('confirmation')
  const [isLoading, setIsLoading] = useState<boolean>(false);

  const handleClose = () => {
    setContent('confirmation');
    onClose();
  }

  const handleConfirm = () => {
    setContent('blank');
    setIsLoading(true);
    // setTimeout(() => {
    //   setIsLoading(false);
    //   setContent('form');
    // }, 1000);

    onSubmit(formValues, (x:boolean)=>{});
    setIsLoading(false);
    setContent('form');
  }

  return (
    <>
      <Modal
        isCentered
        size="sm"
        onClose={handleClose}
        isOpen={isOpen}
      >
        <ModalOverlay />
        <ModalContent>
          <ModalHeader>
            Kode OTP
          </ModalHeader>
          <ModalCloseButton />
          <ModalBody pt="0" px="0">
            <Flex>
              <Stack divider={<StackDivider borderWidth="5px" borderColor="gray.200" />}>
                {isLoading &&
                  <Stack
                    px="6"
                    py="2"
                  >
                    <Flex w="250px">
                      <Skeleton w="80px" h="23px" />
                      <Spacer />
                      <Skeleton w="80px" h="23px" />
                      <Spacer />
                      <Skeleton w="80px" h="23px" />
                    </Flex>
                  </Stack>
                }

                {content === 'confirmation' && (
                  <OTPConfirmation
                    onConfirm={handleConfirm}
                    onClose={handleClose}
                    phoneNumber={formValues.phone_number}
                  ></OTPConfirmation>
                )}
                {content === 'form' && (
                  <OTPForm></OTPForm>
                )}
              </Stack>
            </Flex>
          </ModalBody>
        </ModalContent>
      </Modal>
    </>
  )
}

interface OTPConfirmationProps {
  onConfirm: () => void;
  onClose: () => void;
  phoneNumber: string;
}

function OTPConfirmation({
  onConfirm,
  onClose,
  phoneNumber,
}: OTPConfirmationProps) {
  return (
    <>
      <Stack
        px="6"
        py="2"
      >
        <Box textAlign="center">
          <Text fontWeight="500">
            Apakah nomor WhatsApp yang dimasukkan sudah benar?
          </Text>
          <Text fontWeight="200" fontSize="xs" fontStyle="italic" my="2">
            Kamu akan dikirimkan kode OTP melalui nomor WhatsApp di bawah.
          </Text>
          <Text fontWeight="800" fontSize="2xl" my="5">
            {phoneNumber.replace(/(\d{4})(\d{4})(\d+)/, "$1-$2-$3")}
          </Text>
          <StackDivider borderStyle="solid" borderWidth="0.5px" borderColor="gray.200" />
          <Flex mt="3">
            <Button w="180px" colorScheme="green" onClick={onConfirm}>Kirim OTP</Button>
            <Spacer />
            <Button w="140px" colorScheme="gray" onClick={onClose}>Ganti Nomor</Button>
          </Flex>
        </Box>
      </Stack>
    </>
  )
}

function OTPForm() {
  return (
    <>
      <Stack
        px="6"
        py="2"
      >
        <Box textAlign="center">
          <Text fontWeight="500">
            OTP sudah dikirimkan ke WhatsApp kamu
          </Text>
          <Text fontWeight="200" fontSize="xs" fontStyle="italic" my="2">
            Silakan masukkan kode OTP yang kamu terima ke dalam form di bawah ini
          </Text>
          <Input
            variant="flushed"
            placeholder="Kode OTP"
            _placeholder={{
              fontSize:"lg",
              fontWeight:300,
            }}
            textAlign="center"
            my="5"
            fontSize="2xl"
            fontWeight="700"
            autoFocus />
          <Flex mt="2" align="center">
            <Button w="full" colorScheme="green">Submit</Button>
          </Flex>
        </Box>
      </Stack>
    </>
  )
}
