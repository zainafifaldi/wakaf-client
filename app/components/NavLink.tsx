import { useRouter } from 'next/router';
import NextLink from 'next/link';
import { ComponentDefaultProps, Link } from '@chakra-ui/react';
import { ReactNode } from 'react';

interface NavLinkProps extends ComponentDefaultProps {
  href?: string;
  exact?: boolean;
  children?: ReactNode;
}

export default function NavLink({
  href,
  exact = false,
  children,
  ...rest
}: NavLinkProps) {
    const { pathname } = useRouter();
    const isActive = exact ? pathname === href : pathname.startsWith(href);

    if (isActive) {
        rest.className += ' active';
    }

    return (
      <NextLink href={href}>
        <Link {...rest}>
          {children}
        </Link>
      </NextLink>
    );
}