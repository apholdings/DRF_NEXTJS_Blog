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

  res.setHeader('Set-Cookie', [
    `access=; HttpOnly; Path=/; SameSite=Strict; Secure=${process.env.NODE_ENV === 'production' ? 'true' : 'false'}; Max-Age=0`,
    `refresh=; HttpOnly; Path=/; SameSite=Strict; Secure=${process.env.NODE_ENV === 'production' ? 'true' : 'false'}; Max-Age=0`,
  ]);

  return res.status(200).json({ name: 'Logout successfull.' });
}
