import {
  Box,
  Image,
  Badge,
  LinkBox,
  LinkOverlay,
  Heading,
  AspectRatio,
} from '@chakra-ui/react';
import Link from 'next/link';

import { money } from 'helpers/number';
import { productUrl } from 'helpers/product';

export default function ProductCard({ product }) {
  return (
    <LinkBox>
      <Box maxW='sm' borderWidth='1px' borderRadius='lg' overflow='hidden'>
        <AspectRatio ratio={1}>
          <Image
            src={product.image?.image_url}
            fallbackSrc='https://via.placeholder.com/300'
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
            fontWeight='semibold'
            lineHeight='tight'
            title={product.name}
            isTruncated
          >
            <Link href={productUrl(product)} passHref>
              <LinkOverlay>
                {product.name}
              </LinkOverlay>
            </Link>
          </Heading>

          <Box fontSize='sm'>
            {money(product.price)}
          </Box>
        </Box>
      </Box>
    </LinkBox>
  )
}
