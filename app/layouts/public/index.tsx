import { Box, Text } from '@chakra-ui/react';

import Navbar from 'components/Navbar/NavbarDefault';
import Footer from './footer';

export default function PublicLayout({ children }) {
  return (
    <>
      <Navbar />
      <Box
        bg='green.500'
        pt='7'
        pb='9'
        color='white'
        textAlign='center'
        pos='relative'
        _before={{
          content: '""',
          pos: 'absolute',
          bottom: '-12',
          height: '12',
          left: '0',
          right: '0',
          bg: 'green.500',
          zIndex: '-1',
        }}
      >
        <Text
          fontSize='3xl'
          fontWeight='700'
        >
          Berwakaf Semudah Belanja Online!
        </Text>
        <Text>
          Wakaf Pembangunan Masjid & Pesantren Saif al-Ulum
        </Text>
      </Box>
      {children}
      <Footer />
    </>
  );
}
