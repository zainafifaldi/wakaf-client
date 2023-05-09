import {
  Stack,
  StackDivider,
  Flex,
  Modal,
  ModalOverlay,
  ModalContent,
  ModalHeader,
  ModalCloseButton,
  ModalBody,
} from '@chakra-ui/react';

import OtpForm from 'components/Otp/OtpForm';

interface OTPModalProps {
  onClose?: () => void;
  isOpen?: boolean;
  phoneNumber: string;
}

export default function OTPModal({
  onClose,
  isOpen,
  phoneNumber,
}: OTPModalProps) {

  const handleClose = () => {
    onClose();
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
                <OtpForm
                  phoneNumber={phoneNumber}></OtpForm>
              </Stack>
            </Flex>
          </ModalBody>
        </ModalContent>
      </Modal>
    </>
  )
}
