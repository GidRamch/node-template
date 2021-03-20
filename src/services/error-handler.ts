import { Response } from 'express';
import { logger } from './logger';

export const handleError = (error: Error, res?: Response): void => {
  logger.error(error);

  if (res) {
    res.status(500).send('There was an internal server error');
  }
};