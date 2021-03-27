import express, { NextFunction, Request, Response } from 'express';
import helmet from 'helmet';

import { handleError } from './services/error-handler';
import { logger } from './services/logger';

import userController from './components/user/userController';
import authController from './components/auth/authController';
import petController from './components/pet/petController';

const app = express();

app.use(helmet());
app.use(express.json());

app.use(authController);
app.use(userController);
app.use(petController);


app.use((err: Error, req: Request, res: Response, next: NextFunction) => {
  logger.debug('Error caught in handling middleware!');
  handleError(err, res);
});

process.on('unhandledRejection', (err: Error) => {
  // We just caught an unhandled promise rejection,
  // since we already have fallback handler for unhandled errors (see below),
  // lets throw and let him handle that
  throw err;
});

process.on('uncaughtException', (err: Error) => {
  logger.debug('Error caught in uncaughtException middleware!');
  handleError(err);
});


export default app;