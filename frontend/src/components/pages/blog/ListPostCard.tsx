import { IPostList } from '@/interfaces/blog/IPost';
import { RootState } from '@/redux/reducers';
import moment from 'moment';
import Image from 'next/image';
import Link from 'next/link';
import { useState } from 'react';
import { useSelector } from 'react-redux';
import { ICategoryList } from '@/interfaces/blog/ICategory';
import DeletePostModal from './DeletePostModal';
import EditPostModal from './EditPostModal';

interface ComponentProps {
  post: IPostList;
  handleDelete?: (slug: string) => Promise<void>;
  loadingDelete?: boolean;
  categories: ICategoryList[];
  loadingCategories: boolean;
}

export default function ListPostCard({
  post,
  handleDelete,
  loadingDelete,
  categories,
  loadingCategories,
}: ComponentProps) {
  const user = useSelector((state: RootState) => state.auth.user);
  const [openDelete, setOpenDelete] = useState<boolean>(false);
  const [openEdit, setOpenEdit] = useState<boolean>(false);

  const isOwner = user?.username === post?.user?.username;
  return (
    <article key={post.id} className="w-full rounded-lg p-4">
      {post?.thumbnail && (
        <div className="relative aspect-video sm:aspect-[2/1] lg:aspect-square lg:w-64 lg:shrink-0">
          <Image
            alt=""
            width={512}
            height={512}
            src={post?.thumbnail?.url}
            className="absolute inset-0 size-full rounded-2xl bg-gray-50 object-cover"
          />
          <div className="absolute inset-0 rounded-2xl ring-1 ring-inset ring-gray-900/10" />
        </div>
      )}
      <div>
        <div className="flex items-center gap-x-4 text-xs">
          <time dateTime={post?.updated_at} className="text-gray-500">
            {moment(post?.updated_at).fromNow()}
          </time>
          <Link
            href={`/category/${post?.category?.slug}`}
            className="relative z-10 rounded-full bg-gray-50 px-3 py-1.5 font-medium text-gray-600 hover:bg-gray-100"
          >
            {post?.category?.name}
          </Link>
        </div>
        <div className="group relative max-w-xl">
          <h3 className="mt-3 text-lg/6 font-semibold text-gray-900 group-hover:text-gray-600">
            <Link href={`/blog/${post?.slug}`}>
              <span className="absolute inset-0" />
              {post?.title}
            </Link>
          </h3>
          <p className="mt-5 text-sm/6 text-gray-600">{post?.description}</p>
        </div>
        <div className="mt-6 flex border-t border-gray-900/5 pt-6">
          <div className="relative flex items-center gap-x-4">
            <Image
              width={256}
              height={256}
              alt=""
              src={post?.user?.profile_picture?.url}
              className="size-10 rounded-full bg-gray-50 object-cover"
            />
            <div className="text-sm/6">
              <p className="font-semibold text-gray-900">
                <Link href={`/@/${post?.user?.username}`}>
                  <span className="absolute inset-0" />
                  {post?.user?.username}
                </Link>
              </p>
              <p className="text-gray-600">
                {post?.user?.role
                  ? post.user.role.charAt(0).toUpperCase() + post.user.role.slice(1)
                  : ''}
              </p>
            </div>
          </div>
          {isOwner && (
            <div className="ml-auto flex items-center space-x-4">
              {post?.status === 'draft' ? (
                <span className="inline-flex items-center rounded-md bg-gray-50 px-2 py-1 text-xs font-medium text-gray-600 ring-1 ring-inset ring-gray-500/10">
                  Draft
                </span>
              ) : (
                <span className="inline-flex items-center rounded-md bg-green-50 px-2 py-1 text-xs font-medium text-green-600 ring-1 ring-inset ring-green-500/10">
                  Published
                </span>
              )}
              <button
                onClick={() => {
                  setOpenEdit(!openEdit);
                }}
                type="button"
                className="text-sm font-medium text-blue-600 hover:underline"
              >
                Edit
              </button>
              <button
                onClick={() => {
                  setOpenDelete(!openDelete);
                }}
                type="button"
                className="text-sm font-medium text-rose-600 hover:underline"
              >
                Delete
              </button>
            </div>
          )}
        </div>
      </div>
      <DeletePostModal
        open={openDelete}
        setOpen={setOpenDelete}
        post={post}
        handleDelete={handleDelete || (() => Promise.resolve())}
        loadingDelete={loadingDelete || false}
      />
      <EditPostModal
        open={openEdit}
        setOpen={setOpenEdit}
        slug={post?.slug}
        categories={categories}
        loadingCategories={loadingCategories}
      />
    </article>
  );
}

ListPostCard.defaultProps = {
  handleDelete: null,
  loadingDelete: false,
};
