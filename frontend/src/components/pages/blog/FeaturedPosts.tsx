import { IPostList } from '@/interfaces/blog/IPost';
import ListPostCardLoading from '@/components/loaders/ListPostCardLoading';
import FeaturedPostCard from './FeaturedPostCard';
import PostCardList from './PostCardList';

interface ComponentProps {
  posts: IPostList[];
  loading: boolean;
}

export default function FeaturedPosts({ posts, loading }: ComponentProps) {
  const [featuredPost, ...postsList] = posts;

  return (
    <div className="bg-white py-24 sm:py-28">
      <div className="mx-auto grid max-w-7xl grid-cols-1 gap-x-8 gap-y-12 px-6 sm:gap-y-16 lg:grid-cols-2 lg:px-8">
        {loading ? (
          <ListPostCardLoading showImage={false} />
        ) : (
          <FeaturedPostCard post={featuredPost} />
        )}
        <div className="mx-auto w-full max-w-2xl border-t border-gray-900/10 pt-12 sm:pt-16 lg:mx-0 lg:max-w-none lg:border-t-0 lg:pt-0">
          <div className="-my-12 divide-y divide-gray-900/10">
            {loading ? (
              <ListPostCardLoading showImage={false} />
            ) : (
              postsList.map((post) => <PostCardList key={post?.id} post={post} />)
            )}
          </div>
        </div>
      </div>
    </div>
  );
}
