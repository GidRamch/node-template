import { Response } from 'express';
import { AppError } from '../models/AppError';
import { logger } from './logger';

export const handleError = (error: Error, res?: Response): void => {

  if ((error instanceof AppError) && error.isTrusted) {
    logger.warn(error);

    if (res && !res.headersSent) {
      res.status(error.httpStatusCode).json(error.httpData);
    }

    return;
  }

  if (res && !res.headersSent) {
    res.status(500).send('There was an internal server error');
  }

  logger.error(error).on('finish', () => {
    process.exit(1);
  });
};