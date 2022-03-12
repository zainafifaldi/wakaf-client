import { Button } from '@chakra-ui/react';
import Link from 'next/link';
import { MyButtonProps, DefaultProps } from 'interfaces/forms/buttons';

export function MyButton(props: MyButtonProps) {
  return (
    <Link href={props.href}>
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
    </Link>
  );
}

export function MyLink(props: MyButtonProps) {
  return (
    <Link href={props.href}>
      <Button
        fontSize={'sm'}
        fontWeight={400}
        variant={'link'}
      >{ props.children }</Button>
    </Link>
  );
}

MyButton.defaultProps = DefaultProps;
MyLink.defaultProps = DefaultProps;
