import Navbar from 'components/Navbar/NavbarWhite';

export default function PublicLayout({ children }) {
  return (
    <>
      <Navbar />
      {children}
    </>
  );
}
