import { ToastError } from '@/components/toast/alerts';

export interface SendVerifyOTPLoginProps {
  email: string;
  otp: string;
}

export default async function verifyOTPLogin(props: SendVerifyOTPLoginProps) {
  try {
    const res = await fetch('/api/auth/verify_otp_login', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        email: props.email,
        otp: props.otp,
      }),
    });

    const data = await res.json();

    if (res.status === 200) {
      return data;
    }
  } catch (err) {
    ToastError('Error verifying otp');
  }

  return null;
}
