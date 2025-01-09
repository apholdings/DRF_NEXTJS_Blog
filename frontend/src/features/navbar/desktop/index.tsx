import Image from 'next/image';
import { RootState } from '@/redux/reducers';
import { useSelector } from 'react-redux';
import AuthLinks from '../auth/AuthLinks';
import GuestLinks from '../guest/GuestLinks';
import Container from './Container';
import Header from './Header';
import NavbarLink from './NavbarLink';
import RightMenuContainer from './RightMenuContainer';

export default function DesktopNavbar() {
  const isAuthenticated = useSelector((state: RootState) => state.auth.isAuthenticated);
  return (
    <Container>
      <Header>
        {/* left side */}
        <div className="flex items-center space-x-6">
          <NavbarLink useHover={false}>
            <Image
              className="h-10 w-auto"
              src="/assets/img/logos/uridium3.png"
              width={512}
              height={512}
              priority
              alt="Home"
            />
          </NavbarLink>
          <NavbarLink href="/contact">Contact</NavbarLink>
          <NavbarLink href="/blog">Blog</NavbarLink>
        </div>
        {/* middle */}
        <div />
        {/* right side */}
        <RightMenuContainer>{isAuthenticated ? <AuthLinks /> : <GuestLinks />}</RightMenuContainer>
      </Header>
    </Container>
  );
}
