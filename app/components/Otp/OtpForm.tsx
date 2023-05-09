import { useState } from 'react';
import {
  Stack,
  Box,
  Button,
  Flex,
  Input,
  Text,
  useToast,
} from '@chakra-ui/react';

import { Field, Formik, Form } from 'formik';
import { OTP } from 'interfaces/otp';
import { useRouter } from 'next/router';

import AuthAPI from 'lib/api/auth';
import ApiClient from 'lib/api';

const otpLength = 4;

interface OTPFormProps {
  phoneNumber: string;
}

export default function OtpForm({
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