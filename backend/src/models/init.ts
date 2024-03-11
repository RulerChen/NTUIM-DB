import fs from 'fs';
import path from 'path';
import pg from 'pg';
import { env } from '@/utils/env';

const pool = new pg.Pool({
  host: `${env.PGHOST}`,
  user: `${env.PGUSER}`,
  password: `${env.PGPASSWORD}`,
  port: env.PGPORT,
  database: `${env.PGDATABASE}`,
});

pool.on('error', () => {
  process.exit(-1);
});

const databaseConnection = async () => {
  const sqlQuery = fs.readFileSync(path.join(__dirname, '/init.sql'), 'utf8');
  try {
    await pool.connect();
    await pool.query(sqlQuery);
    console.log('Database connection successful');
  } catch (error) {
    console.log(error);
  }
};

export { databaseConnection, pool };
