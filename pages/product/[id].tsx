import {
  SimpleGrid,
  Flex,
  Stack,
  StackDivider,
  Container,
  Alert,
  AlertIcon,
  Image,
  Box,
  Heading,
  Text,
  List,
  ListItem,
  Button,
  useColorModeValue,
} from '@chakra-ui/react';
import Head from 'next/head';

import PublicLayout from 'layouts/public/index';

export default function Home() {
  return (
    <>
      <Head>
        <title>Modern home in city center in the heart of historic Los Angeles | Wakaf</title>
      </Head>
      <Container maxW='5xl' py='8'>
        <SimpleGrid
          columns={{ base: 1, lg: 2 }}
          spacing={{ base: 8, md: 10 }}
        >
          <Stack direction='column' spacing='6'>
            <Image
              rounded='md'
              alt='product image'
              src='https://images.unsplash.com/photo-1596516109370-29001ec8ec36?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=MnwyODE1MDl8MHwxfGFsbHx8fHx8fHx8fDE2Mzg5MzY2MzE&ixlib=rb-1.2.1&q=80&w=1080'
              fit='cover'
              align='center'
              w='100%'
              h={{ base: '100%', sm: '400px', lg: '500px' }}
            />
            <Flex direction='row' wrap='wrap'>
              {Array(5)
                .fill('')
                .map((_, i) => (
                  <Image
                    key={i}
                    rounded='md'
                    alt='product image'
                    src='https://images.unsplash.com/photo-1596516109370-29001ec8ec36?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=MnwyODE1MDl8MHwxfGFsbHx8fHx8fHx8fDE2Mzg5MzY2MzE&ixlib=rb-1.2.1&q=80&w=1080'
                    boxSize='100px'
                    fit='cover'
                    align='center'
                    mb='6'
                    mr='6'
                  />
                ))}
            </Flex>
          </Stack>
          <Stack spacing={{ base: 6, md: 10 }}>
            <Box as='header'>
              <Alert status='warning' mb='2'>
                <AlertIcon />
                Stok tidak tersedia
              </Alert>
              <Heading
                lineHeight='1.1'
                fontWeight='600'
                fontSize={{ base: '2xl', sm: '4xl', lg: '5xl' }}>
                Automatic Watch
              </Heading>
              <Text
                color={useColorModeValue('gray.900', 'gray.400')}
                fontWeight='300'
                fontSize='2xl'>
                Rp12.000
              </Text>
            </Box>

            <Stack
              spacing={{ base: 4, sm: 6 }}
              direction='column'
              divider={
                <StackDivider borderColor={useColorModeValue('gray.200', 'gray.600')} />
              }
            >
              <Text>
                Lorem ipsum dolor sit amet, consectetur adipisicing elit. Ad
                aliquid amet at delectus doloribus dolorum expedita hic, ipsum
                maxime modi nam officiis porro, quae, quisquam quos
                reprehenderit velit? Natus, totam.
              </Text>

              <Box>
                <Text
                  fontSize={{ base: '16px', lg: '18px' }}
                  color={useColorModeValue('yellow.500', 'yellow.300')}
                  fontWeight='500'
                  textTransform='uppercase'
                  mb='4'
                >
                  Product Details
                </Text>

                <List spacing='2'>
                  <ListItem>
                    <Text as='span' fontWeight='bold'>
                      Between lugs:
                    </Text>{' '}
                    20 mm
                  </ListItem>
                  <ListItem>
                    <Text as='span' fontWeight='bold'>
                      Bracelet:
                    </Text>{' '}
                    leather strap
                  </ListItem>
                  <ListItem>
                    <Text as='span' fontWeight='bold'>
                      Case:
                    </Text>{' '}
                    Steel
                  </ListItem>
                  <ListItem>
                    <Text as='span' fontWeight='bold'>
                      Case diameter:
                    </Text>{' '}
                    42 mm
                  </ListItem>
                  <ListItem>
                    <Text as='span' fontWeight='bold'>
                      Dial color:
                    </Text>{' '}
                    Black
                  </ListItem>
                  <ListItem>
                    <Text as='span' fontWeight='bold'>
                      Crystal:
                    </Text>{' '}
                    Domed, scratch-resistant sapphire crystal with anti-reflective
                    treatment inside
                  </ListItem>
                  <ListItem>
                    <Text as='span' fontWeight='bold'>
                      Water resistance:
                    </Text>{' '}
                    5 bar (50 metres / 167 feet){' '}
                  </ListItem>
                </List>
              </Box>
            </Stack>

            <Button
              rounded='none'
              w='full'
              mt='8'
              size='lg'
              py='7'
              bg={useColorModeValue('gray.900', 'gray.50')}
              color={useColorModeValue('white', 'gray.900')}
              textTransform='uppercase'
              _hover={{
                transform: 'translateY(2px)',
                boxShadow: 'lg',
              }}
            >
              Berwakaf sekarang
            </Button>
          </Stack>
        </SimpleGrid>
      </Container>
    </>
  );
}

Home.Layout = PublicLayout
