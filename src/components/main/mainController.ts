import express, { NextFunction, Request, Response } from 'express';
import { AppError } from '../../models/AppError';
import { logger } from '../../services/logger';
import { callProcedure } from '../../services/mysql';

const router = express.Router();

router.get('/:procedureName', async (req: Request, res: Response, next: NextFunction) => {
  const procedureName = req.params.procedureName;

  logger.info(`GET /${procedureName}`);

  try {
    const data = await callProcedure(
      '$READ$CONTROLLER',
      {
        PROC_NAME: procedureName,
        PROC_DATA: req.body,
      }
    );

    if (data?.ERROR === 'Not Found') {
      throw new AppError('Procedure was not found in $READ$CONTROLLER master', 'Resource Not Found', 404);
    } else {
      res.status(200).send(data ?? []);
    }

  } catch (err) {
    next(err);
  }
});

export default router;