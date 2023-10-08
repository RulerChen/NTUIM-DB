import express from 'express';
import compression from 'compression';
import cors from 'cors';
import { Client } from 'pg';
import { env } from '@/utils/env';

const app = express();

app.use(
  cors({
    credentials: true,
    origin: ['http://localhost:3000'],
  })
);

app.use(compression());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

const _client = new Client({
  host: env.PGHOST,
  port: env.PGPORT,
  database: env.PGDATABASE,
  user: env.PGUSER,
  password: env.PGPASSWORD,
});

app.listen(8080, () => {
  console.log('server is running on http://localhost:8080');
});
