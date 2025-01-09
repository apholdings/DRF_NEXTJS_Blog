import hoverClasses from '@/utils/hoverClass';
import Link from 'next/link';

interface ComponentProps {
  children: React.ReactNode;
  href?: string;
  useHover?: boolean;
}

export default function NavbarLink({ children, href = '/', useHover = true }: ComponentProps) {
  return (
    <Link href={href} className="inline-flex items-center">
      <div className={`${useHover ? hoverClasses : ''}`}>{children}</div>
    </Link>
  );
}

NavbarLink.defaultProps = {
  href: '/',
  useHover: true,
};
