import FeaturedPosts from '@/components/pages/blog/FeaturedPosts';
import PostsList from '@/components/pages/blog/PostsList';
import Layout from '@/hocs/Layout';
import usePosts from '@/hooks/usePosts';
import { ICategory } from '@/interfaces/blog/ICategory';
import { GetServerSideProps, GetServerSidePropsContext, InferGetServerSidePropsType } from 'next';
import { useMemo } from 'react';

export const getServerSideProps: GetServerSideProps = async (
  context: GetServerSidePropsContext,
) => {
  const { slug } = context.params as { slug: string };

  let category: ICategory | null = null;

  try {
    const apiRes = await fetch(`${process.env.API_URL}/api/blog/category/?slug=${slug}`, {
      headers: {
        Accept: 'application/json',
        'API-Key': `${process.env.BACKEND_API_KEY}`,
      },
    });
    const data = await apiRes.json();
    if (apiRes.status === 200) {
      category = data.results;
    }
  } catch (e) {
    return {
      redirect: {
        destination: '/404',
        permanent: false,
      },
    };
  }

  return {
    props: {
      slug,
      category,
    },
  };
};

export default function Page({
  slug,
  category,
}: InferGetServerSidePropsType<typeof getServerSideProps>) {
  // Inside your Page component
  const categories = useMemo(() => [slug], [slug]);

  const { posts: featuredPosts, loading: loadingFeaturedPosts } = usePosts({
    showFeatured: true,
    categories,
  });

  const { posts, loading } = usePosts({ showFeatured: false, categories });

  return (
    <div>
      <div className="pt-16">
        <div className="mx-auto grid max-w-7xl grid-cols-1 gap-x-8 gap-y-12 px-6 sm:gap-y-16 lg:grid-cols-2 lg:px-8">
          <h1 className="text-3xl font-bold">Posts for: {category?.name}</h1>
        </div>
      </div>
      {featuredPosts?.length > 0 && (
        <FeaturedPosts posts={featuredPosts} loading={loadingFeaturedPosts} />
      )}
      <PostsList posts={posts} loading={loading} />
    </div>
  );
}

Page.getLayout = function getLayout(page: React.ReactElement) {
  return <Layout>{page}</Layout>;
};
