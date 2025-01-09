import { ToastError } from '@/components/toast/alerts';
import { ICategoryList } from '@/interfaces/blog/ICategory';
import fetchAllCategories from '@/utils/api/blog/categories/listAll';
import { useCallback, useEffect, useState } from 'react';

export default function usePostCategories() {
  const [categories, setCategories] = useState<ICategoryList[]>([]);
  const [loading, setLoading] = useState<boolean>(false);

  const listCategories = useCallback(async () => {
    try {
      setLoading(true);
      const res = await fetchAllCategories();
      if (res.status === 200) {
        setCategories(res.results);
      }
    } catch (err) {
      ToastError('Error loading categories');
    } finally {
      setLoading(false);
    }
  }, []);

  useEffect(() => {
    listCategories();
  }, [listCategories]);

  return { categories, loading };
}
