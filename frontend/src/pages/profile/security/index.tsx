import Layout from '@/hocs/Layout';

import Container from '@/components/pages/profile/Container';
import { useState } from 'react';
import Button from '@/components/Button';
import LoadingMoon from '@/components/loaders/LoadingMoon';
import EditPassword from '@/components/forms/EditPassword';
import usePasswordValidation from '@/hooks/usePasswordValidation';
import { ToastError, ToastSuccess } from '@/components/toast/alerts';
import { GetServerSideProps, GetServerSidePropsContext } from 'next';
import verifyAccess from '@/utils/api/auth/VerifyAccess';

export const getServerSideProps: GetServerSideProps = async (
  context: GetServerSidePropsContext,
) => {
  const { verified } = await verifyAccess(context);

  if (!verified) {
    return {
      redirect: {
        destination: '/',
        permanent: false,
      },
    };
  }

  return {
    props: {},
  };
};

export default function Page() {
  const [loading, setLoading] = useState<boolean>(false);
  const [currentPassword, setCurrentPassword] = useState<string>('');
  const [newPassword, setNewPassword] = useState<string>('');
  const [repeatNewPassword, setRepeatNewPassword] = useState<string>('');

  const { canSubmit, PasswordValidationText } = usePasswordValidation({
    password: newPassword,
    rePassword: repeatNewPassword,
  });

  const handleChangePassword = async () => {
    if (!canSubmit) {
      ToastError('Must fill all required passwords');
      return null;
    }

    try {
      setLoading(true);
      const res = await fetch('/api/auth/change_password', {
        method: 'POST',
        headers: {
          Accept: 'application/json',
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          new_password: newPassword,
          re_new_password: repeatNewPassword,
          current_password: currentPassword,
        }),
      });

      if (res.status === 204) {
        ToastSuccess('You password has been changed');
      }
    } catch (err) {
      ToastError('Error changing password.');
    } finally {
      setLoading(false);
    }

    return null;
  };

  return (
    <Container>
      <div>
        <div className="">
          <div className="-ml-4 -mt-4 flex flex-wrap items-center justify-between sm:flex-nowrap">
            <div className="ml-4 mt-4">
              <h3 className="text-base font-semibold text-gray-900">Change your password</h3>
              <p className="mt-1 text-sm text-gray-500">Change your password.</p>
            </div>
            <div className="ml-4 mt-4 shrink-0">
              <Button
                style={{
                  width: '200px',
                }}
                disabled={loading}
                onClick={handleChangePassword}
                hoverEffect
              >
                {loading ? <LoadingMoon /> : 'Change Password'}
              </Button>
            </div>
          </div>
        </div>

        <dl className="mt-6 space-y-6 divide-y divide-gray-100 border-t border-gray-200 text-sm/6">
          <div className="pt-6 sm:flex">
            <dt className="font-medium text-gray-900 sm:w-64 sm:flex-none sm:pr-6">
              Current Password
            </dt>
            <dd className="mt-1 flex justify-between gap-x-6 sm:mt-0 sm:flex-auto">
              <EditPassword data={currentPassword} setData={setCurrentPassword} />
            </dd>
          </div>
          <div className="pt-6 sm:flex">
            <dt className="font-medium text-gray-900 sm:w-64 sm:flex-none sm:pr-6">New Password</dt>
            <dd className="mt-1 flex justify-between gap-x-6 sm:mt-0 sm:flex-auto">
              <EditPassword data={newPassword} setData={setNewPassword} />
            </dd>
          </div>
          <div className="pt-6 sm:flex">
            <dt className="font-medium text-gray-900 sm:w-64 sm:flex-none sm:pr-6">
              Repeat New Password
            </dt>
            <dd className="mt-1 flex justify-between gap-x-6 sm:mt-0 sm:flex-auto">
              <EditPassword data={repeatNewPassword} setData={setRepeatNewPassword} />
            </dd>
          </div>
          {PasswordValidationText()}
        </dl>
      </div>
    </Container>
  );
}

Page.getLayout = function getLayout(page: React.ReactElement) {
  return <Layout>{page}</Layout>;
};
