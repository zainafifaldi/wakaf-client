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
  useColorModeValue,
} from '@chakra-ui/react';
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
import buttonStyles from 'styles/forms/buttons.module.scss';

export default function LoginPage() {
  const router = useRouter();

  async function handleLogin(values: UserCredential, { setSubmitting }: any) {
    try {
      const { data } = await AuthAPI.signIn(values);
      ApiClient.saveToken(data);
      router.replace('/');
    } catch (error) {
      console.log(error);
    } finally {
      setSubmitting(false);
    }
  }

  return (
    <>
      <Head>
        <title>Login | Wakaf</title>
      </Head>
      <Flex
        minH='100vh'
        align='center'
        justify='center'
      >
        <Stack spacing='8' mx='auto' maxW='lg' py='12' px='6'>
          <Stack align='center'>
            <Heading fontSize='2xl'>
              Halo :)
            </Heading>
            <Text fontSize='sm' color='gray.600'>
              Yuk masuk. Semoga harimu menyenangkan!
            </Text>
          </Stack>
          <Box
            rounded='lg'
            bg={useColorModeValue('white', 'gray.700')}
            boxShadow='lg'
            p='8'
          >
            <Formik
              initialValues={{ email: '', password: '' }}
              onSubmit={handleLogin}
            >
              {({ isSubmitting }) => (
                <Form>
                  <Stack spacing='4'>
                    <Text fontSize='xs' color='gray.500' align='center'>
                      Masukkan data login kamu di sini...
                    </Text>
                    <Stack spacing='4'>
                      <Field name='email'>
                        {({ field }) => (
                          <InputGroup size='sm'>
                            <InputLeftElement pointerEvents='none'>
                              <CheckIcon color='gray.300' />
                            </InputLeftElement>
                            <Input
                              type='text'
                              placeholder='Username'
                              color='gray.600'
                              {...field}
                            />
                          </InputGroup>
                        )}
                      </Field>
                      <Field name='password'>
                        {({ field }) => (
                          <InputGroup size='sm'>
                            <InputLeftElement pointerEvents='none'>
                              <LockIcon color='gray.300' />
                            </InputLeftElement>
                            <Input
                              type='password'
                              placeholder='Password'
                              color='gray.600'
                              {...field}
                            />
                          </InputGroup>
                        )}
                      </Field>
                    </Stack>
                    <Button
                      type='submit'
                      bg='green.400'
                      color='white'
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
          <NextLink href='/'>
            <a className={buttonStyles.noUnderline}>
              <Text color='green.400' fontSize='xs' _hover={{ color: 'green.600' }}>
                Lupa password? Yuk hubungi admin di sini
              </Text>
            </a>
          </NextLink>
        </Stack>
      </Flex>
    </>
  );
}
