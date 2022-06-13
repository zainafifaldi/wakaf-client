import {
  Flex,
  Box,
  FormControl,
  FormErrorMessage,
  FormLabel,
  HStack,
  Input,
  InputGroup,
  InputRightElement,
  Link,
  Stack,
  Button,
  Heading,
  Text,
  Textarea,
  InputLeftElement,
} from '@chakra-ui/react';
import Head from 'next/head';
import NextLink from 'next/link';
import { useEffect } from 'react';
import { useRouter } from 'next/router';
import {
  LockIcon,
  EmailIcon,
  ArrowLeftIcon,
} from '@chakra-ui/icons';
import { Field, Formik, Form } from 'formik';

import { User } from 'interfaces/user';
import { UserCredential } from 'interfaces/user';
import AuthAPI from 'lib/api/auth';
import ApiClient from 'lib/api';
import useStore from 'store';

export default function LoginPage() {
  const router = useRouter();
  const isLoggedIn = useStore((state) => state.isLoggedIn());
  let callbackUrl = router.query.continue as string;
  callbackUrl = callbackUrl ? decodeURIComponent(callbackUrl) : '/';

  async function handleLogin(values: UserCredential, { setSubmitting }: any) {
    try {
      const { data } = await AuthAPI.signIn(values);
      ApiClient.saveToken(data);
      window.location.href = callbackUrl;
    } catch (error) {
      console.log(error);
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
              initialValues={{ email: '', password: '' }}
              onSubmit={handleLogin}
            >
              {({ isSubmitting }) => (
                <Form>
                  <Stack spacing="4">
                    <Field name="email">
                      {({ field }) => (
                        <InputGroup>
                          <InputLeftElement pointerEvents="none">
                            <EmailIcon color="gray.300" />
                          </InputLeftElement>
                          <Input
                            type="email"
                            placeholder="Email"
                            color="gray.600"
                            {...field}
                          />
                        </InputGroup>
                      )}
                    </Field>
                    <Field name="password">
                      {({ field }) => (
                        <InputGroup>
                          <InputLeftElement pointerEvents="none">
                            <LockIcon color="gray.300" />
                          </InputLeftElement>
                          <Input
                            type="password"
                            placeholder="Password"
                            color="gray.600"
                            {...field}
                          />
                        </InputGroup>
                      )}
                    </Field>

                    {/* <Field name="email">
                      {({ field }) => (
                        <FormControl id="email" isRequired>
                          <FormLabel>Email</FormLabel>
                          <Input type="email" {...field} />
                        </FormControl>
                      )}
                    </Field>
                    <Field name="password">
                      {({ field }) => (
                        <FormControl id="password" isRequired>
                          <FormLabel>Password</FormLabel>
                          <Input type="password" {...field} />
                        </FormControl>
                      )}
                    </Field> */}
                    <Stack spacing="10" pt="2">
                      <Button
                        type="submit"
                        loadingText="Mendaftarkan"
                        bg="green.500"
                        color="white"
                        isLoading={isSubmitting}
                        _hover={{
                          bg: 'green.600',
                        }}>
                        Masuk
                      </Button>
                    </Stack>
                    <Stack pt="6">
                      <Text align="center">
                        Belum pernah mendaftar?
                        <NextLink href="/register" passHref>
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
    </>
  );
}
