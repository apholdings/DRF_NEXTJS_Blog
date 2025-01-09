import buildQueryString from '@/utils/buildQuerystring';

export interface FetchAuthorPostsProps {
  p: number;
  page_size: number;
}

export default async function fetchAuthorPosts(props: FetchAuthorPostsProps) {
  try {
    const res = await fetch(`/api/blog/post/author/list?${buildQueryString(props)}`);
    const data = await res.json();
    if (res.status === 200) {
      return data;
    }

    if (res.status === 404) {
      return data;
    }
  } catch (e) {
    return null;
  }

  return null;
}
