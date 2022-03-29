import {
  Box,
  Image,
  Badge,
  LinkBox,
  LinkOverlay,
  Heading,
} from '@chakra-ui/react';
import Link from 'next/link';

export default function ProductCard() {
  const product = {
    id: 1,
    imageUrl: 'https://images.unsplash.com/photo-1572635196237-14b3f281503f?ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&ixlib=rb-1.2.1&auto=format&fit=crop&w=4600&q=80',
    imageAlt: 'Rear view of modern home with pool',
    beds: 3,
    baths: 2,
    title: 'Modern home in city center in the heart of historic Los Angeles',
    formattedPrice: 'Rp15.000',
    reviewCount: 34,
    rating: 4,
  }

  return (
    <LinkBox>
      <Box maxW='sm' borderWidth='1px' borderRadius='lg' overflow='hidden'>
        <Image src={product.imageUrl} alt={product.imageAlt} />

        <Box p='4'>
          <Box display='flex' alignItems='baseline'>
            <Badge borderRadius='full' px='2' colorScheme='red'>
              Stok habis
            </Badge>
          </Box>

          <Heading
            size='sm'
            my='2'
            fontWeight='semibold'
            lineHeight='tight'
            title={product.title}
            isTruncated
          >
            <Link href={`/product/${product.id}`} passHref>
              <LinkOverlay>
                {product.title}
              </LinkOverlay>
            </Link>
          </Heading>

          <Box fontSize='sm'>
            {product.formattedPrice}
          </Box>
        </Box>
      </Box>
    </LinkBox>
  )
}
