import buildQueryString from '@/utils/buildQuerystring';
import type { NextApiRequest, NextApiResponse } from 'next';

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
  if (req.method !== 'GET') {
    return res.status(405).json({
      error: `Method ${req.method} not allowed`,
    });
  }

  try {
    const apiRes = await fetch(
      `${process.env.API_URL}/api/blog/categories/?${buildQueryString(req.query)}`,
      {
        method: 'GET',
        headers: {
          Accept: 'application/json',
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
