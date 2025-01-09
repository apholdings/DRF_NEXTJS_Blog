import { ToastError } from '@/components/toast/alerts';

export interface ComponentProps {
  key: string;
  title: string;
  size: string;
  type: string;
}

export default async function uploadBannerPicture(props: ComponentProps) {
  try {
    const res = await fetch('/api/profile/upload_banner_picture', {
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
    ToastError('Error uploading banner picture to backend');
  }

  return null;
}
