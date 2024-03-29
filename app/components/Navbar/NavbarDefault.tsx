import { ReactNode } from 'react';
import {
  Box,
  Flex,
  Avatar,
  Link,
  Menu,
  MenuButton,
  MenuList,
  MenuItem,
  MenuDivider,
  Stack,
  Text,
  Icon,
  Badge,
  Button,
} from '@chakra-ui/react';
import { BiCartAlt, BiDonateHeart, BiUser } from 'react-icons/bi';
import NextLink from 'next/link';

import useStore from 'store';

interface NavLinkProps {
  href: string;
  counter?: number;
  children?: ReactNode;
}

function NavLink({ href, counter, children }: NavLinkProps) {
  const displayedCounter = counter > 99 ? '99+' : counter;

  return (
    <NextLink href={href} passHref>
      <Link
        h="14"
        px="4"
        pos="relative"
        display="flex"
        alignItems="center"
        color="white"
        _hover={{
          bg: 'green.600',
        }}
      >
        {children}
        {!!counter && (
          <Badge
            pos="absolute"
            top="2"
            right="1"
            variant="solid"
            colorScheme="red"
          >
            {displayedCounter}
          </Badge>
        )}
      </Link>
    </NextLink>
  )
};

export default function Navbar() {
  const user = useStore((state) => state.user);
  const isLoggedIn = useStore((state) => state.isLoggedIn());
  const cartCount = useStore((state) => state.cartCount);

  return (
    <Box
      pos="relative"
      bg="green.500"
      boxShadow="xl"
      px="4"
      zIndex="1"
    >
      <Flex alignItems="center" justifyContent="space-between">
        <NavLink href="/">
          <Text fontWeight="500">
            Pondok Saif Al-Ulum
          </Text>
        </NavLink>

        <Flex alignItems="center">
          <Stack direction="row" spacing="1">
            <NavLink href="/cart" counter={cartCount}>
              <Icon as={BiCartAlt} w="5" h="5" />
            </NavLink>

            {isLoggedIn
              ? <>
                  <NavLink href="/transaction">
                    <Icon as={BiDonateHeart} w="5" h="5" />
                  </NavLink>
                  <Menu>
                    <MenuButton
                      as={Link}
                      px="4"
                      display="flex"
                      alignItems="center"
                      cursor="pointer"
                      _hover={{
                        bg: 'green.600',
                      }}
                    >
                      <Icon as={BiUser} color="white" w="5" h="5" />
                    </MenuButton>
                    <MenuList alignItems="center" zIndex="2">
                      <Flex px="4" py="2" alignItems="center">
                        <Avatar
                          size="md"
                          src={`https://avatars.dicebear.com/api/micah/${user.name}.svg`}
                        />
                        <Text fontWeight="700" ml="4">
                          {user.name}
                        </Text>
                      </Flex>
                      <MenuDivider />
                      <NextLink href="/auth/logout" passHref>
                        <Link>
                          <MenuItem fontSize="sm">
                            Logout
                          </MenuItem>
                        </Link>
                      </NextLink>
                    </MenuList>
                  </Menu>
                </>
              : <Stack
                  direction="row"
                  h="14"
                  px="4"
                  display="flex"
                  alignItems="center"
                  spacing="4"
                >
                  <NextLink href="/auth/login" passHref>
                    <Button
                      variant="outline"
                      size="sm"
                      color="white"
                      _hover={{
                        bg: 'green.600',
                      }}
                    >
                      Masuk
                    </Button>
                  </NextLink>
                  <NextLink href="/auth/register" passHref>
                    <Button size="sm" color="green.500">
                      Daftar
                    </Button>
                  </NextLink>
                </Stack>
            }
          </Stack>
        </Flex>
      </Flex>
    </Box>
  );
}
