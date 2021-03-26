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
    schema: string;
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
    host: 'localhost',
    user: 'gideon',
    password: process.env.DB_PASSWORD as string,
    schema: 'SCHEMA_TEMPLATE',
  }
};

// const sandbox: CustomEnv = {

// };

// const production:CustomEnv = {

// };


// CONFIGURING EXPORT - other files don't have to worry about which env is set

const env = process.env.NODE_ENV || 'dev';

const config: Record<string, CustomEnv> = {
  dev,
  // sandbox,
  // prod,
};

export default config[env];