import parseCookies from '@/utils/cookies/parseCookies';
import type { NextApiRequest, NextApiResponse } from 'next';

type Data = {
  name?: string;
  error?: string;
};

export default async function handler(req: NextApiRequest, res: NextApiResponse<Data>) {
  if (req.method !== 'GET') {
    return res.status(405).json({
      error: `Method ${req.method} not allowed`,
    });
  }

  const cookies = parseCookies(req.headers.cookie || '');
  const accessToken = cookies.access;

  if (accessToken === '') {
    return res.status(401).json({
      error: 'User unauthorized to make this request',
    });
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
      return res.status(apiRes.status).json({ name: 'Access token verified.' });
    }

    return res.status(401).json({
      error: 'Access token verification failed.',
    });
  } catch (err) {
    return res.status(500).json({
      error: 'Something went wrong',
    });
  }
}
