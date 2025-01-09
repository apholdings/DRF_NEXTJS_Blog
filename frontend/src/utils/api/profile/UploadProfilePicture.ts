import { ToastError } from '@/components/toast/alerts';

export interface ComponentProps {
  key: string;
  title: string;
  size: string;
  type: string;
}

export default async function uploadProfilePicture(props: ComponentProps) {
  try {
    const res = await fetch('/api/profile/upload_profile_picture', {
      method: 'POST',
      headers: {
        Accept: 'application/json',
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(props),
    });
    const data = await res.json();
    return data;
  } catch (err) {
    ToastError('Error uploading profile picture to backend');
  }
  return null;
}
