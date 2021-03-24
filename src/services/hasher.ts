import bcrypt from 'bcrypt';


const SALT_ROUNDS = 10;


export const getHash = (plainText: string): Promise<string> => {
  return new Promise((resolve, reject) => {
    try {
      bcrypt.hash(plainText, SALT_ROUNDS, (err, hash) => {
        if (err) {
          reject(err);
        }
        resolve(hash);
      });
    } catch (err) {
      reject(err);
    }
  });
};


export const compareHash = (plainText: string, hash: string): Promise<boolean> => {
  return new Promise((resolve, reject) => {
    try {
      bcrypt.compare(plainText, hash, (err, result) => {
        if (err) { reject(err); }
        resolve(result);
      });
    } catch (err) { reject(err); }
  });
};