import NavbarLink from '../desktop/NavbarLink';

export default function GuestLinks() {
  return (
    <div className="space-x-2">
      <NavbarLink href="/login">Login</NavbarLink>
      <NavbarLink href="/register">Register</NavbarLink>
    </div>
  );
}
