import { IPostList } from '@/interfaces/blog/IPost';
import Image from 'next/image';
import Link from 'next/link';

interface ComponentProps {
  post: IPostList;
}

export default function PostCardHorizontal({ post }: ComponentProps) {
  const truncatedTitle = post?.title.length > 120 ? `${post?.title.slice(0, 120)}...` : post?.title;
  const truncatedTitleMobile =
    post?.title.length > 69 ? `${post?.title.slice(0, 69)}...` : post?.title;

  return (
    <div className="relative flex w-full flex-col md:flex-row">
      {post?.thumbnail?.url && (
        <div className="dark:bg-dark-bg relative grid w-full place-items-center md:w-5/12">
          <div className="relative h-36 w-full">
            <Image
              src={post?.thumbnail?.url}
              alt={post?.title}
              layout="fill"
              className="object-cover"
            />
          </div>
        </div>
      )}

      <div className="relative flex w-full flex-col md:flex-row">
        <div className="mx-1 my-4 md:-my-1 md:mx-0 md:ml-4">
          <p className="mb-2 text-xs font-semibold text-blue-500">
            <Link
              className="hover:underline hover:underline-offset-4"
              href={`/category/${post?.category?.slug}`}
            >
              {post?.category?.name}
            </Link>
          </p>

          <div className="flex items-center justify-between">
            <h2 className="dark:text-dark-txt mr-4 hidden text-sm font-bold text-gray-800 md:flex">
              <Link href={`/blog/${post?.slug}`}>{truncatedTitle}</Link>
            </h2>
            <h2 className="dark:text-dark-txt flex text-sm font-bold text-gray-800 md:hidden">
              <Link href={`/blog/${post?.slug}`}>{truncatedTitleMobile}</Link>
            </h2>
          </div>

          <p className="dark:text-dark-txt-secondary my-1 mr-12 hidden select-none text-sm text-gray-600 md:flex">
            {post?.description?.length > 46 ? post?.description.slice(0, 200) : post?.description}
          </p>
          <p className="dark:text-dark-txt-secondary my-1 flex select-none text-sm text-gray-600 md:hidden">
            {post?.description?.length > 100
              ? `${post?.description?.slice(0, 100)}...`
              : post?.description}
          </p>
          <div className="mt-2 flex flex-nowrap items-center space-x-2">
            <p className="dark:text-dark-txt-secondary text-xs text-gray-500">
              Created by:{' '}
              <Link
                className="font-semibold text-blue-500 hover:underline hover:underline-offset-4"
                href={`/@/${post?.user?.username}`}
              >
                {post?.user?.username}
              </Link>
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}
