import dotenv from 'dotenv';

dotenv.config();

// INTERFACE TO STRONGLY TYPE

interface CustomEnv {
  app: {
    host: string;
    protocol: string;
    port: number;
  },
  server: {
    host: string;
    protocol: string;
    port: number;
  },
  db: {
    host: string;
    user: string;
    password: string;
  }
}


// ENVIRONMENTS

const dev: CustomEnv = {
  app: {
    host: 'localhost',
    protocol: 'http',
    port: 3000,
  },
  server: {
    host: 'localhost',
    protocol: 'http',
    port: 3001,
  },
  db: {
    host: process.env.DB_HOST as string,
    user: process.env.DB_USER as string,
    password: process.env.DB_PASSWORD as string,
  }
};

// const sandbox: CustomEnv = {

// };

// const prod:CustomEnv = {

// };


// CONFIGURING EXPORT - other files don't have to worry about which env is set

const env = process.env.NODE_ENV || 'dev';

const config: Record<string, CustomEnv> = {
  dev,
  // sandbox,
  // prod,
};

export default config[env];