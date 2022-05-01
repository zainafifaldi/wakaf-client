import { ReactNode } from 'react';
import {
  Box,
  Flex,
  Avatar,
  Link,
  Button,
  Menu,
  MenuButton,
  MenuList,
  MenuItem,
  MenuDivider,
  Stack,
  Center,
  Text,
  Icon,
  Badge,
} from '@chakra-ui/react';
import { BiCartAlt, BiUser } from 'react-icons/bi';
import NextLink from 'next/link';

import useStore from 'store';

interface NavLinkProps {
  href: string;
  counter?: number;
  children: ReactNode;
}

const NavLink = (
  { href, counter, children }: NavLinkProps
) => (
  <NextLink href={href} passHref>
    <Link
      px='2'
      py='1'
      pos='relative'
      rounded='md'
      color='white'
      _hover={{
        bg: 'green.600',
      }}
    >
      {children}
      {!!counter && (
        <Badge
          pos='absolute'
          top='-1'
          right='-1'
          variant='solid'
          colorScheme='red'
        >
          {counter}
        </Badge>
      )}
    </Link>
  </NextLink>
);

export default function NavbarPublicLayout() {
  const user = useStore((state) => state.user);
  const cartCount = useStore((state) => state.cartCount);

  return (
    <Box
      pos='relative'
      bg='green.500'
      boxShadow='xl'
      px='4'
      zIndex='1'
    >
      <Flex h='14' alignItems='center' justifyContent='space-between'>
        <NavLink href='/'>
          <Text fontWeight='500'>
            Pondok Saif Al-Ulum
          </Text>
        </NavLink>

        <Flex alignItems='center'>
          <Stack direction='row' spacing='7'>
            <NavLink href='/cart' counter={cartCount}>
              <Icon as={BiCartAlt} />
            </NavLink>

            {user?.user_id ?
              (
                <Menu>
                  <MenuButton
                    as={Button}
                    rounded='full'
                    variant='link'
                    cursor='pointer'
                    minW='0'
                  >
                    <Icon as={BiUser} color='white' />
                  </MenuButton>
                  <MenuList alignItems='center' zIndex='2'>
                    <Center>
                      <Avatar
                        size='2xl'
                        src='https://avatars.dicebear.com/api/male/username.svg'
                      />
                    </Center>
                    <Center my='4'>
                      <Text>{user.name}</Text>
                    </Center>
                    <MenuDivider />
                    <NextLink href='/logout' passHref>
                      <Link _hover={{ textDecor: 'none' }}>
                        <MenuItem fontSize='sm'>
                          Logout
                        </MenuItem>
                      </Link>
                    </NextLink>
                  </MenuList>
                </Menu>
              )
              :
              (
                <NavLink href='/login'>
                  Sign In
                </NavLink>
              )
            }
          </Stack>
        </Flex>
      </Flex>
    </Box>
  );
}
