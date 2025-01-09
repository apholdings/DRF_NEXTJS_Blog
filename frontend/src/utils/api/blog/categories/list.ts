import buildQueryString from '@/utils/buildQuerystring';

export interface FetchCategoriesProps {
  parent_slug?: string;
  ordering?: string;
  sorting?: string;
  search?: string;
  p?: number;
  page_size?: number;
}

export default async function fetchCategories(props: FetchCategoriesProps) {
  try {
    const res = await fetch(`/api/blog/categories/list/?${buildQueryString(props)}`);
    const data = await res.json();
    return data;
  } catch (err) {
    return null;
  }
}
