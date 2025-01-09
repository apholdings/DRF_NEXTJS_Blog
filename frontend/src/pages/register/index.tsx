import Button from '@/components/Button';
import EditEmail from '@/components/forms/EditEmail';
import EditPassword from '@/components/forms/EditPassword';
import EditText from '@/components/forms/EditText';
import LoadingMoon from '@/components/loaders/LoadingMoon';
import { ToastError } from '@/components/toast/alerts';
import Layout from '@/hocs/Layout';
import usePasswordValidation from '@/hooks/usePasswordValidation';
import { register } from '@/redux/actions/auth/actions';
import { IRegisterProps } from '@/redux/actions/auth/interfaces';
import Link from 'next/link';
import { useState } from 'react';
import { useDispatch } from 'react-redux';
import { UnknownAction } from 'redux';
import { ThunkDispatch } from 'redux-thunk';

export default function Page() {
  const [email, setEmail] = useState<string>('');
  const [firstName, setFirstName] = useState<string>('');
  const [lastName, setLastName] = useState<string>('');
  const [username, setUsername] = useState<string>('');
  const [password, setPassword] = useState<string>('');
  const [rePassword, setRePassword] = useState<string>('');

  const { canSubmit, PasswordValidationText } = usePasswordValidation({
    username,
    password,
    rePassword,
  });

  const dispatch: ThunkDispatch<any, any, UnknownAction> = useDispatch();
  const [loading, setLoading] = useState<boolean>(false);

  const handleOnSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    if (!canSubmit) {
      ToastError('Ensure all fields in the form are complete and meet the requirements.');
      return;
    }

    const registerData: IRegisterProps = {
      email,
      username,
      first_name: firstName,
      last_name: lastName,
      password,
      re_password: rePassword,
    };

    try {
      setLoading(true);
      await dispatch(register(registerData));
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
          Registrate y empieza ahora
        </h2>
      </div>

      <div className="mt-10 sm:mx-auto sm:w-full sm:max-w-sm">
        <form onSubmit={handleOnSubmit} className="space-y-2">
          <EditText data={firstName} setData={setFirstName} title="First Name" required />
          <EditText data={lastName} setData={setLastName} title="Last Name" required />
          <EditText data={username} setData={setUsername} title="Username" required />
          <EditEmail data={email} setData={setEmail} title="Email" required />
          <EditPassword data={password} setData={setPassword} title="Password" required />
          <EditPassword
            data={rePassword}
            setData={setRePassword}
            title="Repeat Password"
            required
          />

          {PasswordValidationText()}

          <Button disabled={loading} hoverEffect={!loading} type="submit">
            {loading ? <LoadingMoon /> : 'Register'}
          </Button>
        </form>

        <div className="mt-10 space-y-2">
          <p className="text-center text-sm/6 text-gray-500">
            No te llego el correo de activacion?{' '}
            <Link
              href="/resend-activation"
              className="font-semibold text-indigo-600 hover:text-indigo-500"
            >
              Reenviar correo
            </Link>
          </p>
          <p className="text-center text-sm/6 text-gray-500">
            Ya tienes cuenta?{' '}
            <Link href="/login" className="font-semibold text-indigo-600 hover:text-indigo-500">
              Acceder
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
