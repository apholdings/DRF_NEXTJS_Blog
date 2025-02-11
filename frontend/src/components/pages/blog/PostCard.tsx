import { IPostList } from '@/interfaces/blog/IPost';
import moment from 'moment';
import Image from 'next/image';
import Link from 'next/link';

interface ComponentProps {
  post: IPostList;
}

export default function PostCard({ post }: ComponentProps) {
  return (
    <article className="flex flex-col items-start justify-between">
      {post?.thumbnail && (
        <div className="relative w-full">
          <Image
            alt=""
            width={512}
            height={512}
            src={post?.thumbnail?.url}
            className="aspect-video w-full rounded-2xl bg-gray-100 object-cover sm:aspect-[2/1] lg:aspect-[3/2]"
          />
          <div className="absolute inset-0 rounded-2xl ring-1 ring-inset ring-gray-900/10" />
        </div>
      )}
      <div className="max-w-xl">
        <div className="mt-8 flex items-center gap-x-4 text-xs">
          <time dateTime={post?.updated_at} className="dark:text-dark-txt text-gray-500">
            {moment(post?.updated_at).fromNow()}
          </time>
          <Link
            href={`/category/${post?.category?.slug}`}
            className="relative z-10 rounded-full bg-gray-50 px-3 py-1.5 font-medium text-gray-600 hover:bg-gray-100"
          >
            {post?.category?.name}
          </Link>
        </div>
        <div className="group relative">
          <h3 className="dark:group-hover:text-dark-txt mt-3 text-lg/6 font-semibold text-gray-900 group-hover:text-gray-600 dark:text-white">
            <Link href={`/blog/${post?.slug}`}>
              <span className="absolute inset-0" />
              {post?.title}
            </Link>
          </h3>
          <p className="dark:text-dark-txt-secondary mt-5 line-clamp-3 text-sm/6 text-gray-600">
            {post?.description}
          </p>
        </div>
        <div className="relative mt-8 flex items-center gap-x-4">
          <Image
            width={256}
            height={256}
            alt=""
            src={post?.user?.profile_picture?.url}
            className="size-10 rounded-full bg-gray-100"
          />
          <div className="text-sm/6">
            <p className="dark:text-dark-txt font-semibold text-gray-900">
              <Link href={`/@/${post?.user?.username}`}>
                <span className="absolute inset-0" />
                {post?.user?.username}
              </Link>
            </p>
            <p className="dark:text-dark-txt-secondary text-gray-600">{post?.user?.role}</p>
          </div>
        </div>
      </div>
    </article>
  );
}
