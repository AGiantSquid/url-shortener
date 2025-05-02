import express, { Request, Response } from 'express';
import cors from 'cors';
import { Message } from '@yarn-ts-monorepo/common/types/message';
import { __TEST_CONSTANT__ } from '@yarn-ts-monorepo/common/constants/debug';

const app = express();
const port = 5000;

// Middleware
app.use(
  cors({
    origin: process.env.FRONTEND_URL,
    credentials: true,
  }),
);
app.use(express.json());

// Demo endpoint
app.get('/api/messages', (req: Request, res: Response) => {
  const message: Message = {
    id: '1',
    content: `Displaying value from common package to verify reloading on the backend works: ${__TEST_CONSTANT__}`,
    timestamp: new Date().toISOString(),
    author: 'System',
  };
  res.json(message);
});

app.listen(port, () => {
  console.log(`Server is running on port ${port}`);
});
