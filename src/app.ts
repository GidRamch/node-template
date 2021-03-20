import express, { NextFunction, Request, Response } from 'express';
import { handleError } from './services/error-handler';
import { logger } from './services/logger';
import { callProcedure } from './services/mysql';
const app = express();

app.use(express.json());

app.get('/', (req: Request, res: Response) => res.send('Express + TypeScript Server'));

app.get('/person-pets', async (req: Request, res: Response, next) => {
  try {
    const data = await callProcedure('READ$PERSON_PETS', { PERSON_ID: req.body.personId });

    res.status(200).send(data ?? []);

  } catch (err) {
    next(err);
  }
});

app.use((err: Error, req: Request, res: Response, next: NextFunction) => {
  logger.debug('Error caugt in handler middleware!');
  handleError(err, res);
});

process.on('uncaughtException', (err: Error) => {
  logger.debug('Error caugt in uncaughtException middleware!');
  handleError(err);
});

process.on('unhandledRejection', (err: Error) => {
  logger.debug('Error caugt in unhandledRejection middleware!');
  handleError(err);
});

export default app;