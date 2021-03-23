import express, { NextFunction, Request, Response } from 'express';
import { handleError } from './services/error-handler';
import { logger } from './services/logger';

import mainController from './components/main/mainController';

const app = express();

app.use(express.json());

app.use(mainController);


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