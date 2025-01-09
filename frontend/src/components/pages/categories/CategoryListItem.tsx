import Link from 'next/link';
import { useRouter } from 'next/router';
import slugify from 'react-slugify';

interface ComponentProps {
  category: any;
}

export default function CategoryListItem({ category }: ComponentProps) {
  const router = useRouter();
  const categorySlug = slugify(category?.slug);
  const isActive = router.asPath === `/category/${categorySlug}`;

  return (
    <Link
      href={`/category/${categorySlug}`}
      className={`dark:hover:text-dark-accent text-sm font-black hover:underline hover:underline-offset-4 ${isActive ? 'underline underline-offset-4' : ''}`}
    >
      {category?.name}
    </Link>
  );
}
