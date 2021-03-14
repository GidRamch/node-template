import config from '../../config/config';
import mysql, { Connection } from 'mysql';


export const connect = (): Promise<Connection> => {
  return new Promise((resolve, reject) => {
    const connection = mysql.createConnection({
      host: config.db.host,
      user: config.db.user,
      password: config.db.password,
      // database: 'TRINI_PAY'
    });

    connection.connect((err) => {
      if (err) {
        reject(err);
      }

      resolve(connection);
    });
  });
};