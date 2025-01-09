import Button from '@/components/Button';
import EditEmail from '@/components/forms/EditEmail';
import EditText from '@/components/forms/EditText';
import LoadingMoon from '@/components/loaders/LoadingMoon';
import { ToastError, ToastSuccess } from '@/components/toast/alerts';
import Layout from '@/hocs/Layout';
import { loadProfile, loadUser, setLoginSuccess } from '@/redux/actions/auth/actions';
import sendOTPLogin, { SendOTPLoginProps } from '@/utils/api/auth/SendOTPLogin';
import verifyOTPLogin, { SendVerifyOTPLoginProps } from '@/utils/api/auth/VerifyOTPLogin';
import Link from 'next/link';
import { useRouter } from 'next/router';
import { useState } from 'react';
import { useDispatch } from 'react-redux';
import { UnknownAction } from 'redux';
import { ThunkDispatch } from 'redux-thunk';

export default function Page() {
  const [email, setEmail] = useState<string>('');
  const [step, setStep] = useState<number>(1);
  const [otp, setOTP] = useState<string>('');

  const [loading, setLoading] = useState<boolean>(false);

  const dispatch: ThunkDispatch<any, any, UnknownAction> = useDispatch();

  const handleOnSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(email)) {
      ToastError('A valid email is required');
      return;
    }

    const sendOTPLoginData: SendOTPLoginProps = {
      email,
    };

    try {
      setLoading(true);
      const res = await sendOTPLogin(sendOTPLoginData);
      if (res.status === 200) {
        setStep(2);
      } else {
        setEmail('');
      }
    } catch (err) {
      ToastError(`${err}`);
    } finally {
      setLoading(false);
    }
  };

  const router = useRouter();

  const handleOTPSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    const sendVerifyOTPLoginData: SendVerifyOTPLoginProps = {
      email,
      otp,
    };

    try {
      setLoading(true);
      const res = await verifyOTPLogin(sendVerifyOTPLoginData);
      if (res.status === 200) {
        await dispatch(loadProfile());
        await dispatch(loadUser());
        await dispatch(setLoginSuccess());
        ToastSuccess('Login successfull.');
        router.push('/');
      } else {
        setEmail('');
        setOTP('');
      }
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
        {step === 1 && (
          <form onSubmit={handleOnSubmit} className="space-y-2">
            <EditEmail data={email} setData={setEmail} title="Email" required />
            <Button disabled={loading} hoverEffect={!loading} type="submit">
              {loading ? <LoadingMoon /> : 'Login'}
            </Button>
          </form>
        )}

        {step === 2 && (
          <form onSubmit={handleOTPSubmit} className="space-y-2">
            <EditText data={otp} setData={setOTP} title="OTP Code" required />
            <Button disabled={loading} hoverEffect={!loading} type="submit">
              {loading ? <LoadingMoon /> : 'Login'}
            </Button>
          </form>
        )}

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
