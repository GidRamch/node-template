import express, { NextFunction, Request, Response } from 'express';
import { logger } from '../../services/logger';
import { createPet, deletePet, readPets, updatePet } from './petDAL';

const router = express.Router();

const baseRoute = '/pets';


router.get(`${baseRoute}`, async (req: Request, res: Response, next: NextFunction) => {
  logger.info(`GET ${baseRoute}`);

  try {
    const OWNER_ID = req.body.ownerId;
    const data = await readPets(OWNER_ID);

    res.status(200).send(data);

  } catch (err) { next(err); }
});


router.post(`${baseRoute}`, async (req: Request, res: Response, next: NextFunction) => {

  logger.info(`POST ${baseRoute}`);

  try {
    const NAME = req.body.name;
    const OWNER_ID = req.body.ownerId;
    const data = await createPet(NAME, OWNER_ID);

    res.status(200).send(data);

  } catch (err) { next(err); }
});


router.delete(`${baseRoute}/:id`, async (req: Request, res: Response, next: NextFunction) => {

  logger.info(`DELETE ${baseRoute}`);

  try {
    const ID = parseInt(req.params.id);
    const data = await deletePet(ID);

    res.status(200).send(data);

  } catch (err) { next(err); }
});


router.put(`${baseRoute}/:id`, async (req: Request, res: Response, next: NextFunction) => {

  logger.info(`PUT ${baseRoute}`);

  try {
    const ID = parseInt(req.params.id);
    const NAME = req.body.name;
    const data = await updatePet(ID, NAME);

    res.status(200).send(data);

  } catch (err) { next(err); }
});

export default router;