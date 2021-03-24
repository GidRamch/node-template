import express, { NextFunction, Request, Response } from 'express';
import { compareHash } from '../../services/hasher';
import { logger } from '../../services/logger';
import { callProcedure } from '../../services/mysql';

const router = express.Router();

const baseRoute = '/auth';


router.post(`${baseRoute}/login`, async (req: Request, res: Response, next: NextFunction) => {

  logger.info(`POST /${baseRoute}/create`);

  try {
    const EMAIL = req.body.email;
    const PASSWORD = req.body.password;

    const mysqlData = await callProcedure(
      'USER_ACCOUNT$GET_PASSWORD_VIA_EMAIL',
      { EMAIL }
    );

    if (!mysqlData?.PASSWORD) { return res.status(401).send(); }

    const hashedPassword = mysqlData.PASSWORD;

    const authenticated = await compareHash(PASSWORD, hashedPassword);

    delete mysqlData.PASSWORD;

    res.status(authenticated ? 200 : 401).send(authenticated ? mysqlData : null);

  } catch (err) {
    next(err);
  }
});


export default router;