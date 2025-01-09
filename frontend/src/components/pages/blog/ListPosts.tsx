import { IPostList } from '@/interfaces/blog/IPost';
import Button from '@/components/Button';
import LoadingMoon from '@/components/loaders/LoadingMoon';
import ListPostCardLoading from '@/components/loaders/ListPostCardLoading';
import ListPostCard from './ListPostCard';

interface ComponentProps {
  posts: IPostList[];
  loading: boolean;
  loadingMore?: boolean;
  loadMore?: any;
  nextUrl?: string | undefined;
  handleDelete?: (slug: string) => Promise<void>;
  loadingDelete?: boolean;
}

export default function ListPosts({
  posts,
  loading,
  loadingMore,
  loadMore,
  nextUrl,
  handleDelete,
  loadingDelete,
}: ComponentProps) {
  return (
    <div>
      {loading ? (
        <ListPostCardLoading />
      ) : (
        <div>
          <ul>
            {posts?.map((post) => (
              <ListPostCard
                key={post?.id}
                post={post}
                handleDelete={handleDelete}
                loadingDelete={loadingDelete}
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
