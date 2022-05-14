import {
  AspectRatio,
  Box,
  Flex,
  Image,
  Badge,
  LinkBox,
  LinkOverlay,
  Text,
} from '@chakra-ui/react';
import NextLink from 'next/link';

import { Product } from 'interfaces/product';
import { IMAGE_PLACEHOLDER } from 'lib/constants';
import { money } from 'helpers/number';
import { productUrl } from 'helpers/product';

interface ProductCardProps {
  product: Product;
}

export default function ProductCard({ product }: ProductCardProps) {
  const isOutOfStock = product.stock === 0;

  return (
    <LinkBox>
      <Box role='group' overflow='hidden' pos='relative'>
        <AspectRatio
          ratio={1}
          _groupHover={{
            filter: 'auto',
            blur: 'sm',
          }}
        >
          <Image
            src={product.image?.image_url}
            fallbackSrc={IMAGE_PLACEHOLDER}
            alt={product.name}
            fit='cover'
            align='center'
            filter={isOutOfStock ? 'grayscale(100%)' : 'none'}
          />
        </AspectRatio>

        {isOutOfStock && (
          <Badge
            pos='absolute'
            px='2'
            top='2'
            right='2'
            zIndex='1'
          >
            Stok habis
          </Badge>
        )}

        <Flex
          p='4'
          pos='absolute'
          top='0'
          bottom='0'
          left='0'
          right='0'
          alignItems='flex-end'
          _before={{
            content: '""',
            pos: 'absolute',
            top: '50%',
            left: '0',
            w: 'full',
            h: 'full',
            bgGradient: 'linear(transparent 0%, blackAlpha.900 100%)',
            transition: 'all 0.2s ease',
          }}
          _hover={{
            _before: {
              top: '0',
              bg: isOutOfStock ? 'gray.700' : 'green.500',
              opacity: '0.8',
            }
          }}
        >
          <Box minW='0' zIndex='1'>
            <Box
              mb='1'
              fontWeight='700'
              lineHeight='tight'
              color='white'
            >
              <NextLink href={productUrl(product)} passHref>
                <LinkOverlay>
                  {product.name}
                </LinkOverlay>
              </NextLink>
            </Box>

            <Text
              color='white'
              fontSize='sm'
            >
              {money(product.price)}
            </Text>
          </Box>
        </Flex>
      </Box>
    </LinkBox>
  )
}
