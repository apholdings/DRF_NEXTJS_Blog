import PostsList from '@/components/pages/blog/PostsList';
import CategoriesBar from '@/components/pages/categories/CategoriesBar';
import Header from '@/components/pages/home/Header';
import SEO, { SEOProps } from '@/components/SEO';
import Layout from '@/hocs/Layout';
import usePostCategories from '@/hooks/usePostCategories';
import usePosts from '@/hooks/usePosts';

export default function Home() {
  const SEOList: SEOProps = {
    title: 'Home page',
    description: 'Description here',
    keywords: 'test1, test2, test3',
    href: `${process.env.DOMAIN}/`,
    robots: 'all',
    author: `${process.env.DOMAIN_NAME}`,
    publisher: `${process.env.DOMAIN_NAME}`,
    image: '/assets/img/thumbnails/cursos_online.png',
    twitterHandle: '@boomslag_',
  };

  const { categories, loading: loadingCategories } = usePostCategories();
  const { posts, loading } = usePosts({ showFeatured: false });

  return (
    <div>
      <SEO {...SEOList} />
      <Header />
      <CategoriesBar loading={loadingCategories} categories={categories} />
      <PostsList title="Recent posts" posts={posts} loading={loading} />
    </div>
  );
}

Home.getLayout = function getLayout(page: React.ReactElement) {
  return <Layout>{page}</Layout>;
};
