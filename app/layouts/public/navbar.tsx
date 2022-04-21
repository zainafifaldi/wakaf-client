import { ReactNode } from 'react';
import {
  Box,
  Flex,
  Avatar,
  HStack,
  Link,
  Button,
  Menu,
  MenuButton,
  MenuList,
  MenuItem,
  MenuDivider,
  useDisclosure,
  useColorModeValue,
  Stack,
  useColorMode,
  Center,
  Spacer,
  Text,
  Icon,
} from '@chakra-ui/react';
import { BiCartAlt, BiUser } from 'react-icons/bi';
import NextLink from 'next/link';

import useStore from 'store';

const NavLink = ({ href, children }: { href: string, children: ReactNode }) => (
  <NextLink href={href} passHref>
    <Link
      px='2'
      py='1'
      rounded='md'
      color='white'
      _hover={{
        bg: 'green.600',
      }}
      href={href}
    >
      {children}
    </Link>
  </NextLink>
);

export default function NavbarPublicLayout() {
  const { colorMode, toggleColorMode } = useColorMode();
  const { isOpen, onOpen, onClose } = useDisclosure();
  const user = useStore((state) => state.user);

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
            <NavLink href='/cart'>
              <Icon as={BiCartAlt} />
            </NavLink>

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
                  <p>{user.name}</p>
                </Center>
                <MenuDivider />
                <NextLink href='/logout' passHref>
                  <Link _hover={{ textDecoration: 'none' }}>
                    <MenuItem fontSize='sm'>
                      Logout
                    </MenuItem>
                  </Link>
                </NextLink>
              </MenuList>
            </Menu>
          </Stack>
        </Flex>
      </Flex>
    </Box>
  );
}
