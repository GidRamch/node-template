import express, { NextFunction, Request, Response } from 'express';
import { validate } from '../../middleware/validator';
import { AppError } from '../../models/AppError';
import { compareHash } from '../../services/hasher';
import { logger } from '../../services/logger';
import { callProcedure } from '../../services/mysql';
import { getValidationRules } from './authValidator';

const router = express.Router();

const baseRoute = '/auth';


router.post(
  `${baseRoute}/login`,
  getValidationRules('login'),
  validate,
  async (req: Request, res: Response, next: NextFunction) => {

    logger.info(`POST /${baseRoute}/create`);

    try {
      const EMAIL = req.body.email;
      const PASSWORD = req.body.password;

      const mysqlData = await callProcedure(
        'USER_ACCOUNT$GET_PASSWORD_VIA_EMAIL',
        { EMAIL }
      );

      if (!mysqlData?.PASSWORD) { throw new AppError(`No Password found for given email: ${EMAIL}`, 'Unauthorized', 403); }

      const hashedPassword = mysqlData.PASSWORD;

      const authenticated = await compareHash(PASSWORD, hashedPassword);

      delete mysqlData.PASSWORD;

      if (!authenticated) {
        throw new AppError(`Comparison of entered and stored passwords resulted false for email: ${EMAIL}`, 'Unauthorized', 401);
      }

      res.status(authenticated ? 200 : 401).send(authenticated ? mysqlData : null);

    } catch (err) {
      next(err);
    }
  });


export default router;