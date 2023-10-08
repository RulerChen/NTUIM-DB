import dotenv from 'dotenv';

dotenv.config();

export const env = {
  PGHOST: process.env.PGHOST || 'localhost',
  PGUSER: process.env.PGUSER || 'postgres',
  PGDATABASE: process.env.PGDATABASE || 'postgres',
  PGPASSWORD: process.env.PGPASSWORD || '123',
  PGPORT: Number(process.env.PGPORT) || 5432,
};
