import { useState } from 'react';
import newsletterSignup, { NewsLetterSignupProps } from '@/utils/api/newsletter/newsletterSignup';
import EditEmail from '../forms/EditEmail';
import { ToastError, ToastSuccess } from '../toast/alerts';
import LoadingMoon from '../loaders/LoadingMoon';

export default function EmailForm() {
  const [email, setEmail] = useState<string>('');

  const [loading, setLoading] = useState<boolean>(false);

  const handleSubscribe = async (event: any) => {
    event.preventDefault();

    const formData: NewsLetterSignupProps = {
      email,
    };

    try {
      setLoading(true);
      const res = await newsletterSignup(formData);
      if (res.status === 200) {
        ToastSuccess('Welcome to our newsletter! We are excited to have you on board.');
      } else {
        ToastError(res.detail);
      }
    } catch (e) {
      ToastError('Error subscribing to newsletter');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="w-auto">
      <form onSubmit={handleSubscribe}>
        <EditEmail data={email} setData={setEmail} placeholder="e.g yourname@email.com" />
        <button
          type="submit"
          disabled={loading}
          className="mt-2 w-full scale-100 rounded-lg bg-black py-3 font-semibold text-white transition duration-300 ease-in-out hover:scale-105"
        >
          {loading ? <LoadingMoon color="#fff" /> : 'Join our newsletter'}
        </button>
      </form>
    </div>
  );
}
