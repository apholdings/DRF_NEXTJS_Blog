import { ToastError } from '@/components/toast/alerts';
import fetchMyBannerPicture from '@/utils/api/profile/GetMyBannerPicture';
import { useCallback, useEffect, useState } from 'react';

export default function useBannerPicture() {
  const [bannerPicture, setBannerPicture] = useState<any>(null);
  const [percentage, setPercentage] = useState<number>(0);
  const [loading, setLoading] = useState<boolean>(false);

  const getBannerPicture = useCallback(async () => {
    try {
      setLoading(true);
      const res = await fetchMyBannerPicture();
      if (res && res.status === 200) {
        setBannerPicture(res.results);
      }
    } catch (err) {
      ToastError('Error fetching banner picture');
    } finally {
      setLoading(false);
    }
  }, []);

  useEffect(() => {
    getBannerPicture();
  }, [getBannerPicture]);

  return {
    bannerPicture,
    setBannerPicture,
    percentage,
    setPercentage,
    loading,
  };
}
