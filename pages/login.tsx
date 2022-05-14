import {
  Flex,
  Box,
  Input,
  InputGroup,
  InputLeftElement,
  Stack,
  Button,
  Heading,
  Text,
  Link,
} from '@chakra-ui/react';
import { useEffect } from 'react';
import Head from 'next/head';
import NextLink from 'next/link';
import { useRouter } from 'next/router';
import {
  CheckIcon,
  LockIcon,
} from '@chakra-ui/icons';
import { Formik, Form, Field } from 'formik';

import { UserCredential } from 'interfaces/user';
import ApiClient from 'lib/api';
import AuthAPI from 'lib/api/auth';
import useStore from 'store';
import buttonStyles from 'styles/forms/buttons.module.scss';

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
        <title>Login | Wakaf</title>
      </Head>
      <Flex
        minH="100vh"
        align="center"
        justify="center"
      >
        <Stack spacing="8" mx="auto" maxW="lg" py="12" px="6">
          <Stack align="center">
            <Heading fontSize="2xl">
              Halo :)
            </Heading>
            <Text color="gray.600">
              Yuk masuk. Semoga harimu menyenangkan!
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
                    <Text color="gray.500" align="center">
                      Masukkan data login kamu di sini...
                    </Text>
                    <Stack spacing="4">
                      <Field name="email">
                        {({ field }) => (
                          <InputGroup>
                            <InputLeftElement pointerEvents="none">
                              <CheckIcon color="gray.300" />
                            </InputLeftElement>
                            <Input
                              type="text"
                              placeholder="Username"
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
                    </Stack>
                    <Button
                      type="submit"
                      bg="green.400"
                      color="white"
                      isLoading={isSubmitting}
                      _hover={{
                        bg: 'green.500',
                      }}
                    >
                      Sign in
                    </Button>
                  </Stack>
                </Form>
              )}
            </Formik>
          </Box>
          <NextLink href="/" passHref>
            <Link>
              <Text color="green.400" _hover={{ color: 'green.600' }}>
                Lupa password? Yuk hubungi admin di sini
              </Text>
            </Link>
          </NextLink>
        </Stack>
      </Flex>
    </>
  );
}
