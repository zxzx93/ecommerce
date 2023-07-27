import { NextApiRequest, NextApiResponse } from 'next';
import { getToken } from 'next-auth/jwt';

interface ExtendedNextApiRequest extends NextApiRequest {
  user?: string;
}

export default function auth<T extends ExtendedNextApiRequest>(
  handler: (req: T, res: NextApiResponse) => void | Promise<void>
) {
  return async (req: T, res: NextApiResponse) => {
    const token = await getToken({
      req,
      secret: process.env.JWT_SECRET as string,
      secureCookie: process.env.NODE_ENV === 'production',
    });

    if (!token) {
      return res.status(401).json({ error: 'Unauthorized' });
    }

    const newReq = {
      ...req,
      user: token.sub,
    };

    return handler(newReq, res);
  };
}
