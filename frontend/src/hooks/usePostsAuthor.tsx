import { ToastError, ToastSuccess } from '@/components/toast/alerts';
import { IPostList } from '@/interfaces/blog/IPost';
import fetchAuthorPosts, { FetchAuthorPostsProps } from '@/utils/api/blog/post/author/list';
import deletePost from '@/utils/api/blog/post/delete';
import { useCallback, useEffect, useState } from 'react';

interface ComponentProps {
  isOwner: boolean;
}

export default function usePostsAuthor({ isOwner }: ComponentProps) {
  const [posts, setPosts] = useState<IPostList[]>([]);
  const [loading, setLoading] = useState<boolean>(false);
  const [count, setCount] = useState<number>(0);
  const [nextUrl, setNextUrl] = useState<string>('');
  const [currentPage, setCurrentPage] = useState<number>(1);
  const [pageSize, setPageSize] = useState<number>(12);

  const listPosts = useCallback(
    async (page: number) => {
      try {
        setLoading(true);

        const fetchAuthorPostsData: FetchAuthorPostsProps = {
          p: page,
          page_size: pageSize,
        };

        const res = await fetchAuthorPosts(fetchAuthorPostsData);
        if (res.status === 200) {
          setPosts(res.results);
          setCount(res.count);
          setNextUrl(res.next);
        }
      } catch (err) {
        ToastError('Error fetching author posts');
      } finally {
        setLoading(false);
      }
    },
    [pageSize],
  );

  useEffect(() => {
    if (isOwner) listPosts(currentPage);
    // eslint-disable-next-line
  }, [listPosts, isOwner]);

  const [loadingMore, setLoadingMore] = useState<boolean>(false);
  const loadMore = async () => {
    if (nextUrl) {
      try {
        setLoadingMore(true);
        // Extraer querystring de query params
        const url = new URL(nextUrl);
        const queryParams = new URLSearchParams(url.search);

        // Convertir URLSearchParams a un objeto para el handler
        const params: any = {};
        queryParams.forEach((value, key) => {
          params[key] = value;
        });

        const fetchAuthorPostsData: FetchAuthorPostsProps = {
          p: params.p,
          page_size: params.page_size,
        };

        const res = await fetchAuthorPosts(fetchAuthorPostsData);
        if (res.status === 200) {
          setPosts([...posts, ...res.results]);
          setCount(res.count);
          setNextUrl(res.next);
        }
      } catch (e) {
        ToastError('Error loading more author posts');
      } finally {
        setLoadingMore(false);
      }
    }
  };

  const [loadingDelete, setLoadingDelete] = useState<boolean>(false);
  const handleDelete = async (slug: string) => {
    try {
      setLoadingDelete(true);
      const res = await deletePost({ slug });
      if (res.status === 200) {
        ToastSuccess('Post deleted successfully!');
        setPosts((prevPosts) => prevPosts.filter((post) => post.slug !== slug));
      }
    } catch (err) {
      ToastError('Error deleting post');
    } finally {
      setLoadingDelete(false);
    }
  };

  return {
    posts,
    count,
    loading,
    loadingMore,
    nextUrl,
    loadingDelete,
    handleDelete,
    setCurrentPage,
    setPageSize,
    loadMore,
  };
}
