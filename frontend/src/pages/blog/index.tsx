import FeaturedPosts from '@/components/pages/blog/FeaturedPosts';
import PostsList from '@/components/pages/blog/PostsList';
import CategoriesBar from '@/components/pages/categories/CategoriesBar';
import Layout from '@/hocs/Layout';
import usePostCategories from '@/hooks/usePostCategories';
import usePosts from '@/hooks/usePosts';

export default function Page() {
  const { posts: featuredPosts, loading: loadingFeaturedPosts } = usePosts({ showFeatured: true });
  const { posts, loading } = usePosts({ showFeatured: false });
  const { categories, loading: loadingCategories } = usePostCategories();
  return (
    <div>
      {featuredPosts.length > 0 && (
        <FeaturedPosts posts={featuredPosts} loading={loadingFeaturedPosts} />
      )}
      <CategoriesBar loading={loadingCategories} categories={categories} />
      <PostsList title="Recent posts" posts={posts} loading={loading} />
    </div>
  );
}

Page.getLayout = function getLayout(page: React.ReactElement) {
  return <Layout>{page}</Layout>;
};
