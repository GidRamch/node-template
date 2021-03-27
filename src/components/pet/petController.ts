import express, { NextFunction, Request, Response } from 'express';
import { logger } from '../../services/logger';
import { callProcedure } from '../../services/mysql';

const router = express.Router();

const baseRoute = '/pets';

router.post(`${baseRoute}`, async (req: Request, res: Response, next: NextFunction) => {

  logger.info(`POST ${baseRoute}`);

  try {
    const NAME = req.body.name;
    const OWNER_ID = req.body.ownerId;
    
    const data = await callProcedure(
      'CREATE$PET',
      {
        NAME,
        OWNER_ID,
      }
    );

    res.status(200).send(data);

  } catch (err) {
    next(err);
  }
});



router.delete(`${baseRoute}/:id`, async (req: Request, res: Response, next: NextFunction) => {

  logger.info(`DELETE ${baseRoute}`);

  try {
    const ID = req.params.id;
    
    const data = await callProcedure(
      'DELETE$PET',
      {
        ID,
      }
    );

    res.status(200).send(data);

  } catch (err) {
    next(err);
  }
});



router.put(`${baseRoute}/:id`, async (req: Request, res: Response, next: NextFunction) => {

  logger.info(`PUT ${baseRoute}`);

  try {
    const ID = req.params.id;
    const NAME= req.body.name;
    
    const data = await callProcedure(
      'UPDATE$PET',
      {
        ID,
        NAME,
      }
    );

    res.status(200).send(data);

  } catch (err) {
    next(err);
  }
});

export default router;