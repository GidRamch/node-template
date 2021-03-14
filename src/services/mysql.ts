import config from '../../config/config';
import mysql, { Pool } from 'mysql';


let connectionPool: Pool;     // Not meant to be referenced directly -> use getConnectionPool();


export const getConnectionPool = (): Pool => {
  if (connectionPool) { return connectionPool; }

  connectionPool = mysql.createPool({
    host: config.db.host,
    user: config.db.user,
    password: config.db.password,
    connectionLimit: 50,
    database: config.db.schema,
    multipleStatements: true,
  });

  return connectionPool;
};


export const executeQuery = (sql: string, values: unknown = undefined): Promise<any> => {
  return new Promise((resolve, reject) => {
    try {
      const pool = getConnectionPool();

      pool.query(
        {
          sql,
          values: JSON.stringify(values)
        },
        (err, results) => {
          if (err) { reject(err); }
          resolve(results);
        }
      );

    } catch (err) {
      reject(err);
    }
  });
};


export const callProcedure = async (procedureName: string, value: unknown): Promise<any> => {
  const res = await executeQuery(`CALL ${procedureName}(?, @OUTPUT); SELECT @OUTPUT;`, value);
  return res[1][0]['@OUTPUT'];
};