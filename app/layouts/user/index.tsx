import { Box, Text } from '@chakra-ui/react';

import NavbarUserLayout from './navbar';

export default function PublicLayout({ children }) {
  return (
    <>
      <NavbarUserLayout />
      {children}
    </>
  );
}
