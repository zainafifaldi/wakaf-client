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
} from '@chakra-ui/react';
import { MoonIcon, SunIcon } from '@chakra-ui/icons';
import NextLink from 'next/link';

const links = [
  {
    title: 'Home',
    url: '/',
  },
  {
    title: 'Cart',
    url: '/cart',
  },
];

const NavLink = ({ href, children }: { href: string, children: ReactNode }) => (
  <NextLink href={href} passHref>
    <Link
      px='2'
      py='1'
      rounded='md'
      _hover={{
        textDecoration: 'none',
        bg: useColorModeValue('gray.200', 'gray.700'),
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
  return (
    <Box
      bg={useColorModeValue('white', 'gray.900')}
      px={4}>
      <Flex h={16} alignItems={'center'} justifyContent={'space-between'}>
        <Box fontWeight='semibold'>
          Pondok Saif Al-Ulum
        </Box>

        <HStack spacing={8} alignItems={'center'}>
          <HStack
            as={'nav'}
            spacing={4}
            display={{ base: 'none', md: 'flex' }}
          >
            {links.map((link) => (
              <NavLink key={link.title} href={link.url}>
                {link.title}
              </NavLink>
            ))}
          </HStack>
        </HStack>

        <Flex alignItems={'center'}>
          <Stack direction={'row'} spacing={7}>
            <Button onClick={toggleColorMode}>
              {colorMode === 'light' ? <MoonIcon /> : <SunIcon />}
            </Button>

            <Menu>
              <MenuButton
                as={Button}
                rounded={'full'}
                variant={'link'}
                cursor={'pointer'}
                minW={0}>
                <Avatar
                  size={'sm'}
                  src={'https://avatars.dicebear.com/api/male/username.svg'}
                />
              </MenuButton>
              <MenuList alignItems={'center'}>
                <br />
                <Center>
                  <Avatar
                    size={'2xl'}
                    src={'https://avatars.dicebear.com/api/male/username.svg'}
                  />
                </Center>
                <br />
                <Center>
                  <p>Username</p>
                </Center>
                <br />
                <MenuDivider />
                <MenuItem>Your Servers</MenuItem>
                <MenuItem>Account Settings</MenuItem>
                <MenuItem>Logout</MenuItem>
              </MenuList>
            </Menu>
          </Stack>
        </Flex>
      </Flex>
    </Box>
  );
}
