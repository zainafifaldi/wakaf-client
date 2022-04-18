import { useState } from 'react';
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
  useColorModeValue,
} from '@chakra-ui/react';
import Head from 'next/head';
import NextLink from 'next/link';
import {
  ViewOffIcon,
  ViewIcon,
} from '@chakra-ui/icons';
import { Field, Formik, Form } from 'formik';

import { User } from 'interfaces/user';
import AuthAPI from 'lib/api/auth';

export default function RegisterPage() {
  const [password, setPassword] = useState<string | ''>('')
  const [passwordConfirmation, setPasswordConfirmation] = useState<string | ''>('')
  const [showPassword, setShowPassword] = useState<boolean | false>(false)
  const [showPasswordConfirmation, setShowPasswordConfirmation] = useState<boolean | false>(false)

  const isInvalidConfirmationPassword = (password !== '' && passwordConfirmation !== '' && password !== passwordConfirmation);

  async function handleRegister(values: User, { setSubmitting }: any) {
    if(password != passwordConfirmation) return;

    try {
      const { data } = await AuthAPI.register(values);
    } catch (error) {
      setSubmitting(false);
      console.log(error);
    }
  }

  return (
    <>
      <Head>
        <title>Daftar | Wakaf</title>
      </Head>
      <Flex
        minH='100vh'
        align='center'
        justify='center'
      >
        <Stack spacing='8' mx='auto' maxW='lg' py='12' px='6'>
          <Stack align='center'>
            <Heading fontSize='2xl'>
              Daftar
            </Heading>
            <Text fontSize='sm' color='gray.600'>
              Daftar untuk dapat mengikuti program wakaf.
            </Text>
          </Stack>
          <Box
            rounded='lg'
            bg={useColorModeValue('white', 'gray.700')}
            boxShadow='lg'
            p='8'
          >
            <Formik
              initialValues={{
                name: '',
                email: '',
                phone_number: '',
                address: '',
                password: ''
              }}
              onSubmit={(values, actions) => handleRegister(values, actions)}
            >
              {(props) => (
                <Form
                  onChange={(e) => {
                    const { name, value } = (e.target as HTMLInputElement)
                    if(name == 'password')
                      setPassword(value)
                  }}
                  >
                  <Stack spacing='4'>
                    <Field name='name'>
                      {({ field }) => (
                        <FormControl id="name" isRequired>
                          <FormLabel>Nama Lengkap</FormLabel>
                          <Input type="text" {...field} />
                        </FormControl>
                      )}
                    </Field>
                    <Field name='email'>
                      {({ field }) => (
                        <FormControl id="email" isRequired>
                          <FormLabel>Alamat Email</FormLabel>
                          <Input type="email" {...field} />
                        </FormControl>
                      )}
                    </Field>
                    <Field name='phone_number'>
                      {({ field }) => (
                        <FormControl id="phone_number" isRequired>
                          <FormLabel>Nomor Handphone</FormLabel>
                          <Input type="text" {...field} />
                        </FormControl>
                      )}
                    </Field>
                    <Field name='address'>
                      {({ field }) => (
                        <FormControl id="address">
                          <FormLabel>Alamat</FormLabel>
                          <Textarea {...field} />
                        </FormControl>
                      )}
                    </Field>
                    <HStack>
                      <Box>
                        <Field name='password'>
                          {({ field }) => (
                            <FormControl id="password" isRequired>
                              <FormLabel>Password</FormLabel>
                              <InputGroup>
                                <Input
                                  type={showPassword ? 'text' : 'password'}
                                  {...field}
                                  />
                                <InputRightElement h={'full'}>
                                  <Button
                                    variant={'ghost'}
                                    onClick={() => setShowPassword((showPassword) => !showPassword)}>
                                    {showPassword ? <ViewIcon /> : <ViewOffIcon />}
                                  </Button>
                                </InputRightElement>
                              </InputGroup>
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
                            <InputRightElement h={'full'}>
                              <Button
                                variant={'ghost'}
                                onClick={() => setShowPasswordConfirmation((showPasswordConfirmation) => !showPasswordConfirmation)}>
                                {showPasswordConfirmation ? <ViewIcon /> : <ViewOffIcon />}
                              </Button>
                            </InputRightElement>
                          </InputGroup>
                          {
                            isInvalidConfirmationPassword &&
                            <FormErrorMessage>Invalid konfirmation password</FormErrorMessage>
                          }
                        </FormControl>
                      </Box>
                    </HStack>
                    <Stack spacing={10} pt={2}>
                      <Button
                        type='submit'
                        loadingText='Mendaftarkan'
                        bg='green.400'
                        color='white'
                        isLoading={props.isSubmitting}
                        _hover={{
                          bg: 'green.500',
                        }}>
                        Daftar
                      </Button>
                    </Stack>
                    <Stack pt={6}>
                      <Text align={'center'}>
                        Sudah pernah mendaftar? <NextLink href=''><Link color={'green.400'} _hover={{ color: 'green.600' }}>Login di sini</Link></NextLink>
                      </Text>
                    </Stack>
                  </Stack>
                </Form>
              )}
            </Formik>
          </Box>
        </Stack>
      </Flex>
    </>
  );
}
