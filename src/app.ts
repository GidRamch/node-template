import express, { NextFunction, Request, Response } from 'express';
import { handleError } from './services/error-handler';
import { logger } from './services/logger';
import { callProcedure } from './services/mysql';
const app = express();

app.get('/', (req: Request, res: Response) => res.send('Express + TypeScript Server'));

const test = async () => {
  try {
    const res = await callProcedure('GET$PERSON_PETS', { PERSON_ID: 1 });
    console.log(res);
  } catch (e) {
    logger.error(e);
  }
};

test();

app.use((err: Error, req: Request, res: Response, next: NextFunction) => {
  handleError(err, res);
});

process.on('uncaughtException', (err: Error) => {
  handleError(err);
});

process.on('unhandledRejection', (err: Error) => {
  handleError(err);
});

export default app;