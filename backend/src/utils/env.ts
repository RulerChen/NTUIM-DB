import 'dotenv/config';

export const env = {
  PGHOST: process.env.PGHOST || 'localhost',
  PGUSER: process.env.PGUSER || 'postgres',
  PGDATABASE: process.env.PGDATABASE || 'postgres',
  PGPASSWORD: process.env.PGPASSWORD || '123',
  PGPORT: Number(process.env.PGPORT) || 5432,
  CLIENT_URL: process.env.CLIENT_URL || 'http://localhost:3000',
  SERVER_URL: process.env.SERVER_URL || 'http://localhost:8080',
  SECRET_KEY: process.env.SECRET_KEY || '878787',
  GOOGLE_CLIENT_ID: process.env.GOOGLE_CLIENT_ID || '',
  GOOGLE_CLIENT_SECRET: process.env.GOOGLE_CLIENT_SECRET || '',
  FACEBOOK_APP_ID: process.env.FACEBOOK_APP_ID || '',
  FACEBOOK_APP_SECRET: process.env.FACEBOOK_APP_SECRET || '',
  LINE_PAY_CHANNELID: process.env.LINE_PAY_CHANNELID || '',
  LINE_PAY_SECRET: process.env.LINE_PAY_SECRET || '',
  LINE_PAY_VERSION: process.env.LINE_PAY_VERSION || 'v3',
  LINE_PAY_SITE: process.env.LINE_PAY_SITE || 'https://sandbox-api-pay.line.me',
  CLOUD_NAME: process.env.CLOUD_NAME || '',
  CLOUD_API_KEY: process.env.CLOUD_API_KEY || '',
  CLOUD_API_SECRET: process.env.CLOUD_API_SECRET || '',
};
