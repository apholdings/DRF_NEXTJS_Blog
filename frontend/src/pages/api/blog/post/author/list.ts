import buildQueryString from '@/utils/buildQuerystring';
import parseCookies from '@/utils/cookies/parseCookies';
import type { NextApiRequest, NextApiResponse } from 'next';

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
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
    const apiRes = await fetch(
      `${process.env.API_URL}/api/blog/post/author/?${buildQueryString(req.query)}`,
      {
        method: 'GET',
        headers: {
          Accept: 'application/json',
          Authorization: `JWT ${accessToken}`,
          'API-Key': `${process.env.BACKEND_API_KEY}`,
        },
      },
    );

    const data = await apiRes.json();
    return res.status(apiRes.status).json(data);
  } catch (err) {
    return res.status(500).json({
      error: 'Something went wrong',
    });
  }
}
