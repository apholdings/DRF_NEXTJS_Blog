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
    const apiRes = await fetch(`${process.env.API_URL}/api/newsletter/signup/`, {
      method: 'POST',
      headers: {
        Accept: 'application/json',
        'Content-Type': 'application/json',
        'API-Key': `${process.env.BACKEND_API_KEY}`,
      },
      body: JSON.stringify(req.body),
    });

    const data = await apiRes.json();
    return res.status(apiRes.status).json(data);
  } catch (err) {
    return res.status(500).json({
      error: 'Something went wrong',
    });
  }
}
