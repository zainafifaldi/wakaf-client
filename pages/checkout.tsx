import { useEffect, useState } from 'react';
import {
  Flex,
  Spacer,
  Stack,
  StackDivider,
  Container,
  Box,
  Text,
  Checkbox,
  Button,
  FormControl,
  FormLabel,
  Input,
  FormErrorMessage,
} from '@chakra-ui/react';
import Head from 'next/head';
import { useRouter } from 'next/router';
import { Formik, Form, Field } from 'formik';

import CartAPI from 'lib/api/carts';
import TransactionAPI from 'lib/api/transactions';
import UserLayout from 'layouts/user/index';
import { money } from 'helpers/number';
import useStore from 'store';
import CartItem from 'components/Cart/CartItem';
import PaymentMethod from 'components/Checkout/PaymentMethod';

export default function CheckoutPage() {
  const router = useRouter();
  const user = useStore((state) => state.user);
  const [carts, setCarts] = useState<any[]>([]);
  const [selfDonate, setSelfDonate] = useState<boolean>(false);

  const totalAmount = carts.reduce((acc, cart) => {
    return acc + (cart.product.price * cart.quantity);
  }, 0);

  function validateDonorName(value: string) {
    if (!value) {
      return 'Nama harus diisi';
    }
  }

  function validateDonorPhone(value: string) {
    if (value && !/^[0-9]{10,15}$/.test(value)) {
      return 'Nomor telepon tidak valid';
    }
  }

  function validateDonorEmail(value: string) {
    if (value && !/^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,4}$/i.test(value)) {
      return 'Email tidak valid';
    }
  }

  async function handleCheckout(values: any, { setSubmitting }: any) {
    try {
      const cartIds = carts.map((cart) => cart.id);
      const { data } = await TransactionAPI.createTransaction({
        ...values,
        cart_ids: cartIds,
        payment_method: 'transfer',
        bank_name: 'muamalat',
      });
      router.push(`/transaction/${data.id}`);
    } catch (error) {
      console.log(error);
    } finally {
      setSubmitting(false);
    }
  }

  function handleSelfDonate(selfDonate, context) {
    const { setValues } = context;
    setSelfDonate(selfDonate);
    if (selfDonate) {
      setValues({
        donor_name: user.name,
        donor_email: user.email,
        donor_phone_number: user.phone_number,
      });
    } else {
      setValues({
        donor_name: '',
        donor_email: '',
        donor_phone_number: '',
      });
    }
  }

  useEffect(() => {
    if (!router.isReady) return;

    const selectedIds = Array.isArray(router.query.ids) ? router.query.ids : [router.query.ids];
    CartAPI.getCarts({ selected_ids: selectedIds }).then(({ data }) => {
      setCarts(data);
    }).catch(() => {
      router.replace('/');
    });
  }, [router.isReady]);

  return (
    <>
      <Head>
        <title>Checkout | Wakaf</title>
      </Head>
      <Container maxW='5xl' py='8'>
        <Formik
          initialValues={{
            donor_name: '',
            donor_email: '',
            donor_phone_number: '',
          }}
          onSubmit={handleCheckout}
        >
          {(context) => (
            <Form>
              <Stack
                direction='row'
                spacing='12'
              >
                <Stack w='full' direction='column' spacing='6'>
                  <Text
                    fontWeight='500'
                    fontSize='xl'
                  >
                    Checkout
                  </Text>

                  <Stack
                    direction='column'
                    spacing='6'
                    divider={<StackDivider borderWidth='3px' borderColor='gray.200' />}
                  >
                    <Checkbox
                      isChecked={selfDonate}
                      onChange={(e) => handleSelfDonate(e.target.checked, context)}
                    >
                      Berwakaf untuk diri sendiri
                    </Checkbox>
                    <Stack>
                      <Field name='donor_name' validate={validateDonorName}>
                        {({ field, form }) => (
                          <FormControl isInvalid={form.errors.donor_name && form.touched.donor_name}>
                            <FormLabel htmlFor='donor-name'>Nama Pewakaf</FormLabel>
                            <Input
                              id='donor-name'
                              placeholder='Nama Pewakaf'
                              isDisabled={selfDonate}
                              {...field}
                            />
                            <FormErrorMessage>{form.errors.donor_name}</FormErrorMessage>
                          </FormControl>
                        )}
                      </Field>
                      <Field name='donor_phone_number' validate={validateDonorPhone}>
                        {({ field, form }) => (
                          <FormControl isInvalid={form.errors.donor_phone_number && form.touched.donor_phone_number}>
                            <FormLabel htmlFor='donor-phone-number'>Nomor HP Pewakaf</FormLabel>
                            <Input
                              id='donor-phone-number'
                              placeholder='Nomor HP Pewakaf'
                              isDisabled={selfDonate}
                              {...field}
                            />
                            <FormErrorMessage>{form.errors.donor_phone_number}</FormErrorMessage>
                          </FormControl>
                        )}
                      </Field>
                      <Field name='donor_email' validate={validateDonorEmail}>
                        {({ field, form }) => (
                          <FormControl isInvalid={form.errors.donor_email && form.touched.donor_email}>
                            <FormLabel htmlFor='donor-email'>Email Pewakaf</FormLabel>
                            <Input
                              id='donor-email'
                              placeholder='Nomor HP Pewakaf'
                              isDisabled={selfDonate}
                              {...field}
                            />
                            <FormErrorMessage>{form.errors.donor_email}</FormErrorMessage>
                          </FormControl>
                        )}
                      </Field>
                    </Stack>

                    <PaymentMethod />

                    <Stack
                      spacing='4'
                      divider={<StackDivider borderColor='gray.200' />}
                    >
                      {carts.map((cart) => (
                        <CartItem
                          key={cart.id}
                          cart={cart}
                        />
                      ))}
                    </Stack>
                  </Stack>
                </Stack>
                <Box>
                  <Box
                    pos='sticky'
                    top='6'
                    w='sm'
                    bg='white'
                    borderWidth='1px'
                    borderRadius='md'
                    overflow='hidden'
                    p='6'
                  >
                    <Text
                      fontWeight='500'
                      fontSize='xl'
                    >
                      Ringkasan belanja
                    </Text>
                    <Flex mt='6'>
                      <Text fontWeight='500'>
                        Total harga ({carts.length} barang)
                      </Text>
                      <Spacer />
                      <Text fontWeight='700'>
                        {money(totalAmount)}
                      </Text>
                    </Flex>
                    <Button
                      type='submit'
                      rounded='none'
                      w='full'
                      mt='6'
                      bg='gray.900'
                      color='white'
                      textTransform='uppercase'
                      isDisabled={context.isSubmitting}
                      _hover={{
                        transform: 'translateY(2px)',
                        boxShadow: 'lg',
                      }}
                    >
                      Berwakaf sekarang
                    </Button>
                  </Box>
                </Box>
              </Stack>
            </Form>
          )}
        </Formik>
      </Container>
    </>
  );
}

CheckoutPage.Layout = UserLayout;
