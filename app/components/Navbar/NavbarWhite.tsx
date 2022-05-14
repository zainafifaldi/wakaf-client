import { ReactNode } from 'react';
import {
  Box,
  Flex,
  Link,
  Text,
} from '@chakra-ui/react';
import NextLink from 'next/link';

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
      h='63px'
      px='4'
      pos='relative'
      display='flex'
      alignItems='center'
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
