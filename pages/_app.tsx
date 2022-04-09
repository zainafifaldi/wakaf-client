import { AppProps } from 'next/app';
import { ChakraProvider, extendTheme } from '@chakra-ui/react';
import { FC, useEffect } from 'react';

import AuthAPI from 'library/api/auth';

import 'styles/global.scss';

const colors = {
  brand: {
    900: '#1a365d',
    800: '#153e75',
    700: '#2a69ac',
  },
}

const theme = extendTheme({ colors })

const Noop: FC = ({ children }) => <>{children}</>

export default function App({ Component, pageProps }: AppProps) {
  const Layout = (Component as any).Layout || Noop;

  useEffect(() => {
    AuthAPI.guestIn();
  }, []);

  return (
    <ChakraProvider theme={theme}>
      <Layout pageProps={pageProps}>
        <Component {...pageProps} />
      </Layout>
    </ChakraProvider>
  );
}
