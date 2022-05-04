import {
  AspectRatio,
  Stack,
  Box,
  Text,
  Flex,
  Link,
  IconButton,
  Checkbox,
  Image,
  Spacer,
} from '@chakra-ui/react';
import { useState } from 'react';
import { BiTrash } from 'react-icons/bi';
import NextLink from 'next/link';

import { Cart } from 'interfaces/cart';
import { IMAGE_PLACEHOLDER } from 'lib/constants';
import { productUrl } from 'helpers/product';
import { money } from 'helpers/number';
import NumberInput from 'components/Form/NumberInput';

interface CartItemProps {
  cart: Cart;
  isSelected?: boolean;
  editable?: boolean;
  onToggleSelected?: Function;
  onDelete?: Function;
  onQuantityChange?: Function;
}

export default function CartItem(
  { cart, isSelected, editable, onToggleSelected, onDelete, onQuantityChange }: CartItemProps
) {
  const [isUpdating, setIsUpdating] = useState<boolean>(false);
  const totalAmount = cart.quantity * cart.product.price;
  const isOutOfStock = cart.product.stock === 0;

  async function handleDelete() {
    setIsUpdating(true);
    try {
      await onDelete(cart.id);
    } catch (error) {
      console.log(error);
    } finally {
      setIsUpdating(false);
    }
  }

  return (
    <Stack key={cart.id} direction='column'>
      <Stack direction='row' spacing='4'>
        {editable && (
          <Checkbox
            isChecked={isSelected}
            isDisabled={isOutOfStock || cart.quantity > cart.product.stock}
            onChange={() => onToggleSelected(cart.id)}
          />
        )}
        <NextLink href={productUrl(cart.product)} passHref>
          <Link>
            <AspectRatio w='75px' ratio={1}>
              <Image
                src={cart.product.image?.image_url}
                fallbackSrc={IMAGE_PLACEHOLDER}
                alt={cart.product.name}
                fit='cover'
                align='center'
              />
            </AspectRatio>
          </Link>
        </NextLink>
        <Box>
          <NextLink href={productUrl(cart.product)} passHref>
            <Link>
              {cart.product.name}
            </Link>
          </NextLink>
          <Text fontSize='sm' fontWeight='700'>
            {money(cart.product.price)}
          </Text>
          {!editable && (
            <Text color='gray.500' fontSize='xs'>
              {cart.quantity} barang
            </Text>
          )}
        </Box>
      </Stack>
      {editable
        ? <Flex>
            <Spacer />
            <IconButton
              aria-label='Delete item'
              size='sm'
              colorScheme='red'
              isLoading={isUpdating}
              icon={<BiTrash />}
              onClick={handleDelete}
            />
            <Box maxW='150px' ml='5'>
              <NumberInput
                value={cart.quantity}
                min={1}
                max={cart.product.stock}
                isDisabled={isUpdating}
                isInvalid={cart.quantity > cart.product.stock}
                size='sm'
                onChange={(quantity) => onQuantityChange(cart, quantity)}
              />
            </Box>
          </Flex>
        : <Flex pt='2' justifyContent='space-between' fontSize='sm'>
            <Text fontWeight='500'>Subtotal</Text>
            <Text fontWeight='700'>{money(totalAmount)}</Text>
          </Flex>
      }
    </Stack>
  )
}
