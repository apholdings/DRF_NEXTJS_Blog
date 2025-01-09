import { ToastError } from '@/components/toast/alerts';

export interface NewsLetterSignupProps {
  email: string;
}

export default async function newsletterSignup({ email }: NewsLetterSignupProps) {
  try {
    const res = await fetch(`/api/newsletter/signup`, {
      method: 'POST',
      headers: {
        Accept: 'application/json',
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({ email }),
    });
    const data = await res.json();

    return data;
  } catch (e) {
    ToastError('Error during signup');
  }

  return null;
}
