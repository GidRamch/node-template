import express from 'express';
import { logger } from './services/logger';
import { callProcedure } from './services/mysql';
const app = express();

app.get('/', (req, res) => res.send('Express + TypeScript Server'));

const test = async () => {
  try {
    const res = await callProcedure('GET$PERSON_PETS', { PERSON_ID: 1 });
    console.log(res);
  } catch (e) {
    logger.error(e);
  }
};

test();

export default app;