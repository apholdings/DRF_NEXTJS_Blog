import buildQueryString from '@/utils/buildQuerystring';

export interface FetchPostsProps {
  p: number;
  page_size: number;
  search?: string;
  sorting?: string;
  ordering?: string;
  author?: string;
  is_featured?: boolean | null;
  categories?: string[];
}

export default async function fetchPosts(props: FetchPostsProps) {
  try {
    const res = await fetch(`/api/blog/post/list?${buildQueryString(props)}`);
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
