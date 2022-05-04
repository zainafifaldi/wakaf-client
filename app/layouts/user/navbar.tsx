import { ReactNode } from 'react';
import {
  Box,
  Flex,
  Link,
  Text,
} from '@chakra-ui/react';
import NextLink from 'next/link';

import useStore from 'store';

interface NavLinkProps {
  href: string;
  counter?: number;
  children: ReactNode;
}

const NavLink = (
  { href, children }: NavLinkProps
) => (
  <NextLink href={href} passHref>
    <Link
      px='2'
      py='1'
      pos='relative'
      rounded='md'
      color='green.500'
      _hover={{
        bg: 'gray.100',
      }}
    >
      {children}
    </Link>
  </NextLink>
);

export default function NavbarPublicLayout() {
  const user = useStore((state) => state.user);

  return (
    <Box
      pos='relative'
      bg='white'
      borderBottomWidth='1px'
      px='4'
      zIndex='1'
    >
      <Flex h='14' alignItems='center' justifyContent='space-between'>
        <NavLink href='/'>
          <Text fontWeight='500'>
            Pondok Saif Al-Ulum
          </Text>
        </NavLink>
      </Flex>
    </Box>
  );
}
