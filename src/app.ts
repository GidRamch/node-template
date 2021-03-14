import express from 'express';
import { connect } from './services/mysql';
const app = express();

app.get('/', (req, res) => res.send('Express + TypeScript Server'));


const test = async () => {
  const connection = await connect();
  console.log(connection);
};


test();

export default app;