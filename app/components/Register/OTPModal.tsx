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
  Spacer,
  Text,
  useToast,
} from '@chakra-ui/react';
import { Field, Formik, Form } from 'formik';
import { OTP } from 'interfaces/otp';
import { useRouter } from 'next/router';

import AuthAPI from 'lib/api/auth';
import ApiClient from 'lib/api';

const otpLength = 4;

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
                  <OTPForm
                    phoneNumber={phoneNumber}></OTPForm>
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

interface OTPFormProps {
  phoneNumber: string;
}

function OTPForm({
  phoneNumber,
}: OTPFormProps) {
  const router = useRouter();
  const toast = useToast();
  const [otp, setOtp] = useState<string | ''>('');

  const isValidOtp = (otp.length === otpLength);

  async function handleValidateOTP(values: OTP, { setSubmitting }: any) {
    if (values.otp.length != otpLength) return;
    
    try {
      const { data } = await AuthAPI.validateOTP(values);

      ApiClient.saveToken(data);
      router.replace('/');
    } catch (error) {
      setSubmitting(false);

      console.log(error);

      if(error.response?.status === 401) {
        toast({
          description: `OTP yang dimasukan tidak sesuai`,
          status: 'error',
          duration: 5000,
          isClosable: true,
        });
      } else {
        toast({
          title: `Terjadi kesalahan pada sistem`,
          description: `Mohon coba lagi beberapa saat, atau hubungi tim pengelola.`,
          status: 'error',
          duration: 5000,
          isClosable: true,
        });
      }
    }
  }

  return (
    <>
      <Stack
        px="6"
        py="2"
      >
        <Box textAlign="center">
          <Text fontWeight="500" my="2">
            OTP sudah dikirimkan ke WhatsApp kamu
          </Text>
          <Text fontWeight="800" color="gray">
            {phoneNumber.replace(/(\d{4})(\d{4})(\d+)/, "$1-$2-$3")}
          </Text>
          <Text fontWeight="200" fontSize="xs" fontStyle="italic" my="2">
            Silakan masukkan kode OTP yang kamu terima ke dalam form di bawah ini
          </Text>
          <Formik
            initialValues={{
              otp: '',
              phone_number: phoneNumber,
              action: 1
            }}
            onSubmit={(values, actions) => handleValidateOTP(values, actions)}
          >
            {(props) => (
              <Form id="validate-otp-form"
                onChange={(e) => {
                  const { name, value } = (e.target as HTMLInputElement)
                  if (name == 'otp')
                    setOtp(value)
                }}>
                <Field name="otp">
                  {({ field }) => (
                    <Input
                      name=""
                      variant="flushed"
                      placeholder={otpLength + " Digit Kode OTP"}
                      _placeholder={{
                        fontSize:"lg",
                        fontWeight:300,
                      }}
                      textAlign="center"
                      my="5"
                      fontSize="2xl"
                      fontWeight="700"
                      autoFocus
                      maxLength={otpLength}
                      {...field} />
                  )}
                </Field>
                <Flex mt="2" align="center">
                  <Button
                    type="submit"
                    form="validate-otp-form"
                    w="full"
                    colorScheme="green"
                    loadingText="Memvalidasi OTP"
                    disabled={!isValidOtp || props.isSubmitting}
                    isLoading={props.isSubmitting}
                  >Submit</Button>
                </Flex>
              </Form>
            )}
          </Formik>
        </Box>
      </Stack>
    </>
  )
}
