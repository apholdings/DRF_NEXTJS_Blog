import type { NextApiRequest, NextApiResponse } from 'next';

type Data = {
  name?: string;
  error?: string;
};

export default async function handler(req: NextApiRequest, res: NextApiResponse<Data>) {
  if (req.method !== 'POST') {
    return res.status(405).json({
      error: `Method ${req.method} not allowed`,
    });
  }

  try {
    const apiRes = await fetch(`${process.env.API_URL}/auth/jwt/create/`, {
      method: 'POST',
      headers: {
        Accept: 'application/json',
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(req.body),
    });

    const data = await apiRes.json();

    if (apiRes.status === 200) {
      const { access, refresh } = data;
      res.setHeader('Set-Cookie', [
        `access=${access}; HttpOnly; Path=/; SameSite=Strict; Secure=${process.env.NODE_ENV === 'production' ? 'true' : 'false'}; Max-Age=2592000`,
        `refresh=${refresh}; HttpOnly; Path=/; SameSite=Strict; Secure=${process.env.NODE_ENV === 'production' ? 'true' : 'false'}; Max-Age=5184000`,
      ]);

      return res.status(apiRes.status).json({ name: 'Login successfull' });
    }

    if (apiRes.status === 401) {
      return res.status(apiRes.status).json({
        error: data?.detail,
      });
    }

    if (apiRes.status === 403) {
      return res.status(apiRes.status).json({
        error: data?.detail,
      });
    }

    return res.status(apiRes.status).json({
      error: 'Server error.',
    });
  } catch (err) {
    return res.status(500).json({
      error: 'Something went wrong',
    });
  }
}
