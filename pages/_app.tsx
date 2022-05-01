import { AppProps } from 'next/app';
import { ChakraProvider, extendTheme } from '@chakra-ui/react';
import { FC, useEffect } from 'react';

import useStore from 'store';
import ApiClient from 'lib/api';
import CartAPI from 'lib/api/carts';
import 'styles/global.scss';

const colors = {
  brand: {
    900: '#1a365d',
    800: '#153e75',
    700: '#2a69ac',
  },
}

const theme = extendTheme({
  colors,
  styles: {
    global: () => ({
      body: {
        bg: 'gray.50',
      },
    }),
  },
});

const Noop: FC = ({ children }) => <>{children}</>

export default function App({ Component, pageProps }: AppProps) {
  const Layout = (Component as any).Layout || Noop;
  const setUser = useStore((state) => state.setUser);
  const setCartCount = useStore((state) => state.setCartCount);

  useEffect(() => {
    const user = ApiClient.token;
    setUser(user);

    if (user?.user_id) {
      CartAPI.getCarts({ per_page: 1 }).then(({ meta }) => {
        setCartCount(meta.total);
      }).catch((err) => {
        console.log(err);
      });
    }
  }, []);

  return (
    <ChakraProvider theme={theme}>
      <Layout pageProps={pageProps}>
        <Component {...pageProps} />
      </Layout>
    </ChakraProvider>
  );
}
