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
  Skeleton,
  FormErrorMessage,
  Tooltip,
  useToast,
} from '@chakra-ui/react';
import Head from 'next/head';
import { useRouter } from 'next/router';
import { Formik, Form, Field } from 'formik';

import CartAPI from 'lib/api/carts';
import TransactionAPI from 'lib/api/transactions';
import { money } from 'helpers/number';
import Layout from 'layouts/white';
import CartItem from 'components/Cart/CartItem';
import PaymentMethod from 'components/Checkout/PaymentMethod';
import useStore from 'store';
import { QuestionIcon } from '@chakra-ui/icons';

export default function CheckoutPage() {
  const router = useRouter();
  const toast = useToast();
  const user = useStore((state) => state.user);
  const isLoggedIn = useStore((state) => state.isLoggedIn());
  const [isLoading, setIsLoading] = useState<boolean>(false);
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
        payment_method: 'bank_transfer_automatic',
        bank_name: 'muamalat',
      });
      localStorage.removeItem('wakaf-checkout-items');
      // router.replace(`/transaction/${data.id}`);
      router.replace(`/transaction`);
    } catch (error) {
      console.log(error);

      if(error.response?.status === 422) {
        toast({
          title: `Kesalahan. Mohon periksa kembali data Anda`,
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
    const checkoutItemIds = JSON.parse(localStorage.getItem('wakaf-checkout-items'));
    if (!router.isReady) {
      return;
    } else if (!checkoutItemIds || checkoutItemIds.length === 0) {
      router.replace('/cart');
      return;
    } else if (!isLoggedIn) {
      const callbackUrl = encodeURIComponent(router.asPath);
      router.replace(`/auth/login?continue=${callbackUrl}`);
      return;
    }

    setIsLoading(true);
    CartAPI.getCarts({ selected_ids: checkoutItemIds }).then(({ data }) => {
      setCarts(data);
    }).catch(() => {
      router.replace('/');
    }).finally(() => {
      setIsLoading(false);
    });
  }, [router.isReady]);

  return (
    <>
      <Head>
        <title>Checkout | Wakaf Pondok Saif Al-Ulum</title>
      </Head>
      <Container maxW="5xl" py="8">
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
                direction="row"
                spacing="12"
              >
                <Stack w="full" direction="column" spacing="6">
                  <Text
                    fontWeight="500"
                    fontSize="xl"
                  >
                    Checkout
                  </Text>

                  <Stack
                    direction="column"
                    spacing="6"
                    divider={<StackDivider borderWidth="3px" borderColor="gray.200" />}
                  >
                    <Checkbox
                      isChecked={selfDonate}
                      onChange={(e) => handleSelfDonate(e.target.checked, context)}
                    >
                      Berwakaf untuk diri sendiri
                    </Checkbox>
                    <Stack>
                      <Field name="donor_name" validate={validateDonorName}>
                        {({ field, form }) => (
                          <FormControl isInvalid={form.errors.donor_name && form.touched.donor_name}>
                            <FormLabel htmlFor="donor-name">Nama Pewakaf</FormLabel>
                            <Input
                              id="donor-name"
                              placeholder="Nama Pewakaf"
                              variant="filled"
                              isDisabled={selfDonate}
                              {...field}
                            />
                            <FormErrorMessage>{form.errors.donor_name}</FormErrorMessage>
                          </FormControl>
                        )}
                      </Field>
                      <Field name="donor_phone_number" validate={validateDonorPhone}>
                        {({ field, form }) => (
                          <FormControl isInvalid={form.errors.donor_phone_number && form.touched.donor_phone_number}>
                            <FormLabel htmlFor="donor-phone-number">Nomor HP Pewakaf</FormLabel>
                            <Input
                              id="donor-phone-number"
                              placeholder="Nomor HP Pewakaf"
                              variant="filled"
                              isDisabled={selfDonate}
                              {...field}
                            />
                            <FormErrorMessage>{form.errors.donor_phone_number}</FormErrorMessage>
                          </FormControl>
                        )}
                      </Field>
                      <Field name="donor_email" validate={validateDonorEmail}>
                        {({ field, form }) => (
                          <FormControl isInvalid={form.errors.donor_email && form.touched.donor_email}>
                            <FormLabel htmlFor="donor-email">Email Pewakaf</FormLabel>
                            <Input
                              id="donor-email"
                              placeholder="Email Pewakaf"
                              variant="filled"
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
                      spacing="4"
                      divider={<StackDivider borderColor="gray.200" />}
                    >
                      {isLoading
                        ? <Stack direction="column">
                            <Stack
                              direction="row"
                              spacing="4"
                            >
                              <Skeleton w="75px" h="75px" />
                              <Box>
                                <Skeleton w="150px" h="23px" mb="2" />
                                <Skeleton w="100px" h="18px" mb="2" />
                                <Skeleton w="80px" h="16px" />
                              </Box>
                            </Stack>
                            <Flex pt="2" justifyContent="space-between">
                              <Skeleton w="60px" h="23px" />
                              <Skeleton w="100px" h="23px" />
                            </Flex>
                          </Stack>
                        : carts.map((cart) => (
                          <CartItem
                            key={cart.id}
                            cart={cart}
                          />
                        ))
                      }
                    </Stack>
                  </Stack>
                </Stack>
                <Box>
                  <Box
                    pos="sticky"
                    top="6"
                    w="sm"
                    bg="white"
                    borderWidth="1px"
                    rounded="md"
                    overflow="hidden"
                    p="6"
                  >
                    <Text
                      fontWeight="500"
                      fontSize="xl"
                    >
                      Ringkasan belanja
                    </Text>
                    <Flex mt="6">
                      <Text fontWeight="500">
                        Total harga ({carts.length} barang)
                      </Text>
                      <Spacer />
                      <Text fontWeight="700">
                        {money(totalAmount)}
                      </Text>
                    </Flex>
                    <Flex mt="6">
                      <Text fontWeight="500">
                        Kode Unik
                      </Text>
                      <Spacer />
                      <Tooltip
                        hasArrow
                        textAlign="center"
                        label={
                          <>
                            <strong>3 digit Kode Unik</strong> akan ditambahkan pada pembayaran wakaf untuk pengecekan transaksi otomatis
                          </>
                        }
                        fontSize='sm'
                      >
                        <QuestionIcon/>
                      </Tooltip>
                    </Flex>
                    <Button
                      type="submit"
                      rounded="none"
                      w="full"
                      mt="6"
                      bg="gray.900"
                      color="white"
                      textTransform="uppercase"
                      isLoading={context.isSubmitting}
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

CheckoutPage.Layout = Layout;
