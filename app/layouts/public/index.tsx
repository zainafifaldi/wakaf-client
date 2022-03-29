import NavbarPublicLayout from './navbar';

export default function PublicLayout({ children }) {
  return (
    <>
      <NavbarPublicLayout />
      { children }
    </>
  );
}
