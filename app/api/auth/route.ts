import { NextApiRequest, NextApiResponse } from 'next';
import { hash, compare } from 'bcryptjs';
import { sign } from 'jsonwebtoken';
import { connectToDatabase } from '../../../utils/db';
import Cors from 'cors';

const cors = Cors({
  methods: ['GET', 'POST', 'OPTIONS'],
  origin: '*',
});

function runMiddleware(req: NextApiRequest, res: NextApiResponse, fn: Function) {
  return new Promise((resolve, reject) => {
    fn(req, res, (result: any) => {
      if (result instanceof Error) {
        return reject(result);
      }
      return resolve(result);
    });
  });
}

type User = {
  username: string;
  password: string;
};

async function handler(req: NextApiRequest, res: NextApiResponse) {
  await runMiddleware(req, res, cors);

  if (req.method === 'POST') {
    const { username, password }: User = req.body;

    if (!username || !password) {
      return res.status(400).json({ error: 'Username and password are required' });
    }

    try {
      const { db } = await connectToDatabase();
      const user = await db.collection('users').findOne({ username });

      if (user) {
        const isPasswordValid = await compare(password, user.password);
        if (!isPasswordValid) {
          return res.status(401).json({ error: 'Invalid credentials' });
        }

        const token = sign({ username }, process.env.JWT_SECRET!, { expiresIn: '1h' });
        return res.status(200).json({ token });
      } else {
        const hashedPassword = await hash(password, 10);
        await db.collection('users').insertOne({ username, password: hashedPassword });

        const token = sign({ username }, process.env.JWT_SECRET!, { expiresIn: '1h' });
        return res.status(201).json({ token });
      }
    } catch (error) {
      return res.status(500).json({ error: 'Internal server error' });
    }
  } else {
    res.setHeader('Allow', ['POST']);
    return res.status(405).end(`Method ${req.method} Not Allowed`);
  }
}

export default handler;