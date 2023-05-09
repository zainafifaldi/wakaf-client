import { useState } from 'react';
import {
  Box,
  Button,
  Flex,
  FormControl,
  FormErrorMessage,
  FormLabel,
  Heading,
  HStack,
  Input,
  InputGroup,
  InputRightElement,
  Link,
  Stack,
  Text,
  Textarea,
  useDisclosure,
  useToast,
} from '@chakra-ui/react';
import Head from 'next/head';
import NextLink from 'next/link';
import {
  ArrowLeftIcon,
  ViewIcon,
  ViewOffIcon,
} from '@chakra-ui/icons';
import { Field, Formik, Form } from 'formik';

import { UserRegister } from 'interfaces/user';
import AuthAPI from 'lib/api/auth';
import OTPModal from 'components/Register/OTPModal';

export default function RegisterPage() {
  const toast = useToast();
  const { isOpen, onOpen, onClose } = useDisclosure();
  const [phoneNumber, setPhoneNumber] = useState<string | ''>('')
  const [password, setPassword] = useState<string | ''>('')
  const [passwordConfirmation, setPasswordConfirmation] = useState<string | ''>('')
  const [showPassword, setShowPassword] = useState<boolean | false>(false)
  const [showPasswordConfirmation, setShowPasswordConfirmation] = useState<boolean | false>(false)
  const [showModal, setShowModal] = useState<boolean | false>(false)
  const [phoneNumberConfirmed, setPhoneNumberConfirmed] = useState<boolean | false>(false)
  const [isLoading, setIsLoading] = useState<boolean | false>(false)
  const [modalContent, setModalContent] = useState<string | ''>('confirmation')

  const isInvalidPasswordLen = (password !== '' && password.length < 6);
  const isInvalidConfirmationPassword = (password !== '' && passwordConfirmation !== '' && password !== passwordConfirmation);

  function handlePreRegister() {
    setModalContent("confirmation");
    setPhoneNumberConfirmed(true);
    setShowModal(true);
    onOpen();
  }

  async function handleRegisterWithPhone(values: UserRegister, { setSubmitting }: any) {
    if (password.length < 6 || password != passwordConfirmation) return;

    if (!phoneNumberConfirmed) {
      setSubmitting(false);
      setPhoneNumber(values.phone_number);
      handlePreRegister();
      return;
    }

    setIsLoading(true);

    try {
      const { data } = await AuthAPI.registerWithPhone(values);

      setModalContent('form');
    } catch (error) {
      setSubmitting(false);
      console.log(error);

      if(error.response?.status === 422) {
        toast({
          title: `Data yang dimasukan kurang sesuai`,
          description: `${error.response.data?.error?.message}`,
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
    } finally {
      setIsLoading(false);
    }
  }

  return (
    <>
      <Head>
        <title>Daftar | Wakaf Pondok Saif Al-Ulum</title>
      </Head>
      <Flex
        minH="100vh"
        align="center"
        justify="center"
      >
        <Stack spacing="8" mx="auto" maxW="lg" py="12" px="6">
          <Stack align="center">
            <Heading fontSize="2xl">
              Daftar
            </Heading>
            <Text fontSize="sm" color="gray.600">
              Daftar untuk dapat mengikuti program wakaf.
            </Text>
          </Stack>
          <Box
            rounded="lg"
            bg="white"
            boxShadow="lg"
            p="8"
          >
            <Formik
              initialValues={{
                name: '',
                email: '',
                phone_number: '',
                address: '',
                password: ''
              }}
              onSubmit={(values, actions) => handleRegisterWithPhone(values, actions)}
            >
              {(props) => (
                <Form id="register-form"
                  onChange={(e) => {
                    const { name, value } = (e.target as HTMLInputElement)
                    if (name == 'password')
                      setPassword(value)
                  }}
                  >
                  <Stack spacing="4">
                    <Field name="name">
                      {({ field }) => (
                        <FormControl id="name" isRequired>
                          <FormLabel>Nama Lengkap</FormLabel>
                          <Input type="text" {...field} />
                        </FormControl>
                      )}
                    </Field>
                    <Field name="email">
                      {({ field }) => (
                        <FormControl id="email" isRequired>
                          <FormLabel>Alamat Email</FormLabel>
                          <Input type="email" {...field} />
                        </FormControl>
                      )}
                    </Field>
                    <Field name="phone_number">
                      {({ field }) => (
                        <FormControl id="phone_number" isRequired>
                          <FormLabel>Nomor HP (WhatsApp)</FormLabel>
                          <Input type="text" placeholder="Masukkan nomor WA yang aktif" {...field} />
                        </FormControl>
                      )}
                    </Field>
                    <Field name="address">
                      {({ field }) => (
                        <FormControl id="address">
                          <FormLabel>Alamat</FormLabel>
                          <Textarea {...field} />
                        </FormControl>
                      )}
                    </Field>
                    <HStack>
                      <Box>
                        <Field name="password">
                          {({ field }) => (
                            <FormControl id="password" isRequired isInvalid={isInvalidPasswordLen}>
                              <FormLabel>Password</FormLabel>
                              <InputGroup>
                                <Input
                                  type={showPassword ? 'text' : 'password'}
                                  {...field}
                                  />
                                <InputRightElement h="full">
                                  <Button
                                    variant="ghost"
                                    onClick={() => setShowPassword((showPassword) => !showPassword)}>
                                    {showPassword ? <ViewIcon /> : <ViewOffIcon />}
                                  </Button>
                                </InputRightElement>
                              </InputGroup>
                              {
                                isInvalidPasswordLen &&
                                <FormErrorMessage>Minimum 6 karakter</FormErrorMessage>
                              }
                            </FormControl>
                          )}
                        </Field>
                      </Box>
                      <Box>
                        <FormControl id="password_confirmation" isRequired isInvalid={isInvalidConfirmationPassword}>
                          <FormLabel>Konfirmasi Password</FormLabel>
                          <InputGroup>
                            <Input
                              type={showPasswordConfirmation ? 'text' : 'password'}
                              onChange={(e) => setPasswordConfirmation(e.target.value)}
                              />
                            <InputRightElement h="full">
                              <Button
                                variant="ghost"
                                onClick={() => setShowPasswordConfirmation((showPasswordConfirmation) => !showPasswordConfirmation)}>
                                {showPasswordConfirmation ? <ViewIcon /> : <ViewOffIcon />}
                              </Button>
                            </InputRightElement>
                          </InputGroup>
                          {
                            isInvalidConfirmationPassword &&
                            <FormErrorMessage>Konfirmasi password tidak sama</FormErrorMessage>
                          }
                        </FormControl>
                      </Box>
                    </HStack>
                    <Stack spacing="10" pt="2">
                      <Button
                        type="submit"
                        loadingText="Mendaftarkan"
                        bg="green.500"
                        color="white"
                        isLoading={props.isSubmitting}
                        _hover={{
                          bg: 'green.600',
                        }}>
                        Daftar
                      </Button>
                    </Stack>
                    <Stack pt="6">
                      <Text align="center">
                        Sudah pernah mendaftar?
                        <NextLink href="/auth/login" passHref>
                          <Link
                            ml="2"
                            color="green.400"
                            _hover={{ color: 'green.600' }}
                          >
                            Login di sini
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
          isLoading={isLoading}
          phoneNumber={phoneNumber}
          setPhoneNumberConfirmed={setPhoneNumberConfirmed}
          content={modalContent}
        />
      )}
    </>
  );
}
