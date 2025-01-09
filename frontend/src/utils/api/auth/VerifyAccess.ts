import parseCookies from '@/utils/cookies/parseCookies';
import { GetServerSidePropsContext } from 'next';

export default async function verifyAccess(context: GetServerSidePropsContext) {
  const cookies = parseCookies(context.req.headers.cookie || '');
  const accessToken = cookies.access;

  if (accessToken === '') {
    return {
      verified: false,
    };
  }

  try {
    const apiRes = await fetch(`${process.env.API_URL}/auth/jwt/verify/`, {
      method: 'POST',
      headers: {
        Accept: 'application/json',
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        token: accessToken,
      }),
    });

    if (apiRes.status === 200) {
      return {
        verified: true,
        accessToken,
      };
    }

    return {
      verified: false,
    };
  } catch (err) {
    return {
      verified: false,
    };
  }
}
