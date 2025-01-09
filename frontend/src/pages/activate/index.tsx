import Button from '@/components/Button';
import LoadingMoon from '@/components/loaders/LoadingMoon';
import { ToastError } from '@/components/toast/alerts';
import Layout from '@/hocs/Layout';
import { activate } from '@/redux/actions/auth/actions';
import { IActivationProps } from '@/redux/actions/auth/interfaces';
import { useSearchParams } from 'next/navigation';

import { useState } from 'react';
import { useDispatch } from 'react-redux';
import { UnknownAction } from 'redux';
import { ThunkDispatch } from 'redux-thunk';

export default function Page() {
  const searchParams = useSearchParams();

  const uid = searchParams.get('uid');
  const token = searchParams.get('token');

  const dispatch: ThunkDispatch<any, any, UnknownAction> = useDispatch();
  const [loading, setLoading] = useState<boolean>(false);

  const handleOnSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    if (token === '' || uid === '') {
      ToastError('Token and UID must be provided');
      return;
    }

    const activationData: IActivationProps = {
      uid,
      token,
    };

    try {
      setLoading(true);
      await dispatch(activate(activationData));
    } catch (err) {
      ToastError(`${err}`);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="flex min-h-full flex-1 flex-col justify-center px-6 pt-12 lg:px-8">
      <div className="sm:mx-auto sm:w-full sm:max-w-sm">
        <h2 className="mt-10 text-center text-2xl/9 font-bold tracking-tight text-gray-900">
          Activa tu cuenta
        </h2>
      </div>

      <div className="mt-10 sm:mx-auto sm:w-full sm:max-w-sm">
        <form onSubmit={handleOnSubmit} className="space-y-2">
          <Button disabled={loading} hoverEffect={!loading} type="submit">
            {loading ? <LoadingMoon /> : 'Activate'}
          </Button>
        </form>
      </div>
    </div>
  );
}

Page.getLayout = function getLayout(page: React.ReactElement) {
  return <Layout>{page}</Layout>;
};
