import { Response } from 'express';
import { AppError } from '../models/AppError';
import { logger } from './logger';

export const handleError = (error: Error, res?: Response): void => {
  logger.error(error);
  
  if (!(error instanceof AppError) || !error.isTrusted) {
    if (res && !res.headersSent) {
      res.status(500).send('There was an internal server error');
    }
    process.exit(1);
  } else {
    if (res && !res.headersSent) {
      res.status(error.httpStatusCode).json(error.httpData);
    }
  }
};