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
  const refreshToken = cookies.refresh;

  if (refreshToken === '') {
    return res.status(401).json({
      error: 'User unauthorized to make this request',
    });
  }

  try {
    const apiRes = await fetch(`${process.env.API_URL}/auth/jwt/refresh/`, {
      method: 'POST',
      headers: {
        Accept: 'application/json',
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        refresh: refreshToken,
      }),
    });

    const data = await apiRes.json();

    if (apiRes.status === 200) {
      const { access, refresh } = data;

      res.setHeader('Set-Cookie', [
        `access=${access}; HttpOnly; Path=/; SameSite=Strict; Secure=${process.env.NODE_ENV === 'production' ? 'true' : 'false'}; Max-Age=2592000`,
        `refresh=${refresh}; HttpOnly; Path=/; SameSite=Strict; Secure=${process.env.NODE_ENV === 'production' ? 'true' : 'false'}; Max-Age=5184000`,
      ]);

      return res.status(apiRes.status).json({ name: 'Access token has been refreshed' });
    }

    return res.status(500).json({
      error: 'Something went wrong',
    });
  } catch (err) {
    return res.status(500).json({
      error: 'Something went wrong',
    });
  }
}
