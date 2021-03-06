import express, { NextFunction, Request, Response } from 'express';
import { logger } from '../../services/logger';
import { callProcedure } from '../../services/mysql';

import { getHash } from '../../services/hasher';

const router = express.Router();

const baseRoute = '/user';

router.post(`${baseRoute}`, async (req: Request, res: Response, next: NextFunction) => {

  logger.info(`POST ${baseRoute}`);

  try {
    const EMAIL = req.body.email;
    const PASSWORD = await getHash(req.body.password);
    
    const data = await callProcedure(
      'CREATE$USER_ACCOUNT',
      {
        EMAIL,
        PASSWORD,
      }
    );

    res.status(200).send(data);

  } catch (err) {
    next(err);
  }
});


export default router;