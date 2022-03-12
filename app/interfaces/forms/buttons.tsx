export interface MyButtonProps {
  bg: string;
  children: React.ReactNode;
  variant: string;
  href: string;
}

export const DefaultProps: MyButtonProps = {
  bg: null,
  children: null,
  variant: null,
  href: null
}
