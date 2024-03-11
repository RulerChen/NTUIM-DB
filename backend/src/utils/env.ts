import 'dotenv/config';

export const env = {
  PGHOST: process.env.PGHOST || 'localhost',
  PGUSER: process.env.PGUSER || 'postgres',
  PGDATABASE: process.env.PGDATABASE || 'postgres',
  PGPASSWORD: process.env.PGPASSWORD || '123',
  PGPORT: Number(process.env.PGPORT) || 5432,
  CLIENT_URL: process.env.CLIENT_URL || 'http://localhost:3000',
  SECRET_KEY: process.env.SECRET_KEY || '878787',
  GOOGLE_CLIENT_ID: process.env.GOOGLE_CLIENT_ID || '',
  GOOGLE_CLIENT_SECRET: process.env.GOOGLE_CLIENT_SECRET || '',
  FACEBOOK_APP_ID: process.env.FACEBOOK_APP_ID || '',
  FACEBOOK_APP_SECRET: process.env.FACEBOOK_APP_SECRET || '',
};
