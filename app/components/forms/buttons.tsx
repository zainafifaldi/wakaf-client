import { Button } from '@chakra-ui/react';
import NextLink from 'next/link';
import { MyButtonProps, DefaultProps } from 'interfaces/forms/buttons';

export function MyButton(props: MyButtonProps) {
  return (
    <NextLink href={props.href} passHref>
      <Button
        display={{ base: 'none', md: 'inline-flex' }}
        fontSize={'sm'}
        fontWeight={600}
        color='white'
        bg={props.bg + '.400'}
        _hover={{
          bg: (props.bg + '.500'),
        }}
      >{ props.children }</Button>
    </NextLink>
  );
}

export function MyNextLink(props: MyButtonProps) {
  return (
    <NextLink href={props.href}>
      <Button
        fontSize={'sm'}
        fontWeight={400}
        variant={'NextLink'}
      >{ props.children }</Button>
    </NextLink>
  );
}

MyButton.defaultProps = DefaultProps;
MyNextLink.defaultProps = DefaultProps;
