import moment from 'moment';
import { Post } from '@/interfaces/interfaces';
import Link from 'next/link';
import slugify from 'react-slugify';

export default function Header({ post }: { post: Post | null }) {
  const formattedDate = post?.published ? moment(post.published).format('MMM Do YYYY') : '';

  return (
    <article className="max-w-4xl px-6 py-24 mx-auto space-y-12 ">
      <div className="w-full mx-auto space-y-4 text-center">
        <p className="text-xs font-semibold tracki uppercase">
          <Link href={`/category/${slugify(post?.category?.slug)}`}>#{post?.category?.name}</Link>
        </p>
        <h1 className="text-4xl font-bold leadi md:text-5xl">{post?.title}</h1>
        <p className="text-sm dark:text-gray-400">
          by{' '}
          <span className="underline text-blue-400 dark:text-iris-400 ">
            <span>{post?.author.username}</span>
          </span>{' '}
          on <time dateTime={`${post?.published}`}>{formattedDate}</time>
        </p>
      </div>
</article>
  );
}