import { useState } from 'react';
import {
  Box,
  Button,
  Flex,
  Heading,
  Input,
  InputGroup,
  InputLeftElement,
  Link,
  StackDivider,
  Stack,
  Text,
  useDisclosure,
  useToast,
} from '@chakra-ui/react';
import Head from 'next/head';
import NextLink from 'next/link';
import { useEffect } from 'react';
import { useRouter } from 'next/router';
import {
  ArrowForwardIcon,
  ArrowLeftIcon,
  PhoneIcon,
} from '@chakra-ui/icons';
import { Field, Formik, Form } from 'formik';

import { PhoneCredential } from 'interfaces/user';
import AuthAPI from 'lib/api/auth';
import useStore from 'store';
import OTPModal from 'components/Login/OTPModal';

export default function LoginPage() {
  const router = useRouter();
  const toast = useToast();
  const isLoggedIn = useStore((state) => state.isLoggedIn());
  const { isOpen, onOpen, onClose } = useDisclosure();
  
  const [showModal, setShowModal] = useState<boolean | false>(false);
  const [phoneNumber, setPhoneNumber] = useState<string | ''>('');

  let callbackUrl = router.query.continue as string;
  callbackUrl = callbackUrl ? decodeURIComponent(callbackUrl) : '/';

  async function handleLogin(values: PhoneCredential, { setSubmitting }: any) {
    try {
      await AuthAPI.signInWithPhone(values);

      setPhoneNumber(values.phone_number);
      setShowModal(true);
      onOpen();
    } catch (error) {
      console.log(error);

      if(error.response?.status === 401) {
        toast({
          title: `Nomor tidak terdaftar`,
          description: `Nomor HP / WhatsApp tidak terdaftar di aplikasi Wakaf. Silakan daftar terlebih dahulu, atau gunakan nomor lain.`,
          status: 'error',
          duration: 7000,
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
    } finally {
      setSubmitting(false);
    }
  }

  useEffect(() => {
    if (isLoggedIn) {
      window.location.href = callbackUrl;
    }
  }, [isLoggedIn]);

  return (
    <>
      <Head>
        <title>Login | Wakaf Pondok Saif Al-Ulum</title>
      </Head>
      <Flex
        minH="100vh"
        align="center"
        justify="center"
      >
        <Stack spacing="8" mx="auto" maxW="lg" py="12" px="6">
          <Stack align="center">
            <Heading fontSize="2xl">
              Masuk
            </Heading>
            <Text fontSize="sm" color="gray.600" align="center">
              Login di sini untuk melanjutkan program Wakaf
            </Text>
          </Stack>
          <Box
            rounded="lg"
            bg="white"
            boxShadow="lg"
            p="8"
          >
            <Formik
              initialValues={{ phone_number: '' }}
              onSubmit={handleLogin}
            >
              {({ isSubmitting }) => (
                <Form>
                  <Stack spacing="4">
                    <Field name="phone_number">
                      {({ field }) => (
                        <InputGroup>
                          <InputLeftElement pointerEvents="none">
                            <PhoneIcon color="gray.300" />
                          </InputLeftElement>
                          <Input
                            type="text"
                            placeholder="Nomor HP (WhatsApp)"
                            color="gray.600"
                            {...field}
                          />
                        </InputGroup>
                      )}
                    </Field>

                    <Stack pt="2">
                      <Button
                        type="submit"
                        loadingText="Mengirim OTP"
                        bg="green.500"
                        color="white"
                        isLoading={isSubmitting}
                        _hover={{
                          bg: 'green.600',
                        }}>
                        Masuk
                      </Button>
                      <StackDivider borderStyle="solid" borderWidth="0.5px" borderColor="gray.200" />
                      <Text align="center" fontSize="sm" fontWeight="500" py="2">Atau</Text>
                      <NextLink href="/auth/login">
                        <Link>
                          <Button
                            width="full"
                            colorScheme="teal"
                            size="sm"
                            fontSize="xs">
                            Masuk menggunakan email & password &nbsp;&nbsp;<ArrowForwardIcon w="5" h="5" />
                          </Button>
                        </Link>
                      </NextLink>
                    </Stack>
                    <StackDivider borderStyle="solid" borderWidth="0.5px" borderColor="gray.200" />
                    <Stack pt="3">
                      <Text align="center">
                        Belum pernah mendaftar?
                        <NextLink href="/auth/register" passHref>
                          <Link
                            ml="2"
                            color="green.400"
                            _hover={{ color: 'green.600' }}
                          >
                            Yuk daftar di sini
                          </Link>
                        </NextLink>
                      </Text>
                    </Stack>
                  </Stack>
                </Form>
              )}
            </Formik>
          </Box>

          <NextLink href="/">
            <Link>
              <Text color="green.400" _hover={{ color: 'green.600' }}>
                <ArrowLeftIcon h="3"/> Kembali ke Halaman Utama
              </Text>
            </Link>
          </NextLink>
        </Stack>
      </Flex>

      {showModal && (
        <OTPModal
          onClose={onClose}
          isOpen={isOpen}
          phoneNumber={phoneNumber}
        />
      )}
    </>
  );
}
