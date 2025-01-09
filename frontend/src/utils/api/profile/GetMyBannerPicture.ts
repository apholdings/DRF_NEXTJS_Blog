import { ToastError } from '@/components/toast/alerts';

export default async function fetchMyBannerPicture() {
  try {
    const res = await fetch('/api/profile/get_banner_picture');
    const data = await res.json();
    return data;
  } catch (err) {
    ToastError('Error fetching banner picture from backend');
    return null;
  }
}
