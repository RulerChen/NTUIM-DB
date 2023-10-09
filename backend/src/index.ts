import express from 'express';
import compression from 'compression';
import cors from 'cors';
import { createTable } from './models/init';

import routes from '@/routes';

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

app.use('/api', routes);

createTable();

app.listen(8080, () => {
  console.log('server is running on http://localhost:8080');
});
