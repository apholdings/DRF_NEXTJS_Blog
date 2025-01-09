import { IPost } from '@/interfaces/blog/IPost';
import moment from 'moment';
import Link from 'next/link';
import slugify from 'react-slugify';

export default function Header({ post }: { post: IPost | null }) {
  const formattedDate = post?.created_at ? moment(post.created_at).format('MMM Do YYYY') : '';

  return (
    <article className="mx-auto max-w-4xl space-y-12 px-6 py-24">
      <div className="mx-auto w-full space-y-4 text-center">
        <p className="tracki text-xs font-semibold uppercase">
          <Link href={`/category/${slugify(post?.category?.slug)}`}>#{post?.category?.name}</Link>
        </p>
        <h1 className="leadi text-4xl font-bold md:text-5xl">{post?.title}</h1>
        <p className="text-sm dark:text-gray-400">
          by{' '}
          <span className="dark:text-iris-400 text-blue-400 underline">
            <Link href={`/@/${post?.user}`}>{post?.user}</Link>
          </span>{' '}
          on <time dateTime={`${post?.created_at}`}>{formattedDate}</time>
        </p>
      </div>
    </article>
  );
}
