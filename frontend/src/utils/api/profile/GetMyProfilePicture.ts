import { ToastError } from '@/components/toast/alerts';

export default async function fetchMyProfilePicture() {
  try {
    const res = await fetch('/api/profile/get_profile_picture');
    const data = await res.json();
    return data;
  } catch (err) {
    ToastError('Error fetching profile picture from backend');
    return null;
  }
}
