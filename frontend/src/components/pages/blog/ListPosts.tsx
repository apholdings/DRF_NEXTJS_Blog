import { IPostList } from '@/interfaces/blog/IPost';
import Button from '@/components/Button';
import LoadingMoon from '@/components/loaders/LoadingMoon';
import ListPostCardLoading from '@/components/loaders/ListPostCardLoading';
import { ICategoryList } from '@/interfaces/blog/ICategory';
import ListPostCard from './ListPostCard';

interface ComponentProps {
  posts: IPostList[];
  loading: boolean;
  loadingMore?: boolean;
  loadMore?: any;
  nextUrl?: string | undefined;
  handleDelete?: (slug: string) => Promise<void>;
  loadingDelete?: boolean;
  categories: ICategoryList[];
  loadingCategories: boolean;
}

export default function ListPosts({
  posts,
  loading,
  loadingMore,
  loadMore,
  nextUrl,
  handleDelete,
  loadingDelete,
  categories,
  loadingCategories,
}: ComponentProps) {
  return (
    <div>
      {loading ? (
        <ListPostCardLoading />
      ) : (
        <div>
          <ul className="space-y-12">
            {posts?.map((post) => (
              <ListPostCard
                key={post?.id}
                post={post}
                handleDelete={handleDelete}
                loadingDelete={loadingDelete}
                categories={categories}
                loadingCategories={loadingCategories}
              />
            ))}
          </ul>
          {nextUrl && (
            <Button onClick={loadMore} disabled={loadingMore} className="mt-4">
              {loadingMore ? <LoadingMoon /> : 'Load More'}
            </Button>
          )}
        </div>
      )}
    </div>
  );
}

ListPosts.defaultProps = {
  loadingMore: false,
  loadMore: null,
  nextUrl: undefined,
  handleDelete: null,
  loadingDelete: false,
};
