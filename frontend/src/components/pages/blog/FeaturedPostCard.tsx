import { IPostList } from '@/interfaces/blog/IPost';
import moment from 'moment';
import Image from 'next/image';
import Link from 'next/link';

interface ComponentProps {
  post: IPostList;
}

export default function FeaturedPostCard({ post }: ComponentProps) {
  return (
    <article className="mx-auto w-full max-w-2xl lg:mx-0 lg:max-w-lg">
      <time dateTime={post?.updated_at} className="block text-sm/6 text-gray-600">
        {moment(post?.updated_at).fromNow()}
      </time>
      <h2
        id="featured-post"
        className="mt-4 text-pretty text-3xl font-semibold tracking-tight text-gray-900 sm:text-4xl"
      >
        {post?.title}
      </h2>
      <p className="mt-4 text-lg/8 text-gray-600">{post?.description}</p>
      <div className="mt-4 flex flex-col justify-between gap-6 sm:mt-8 sm:flex-row-reverse sm:gap-8 lg:mt-4 lg:flex-col">
        <div className="flex">
          <Link
            href={`/blog/${post?.slug}`}
            aria-describedby="featured-post"
            className="text-sm/6 font-semibold text-indigo-600"
          >
            Continue reading <span aria-hidden="true">&rarr;</span>
          </Link>
        </div>
        <div className="flex lg:border-t lg:border-gray-900/10 lg:pt-8">
          <Link
            href={`/@/${post?.user?.username}`}
            className="flex gap-x-2.5 text-sm/6 font-semibold text-gray-900"
          >
            <Image
              width={512}
              height={512}
              alt=""
              src={post?.user?.profile_picture?.url}
              className="size-6 flex-none rounded-full bg-gray-50 object-cover"
            />
            {post?.user?.username}
          </Link>
        </div>
      </div>
    </article>
  );
}
