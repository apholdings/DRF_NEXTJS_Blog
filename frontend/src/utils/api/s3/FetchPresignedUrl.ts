import { ToastError } from '@/components/toast/alerts';

export interface ComponentProps {
  key: string;
  bucket: string;
}

export async function fetchS3SignedURL(props: ComponentProps) {
  try {
    const res = await fetch('/api/aws/getSignedURL/', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(props),
    });

    const data = await res.json();
    return data.results;
  } catch (error) {
    ToastError('Error fetching presigned URL');
    return {
      error: true,
      message: 'An unknown error occurred while fetching presigned URL.',
    };
  }
}
