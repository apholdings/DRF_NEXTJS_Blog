import { ToastError, ToastSuccess } from '@/components/toast/alerts';
import { IPostList } from '@/interfaces/blog/IPost';
import deletePost from '@/utils/api/blog/post/delete';
import fetchPosts, { FetchPostsProps } from '@/utils/api/blog/post/list';
import { useCallback, useEffect, useState } from 'react';

interface ComponentProps {
  username?: string;
  showFeatured?: boolean;
  categories?: string[];
  searchBy?: string;
}

export default function usePosts({ username, showFeatured, categories, searchBy }: ComponentProps) {
  const [posts, setPosts] = useState<IPostList[]>([]);
  const [loading, setLoading] = useState<boolean>(false);
  const [count, setCount] = useState<number>(0);
  const [nextUrl, setNextUrl] = useState<string>('');
  const [currentPage, setCurrentPage] = useState<number>(1);
  const [pageSize, setPageSize] = useState<number>(12);
  const [ordering, setOrdering] = useState<string>('');
  const [sorting, setSorting] = useState<string>('');
  const [searchByString, setSearchBy] = useState<string>(searchBy || '');
  const [author, setAuthor] = useState<string>(username || '');

  const listPosts = useCallback(
    async (page: number, search: string | undefined) => {
      try {
        setLoading(true);

        const fetchPostsData: FetchPostsProps = {
          p: page,
          page_size: pageSize,
          ordering,
          sorting,
          search,
          author,
          ...(showFeatured !== undefined && { is_featured: showFeatured }),
          categories,
        };

        const res = await fetchPosts(fetchPostsData);
        if (res.status === 200) {
          setPosts(res.results);
          setCount(res.count);
          setNextUrl(res.next);
        }
      } catch (err) {
        ToastError('Error fetching posts');
      } finally {
        setLoading(false);
      }
    },
    // eslint-disable-next-line
    [pageSize, ordering, sorting, author, categories, showFeatured],
  );

  useEffect(() => {
    listPosts(currentPage, searchByString);
    // eslint-disable-next-line
  }, [listPosts, currentPage]);

  const onSubmitSearch = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    listPosts(1, searchByString);
  };

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

        const fetchPostsData: FetchPostsProps = {
          ...params, // Include all query parameters
          ...(showFeatured !== undefined && { is_featured: showFeatured }),
          categories,
        };

        const res = await fetchPosts(fetchPostsData);
        if (res.status === 200) {
          setPosts([...posts, ...res.results]);
          setCount(res.count);
          setNextUrl(res.next);
        }
      } catch (e) {
        ToastError('Error loading more posts');
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
    pageSize,
    currentPage,
    ordering,
    sorting,
    searchByString,
    handleDelete,
    setCurrentPage,
    setPageSize,
    setOrdering,
    setSorting,
    setSearchBy,
    setAuthor,
    loadMore,
    onSubmitSearch,
  };
}
