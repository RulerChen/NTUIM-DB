import { env } from '@/utils/env';

export const dbConfig = {
  host: env.PGHOST,
  port: env.PGPORT,
  database: env.PGDATABASE,
  user: env.PGUSER,
  password: env.PGPASSWORD,
  idleTimeoutMillis: 20000,
  connectionTimeoutMillis: 20000,
};
