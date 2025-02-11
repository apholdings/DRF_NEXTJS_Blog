import CustomTabs from '@/components/CustomTabs';
import CreatePost from '@/components/pages/blog/CreatePost';
import ListPosts from '@/components/pages/blog/ListPosts';
import Layout from '@/hocs/Layout';
import usePostCategories from '@/hooks/usePostCategories';
import usePosts from '@/hooks/usePosts';
import usePostsAuthor from '@/hooks/usePostsAuthor';
import { IProfile } from '@/interfaces/auth/IProfile';
import { IUser } from '@/interfaces/auth/IUser';
import { RootState } from '@/redux/reducers';
import sanitizeContent from '@/utils/sanitizeContent';
import { CheckBadgeIcon } from '@heroicons/react/24/solid';
import { GetServerSideProps, GetServerSidePropsContext, InferGetServerSidePropsType } from 'next';
import Image from 'next/image';
import Link from 'next/link';
import { useState } from 'react';
import { useSelector } from 'react-redux';

export const getServerSideProps: GetServerSideProps = async (
  context: GetServerSidePropsContext,
) => {
  const { slug } = context.params as { slug: string };

  let user: IUser | null = null;
  let profile: IProfile | null = null;

  try {
    const apiRes = await fetch(`${process.env.API_URL}/api/profile/get/?username=${slug}`, {
      headers: {
        Accept: 'application/json',
        'API-Key': `${process.env.BACKEND_API_KEY}`,
      },
    });
    const data = await apiRes.json();
    if (apiRes.status === 200) {
      user = data.results.user;
      profile = data.results.profile;
    }
  } catch (e) {
    return {
      redirect: {
        destination: '/',
        permanent: false,
      },
    };
  }

  return {
    props: {
      profile,
      user,
    },
  };
};

export default function Page({
  profile,
  user,
}: InferGetServerSidePropsType<typeof getServerSideProps>) {
  const myUser = useSelector((state: RootState) => state.auth.user);

  const social = [
    {
      name: 'Website',
      href: profile?.website,
      icon: <i className="bx bx-globe text-2xl" />,
    },
    {
      name: 'Facebook',
      href: profile?.facebook,
      icon: <i className="bx bxl-facebook text-2xl" />,
    },
    {
      name: 'Instagram',
      href: profile?.instagram,
      icon: <i className="bx bxl-instagram text-2xl" />,
    },
    {
      name: 'LinkedIn',
      href: profile?.linkedin,
      icon: <i className="bx bxl-linkedin text-2xl" />,
    },
    {
      name: 'YouTube',
      href: profile?.youtube,
      icon: <i className="bx bxl-youtube text-2xl" />,
    },
    {
      name: 'Github',
      href: profile?.github,
      icon: <i className="bx bxl-github text-2xl" />,
    },
  ];

  const sanitizedBio = sanitizeContent(profile?.biography);

  const [isExpanded, setIsExpanded] = useState<boolean>(false);

  const toggleExpanded = () => {
    setIsExpanded(!isExpanded);
  };

  const biographyPreview = sanitizedBio.slice(0, 600);
  const shouldShowButton = sanitizedBio.length > 600;

  const isCustomer = user?.role === 'customer';
  const isOwner = myUser?.username === user?.username;

  const { categories, loading: loadingCategories } = usePostCategories();

  // Siempre llama a ambos hooks
  const authorHook = usePostsAuthor({ isOwner });
  const otherUserHook = usePosts({ username: user?.username });

  // Selecciona cuál usar en base a isOwner
  const { posts, loading, loadingMore, loadMore, nextUrl, handleDelete, loadingDelete } = isOwner
    ? authorHook
    : otherUserHook;

  return (
    <div>
      <Image
        width={1920}
        height={1080}
        priority
        className="h-48 w-full object-cover lg:h-64"
        src={profile?.banner_picture?.url || ''}
        alt=""
      />
      <div className="mx-auto max-w-5xl px-4 pb-32 sm:px-6 lg:px-8">
        <div className="-mt-12 sm:flex sm:items-end sm:space-x-5">
          <div className="flex">
            <Image
              width={512}
              height={512}
              className="dark:bg-dark-bg dark:border-dark-border h-24 w-24 rounded-full border bg-white object-cover sm:h-32 sm:w-32"
              src={profile?.profile_picture?.url || ''}
              alt=""
            />
          </div>
          <div className="flex flex-1 items-center justify-between">
            <div className="flex items-center space-x-1">
              <h2 className="text-2xl font-semibold">{user?.username}</h2>
              <CheckBadgeIcon className="h-5 w-auto text-indigo-500" />
            </div>
            <div className="flex items-center space-x-2">
              {social?.map((item) => {
                if (item?.href && item?.href.trim() !== '') {
                  return (
                    <Link
                      target="_blank"
                      rel="noopener noreferrer"
                      key={item?.name}
                      href={item?.href}
                    >
                      {item?.icon}
                    </Link>
                  );
                }

                return null;
              })}
            </div>
          </div>
        </div>
        <div className="relative mt-12 pb-8">
          <p
            className="prose"
            dangerouslySetInnerHTML={{
              __html: isExpanded ? sanitizedBio : biographyPreview,
            }}
          />
          {shouldShowButton && (
            <div>
              {!isExpanded && (
                <div className="dark:from-dark-main absolute bottom-0 h-32 w-full bg-gradient-to-t from-white" />
              )}

              <button
                onClick={toggleExpanded}
                type="button"
                className="absolute bottom-2 right-2 z-10 text-indigo-500 hover:text-indigo-700"
              >
                {isExpanded ? 'View less' : 'View more'}
              </button>
            </div>
          )}
        </div>
        <div className="mt-2">
          <CustomTabs
            titles={isOwner && !isCustomer ? ['Posts', 'Create Post'] : ['Posts']}
            panels={
              isOwner && !isCustomer
                ? [
                    <div className="mt-6" key="posts-author">
                      <ListPosts
                        loading={loading}
                        posts={posts}
                        nextUrl={nextUrl}
                        loadingMore={loadingMore}
                        loadMore={loadMore}
                        handleDelete={handleDelete}
                        loadingDelete={loadingDelete}
                        categories={categories}
                        loadingCategories={loadingCategories}
                      />
                    </div>,
                    <div className="mt-6" key="create-post">
                      <CreatePost categories={categories} loadingCategories={loadingCategories} />
                    </div>,
                  ]
                : [
                    <div className="mt-6" key="posts-customer">
                      <ListPosts
                        loading={loading}
                        posts={posts}
                        nextUrl={nextUrl}
                        loadingMore={loadingMore}
                        loadMore={loadMore}
                        handleDelete={handleDelete}
                        loadingDelete={loadingDelete}
                        categories={categories}
                        loadingCategories={loadingCategories}
                      />
                    </div>,
                  ]
            }
            width="w-full"
          />
        </div>
      </div>
    </div>
  );
}

Page.getLayout = function getLayout(page: React.ReactElement) {
  return <Layout>{page}</Layout>;
};
