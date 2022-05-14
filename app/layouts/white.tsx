import Navbar from 'components/Navbar/NavbarWhite';

export default function Layout({ children }) {
  return (
    <>
      <Navbar />
      {children}
    </>
  );
}
