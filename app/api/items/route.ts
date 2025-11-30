import { NextApiRequest, NextApiResponse } from 'next';
import { PrismaClient } from '@prisma/client';
import Cors from 'cors';

const prisma = new PrismaClient();
const cors = Cors({
  methods: ['GET', 'POST', 'PUT', 'DELETE'],
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

type TodoItem = {
  id: number;
  title: string;
  completed: boolean;
};

async function handler(req: NextApiRequest, res: NextApiResponse) {
  await runMiddleware(req, res, cors);

  switch (req.method) {
    case 'GET':
      try {
        const items: TodoItem[] = await prisma.todoItem.findMany();
        res.status(200).json(items);
      } catch (error) {
        res.status(500).json({ error: 'Failed to fetch items' });
      }
      break;
    case 'POST':
      try {
        const { title, completed } = req.body;
        if (typeof title !== 'string' || typeof completed !== 'boolean') {
          return res.status(400).json({ error: 'Invalid input' });
        }
        const newItem: TodoItem = await prisma.todoItem.create({
          data: { title, completed },
        });
        res.status(201).json(newItem);
      } catch (error) {
        res.status(500).json({ error: 'Failed to create item' });
      }
      break;
    case 'PUT':
      try {
        const { id, title, completed } = req.body;
        if (typeof id !== 'number' || typeof title !== 'string' || typeof completed !== 'boolean') {
          return res.status(400).json({ error: 'Invalid input' });
        }
        const updatedItem: TodoItem = await prisma.todoItem.update({
          where: { id },
          data: { title, completed },
        });
        res.status(200).json(updatedItem);
      } catch (error) {
        res.status(500).json({ error: 'Failed to update item' });
      }
      break;
    case 'DELETE':
      try {
        const { id } = req.body;
        if (typeof id !== 'number') {
          return res.status(400).json({ error: 'Invalid input' });
        }
        await prisma.todoItem.delete({ where: { id } });
        res.status(204).end();
      } catch (error) {
        res.status(500).json({ error: 'Failed to delete item' });
      }
      break;
    default:
      res.setHeader('Allow', ['GET', 'POST', 'PUT', 'DELETE']);
      res.status(405).end(`Method ${req.method} Not Allowed`);
  }
}

export default handler;