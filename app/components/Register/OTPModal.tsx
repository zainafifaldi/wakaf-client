import {
  Stack,
  StackDivider,
  Box,
  Button,
  Flex,
  Modal,
  ModalOverlay,
  ModalContent,
  ModalHeader,
  ModalCloseButton,
  ModalBody,
  Spacer,
  Text,
} from '@chakra-ui/react';

import OtpForm from 'components/Otp/OtpForm';

interface OTPModalProps {
  onClose?: () => void;
  isOpen?: boolean;
  isLoading?: boolean;
  phoneNumber?: string;
  setPhoneNumberConfirmed: (phoneNumberConfirmed: boolean) => void;
  content?: string;
}

export default function OTPModal({
  onClose,
  isOpen,
  isLoading,
  phoneNumber,
  setPhoneNumberConfirmed,
  content,
}: OTPModalProps) {

  const handleClose = () => {
    setPhoneNumberConfirmed(false);
    onClose();
  }

  return (
    <>
      <Modal
        isCentered
        size="sm"
        onClose={isLoading ? () => {} : handleClose}
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
                {content === 'confirmation' && (
                  <OTPConfirmation
                    onClose={handleClose}
                    phoneNumber={phoneNumber}
                    isLoading={isLoading}></OTPConfirmation>
                )}
                {content === 'form' && (
                  <OtpForm
                    phoneNumber={phoneNumber}></OtpForm>
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
  onClose: () => void;
  phoneNumber: string;
  isLoading: boolean;
}

function OTPConfirmation({
  onClose,
  phoneNumber,
  isLoading,
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
          <Text fontWeight="200" fontSize="xs" fontStyle="italic" my="2" px="10">
            Kamu akan dikirimkan kode OTP melalui nomor WhatsApp di bawah.
          </Text>
          <Text fontWeight="800" fontSize="2xl" my="5">
            {phoneNumber.replace(/(\d{4})(\d{4})(\d+)/, "$1-$2-$3")}
          </Text>
          <StackDivider borderStyle="solid" borderWidth="0.5px" borderColor="gray.200" />
          <Flex mt="3">
            <Button
              type="submit"
              form="register-form"
              w="180px"
              colorScheme="green"
              loadingText="Mengirim OTP"
              isLoading={isLoading}
              autoFocus
            >Kirim OTP</Button>
            <Spacer />
            <Button w="140px" colorScheme="gray" onClick={onClose} disabled={isLoading}>Ganti Nomor</Button>
          </Flex>
        </Box>
      </Stack>
    </>
  )
}
