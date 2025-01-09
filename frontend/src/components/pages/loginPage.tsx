import Button from '@/components/Button';
import EditEmail from '@/components/forms/EditEmail';
import EditPassword from '@/components/forms/EditPassword';
import LoadingMoon from '@/components/loaders/LoadingMoon';
import Layout from '@/hocs/Layout';
import { login } from '@/redux/actions/auth/actions';
import { ILoginProps } from '@/redux/actions/auth/interfaces';
import Link from 'next/link';
import { useState } from 'react';
import { useDispatch } from 'react-redux';
import { UnknownAction } from 'redux';
import { ThunkDispatch } from 'redux-thunk';
import { ToastError } from '../toast/alerts';

export default function Page() {
  const [email, setEmail] = useState<string>('');
  const [password, setPassword] = useState<string>('');

  const dispatch: ThunkDispatch<any, any, UnknownAction> = useDispatch();
  const [loading, setLoading] = useState<boolean>(false);

  const handleOnSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    const loginData: ILoginProps = {
      email,
      password,
    };

    try {
      setLoading(true);
      await dispatch(login(loginData));
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
          Accede a tu cuenta
        </h2>
      </div>

      <div className="mt-10 sm:mx-auto sm:w-full sm:max-w-sm">
        <form onSubmit={handleOnSubmit} className="space-y-2">
          <EditEmail data={email} setData={setEmail} title="Email" required />
          <EditPassword data={password} setData={setPassword} title="Password" required />

          <Button disabled={loading} hoverEffect={!loading} type="submit">
            {loading ? <LoadingMoon /> : 'Login'}
          </Button>
        </form>

        <div className="mt-10 space-y-2">
          <p className="text-center text-sm/6 text-gray-500">
            No tienes cuenta?{' '}
            <Link href="/register" className="font-semibold text-indigo-600 hover:text-indigo-500">
              Registrate
            </Link>
          </p>
          <p className="text-center text-sm/6 text-gray-500">
            Olvidaste tu contraseña?{' '}
            <Link
              href="/forgot-password"
              className="font-semibold text-indigo-600 hover:text-indigo-500"
            >
              Olvide mi contraseña
            </Link>
          </p>
        </div>
      </div>
    </div>
  );
}

Page.getLayout = function getLayout(page: React.ReactElement) {
  return <Layout>{page}</Layout>;
};
