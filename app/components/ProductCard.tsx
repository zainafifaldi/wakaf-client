import {
  AspectRatio,
  Box,
  Image,
  Badge,
  LinkBox,
  LinkOverlay,
  Heading,
  useColorModeValue,
} from '@chakra-ui/react';
import NextLink from 'next/link';

import { money } from 'helpers/number';
import { productUrl } from 'helpers/product';

export default function ProductCard({ product }) {
  return (
    <LinkBox>
      <Box maxW='sm' borderWidth='1px' borderRadius='lg' overflow='hidden'>
        <AspectRatio ratio={1}>
          <Image
            src={product.image ? product.image.image_url : process.env.NEXT_PUBLIC_DEFAULT_PRODUCT_IMAGE}
            // fallbackSrc='https://via.placeholder.com/300'
            alt={product.name}
            fit='cover'
            align='center'
          />
        </AspectRatio>

        <Box p='4'>
          <Box display='flex' alignItems='baseline'>
            <Badge borderRadius='full' px='2' colorScheme='red'>
              Stok habis
            </Badge>
          </Box>

          <Heading
            size='sm'
            my='2'
            fontWeight='500'
            lineHeight='tight'
            title={product.name}
            isTruncated
          >
            <NextLink href={productUrl(product)} passHref>
              <LinkOverlay>
                {product.name}
              </LinkOverlay>
            </NextLink>
          </Heading>

          <Box
            color={useColorModeValue('gray.900', 'gray.400')}
            fontSize='sm'
          >
            {money(product.price)}
          </Box>
        </Box>
      </Box>
    </LinkBox>
  )
}
