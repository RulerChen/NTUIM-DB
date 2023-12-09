import express from 'express';
import compression from 'compression';
import cors from 'cors';
import session from 'express-session';
import cookieParser from 'cookie-parser';
import passport from 'passport';

import { createTable } from '@/models/init';
import routes from '@/routes';
import { env } from '@/utils/env';
import '@/config/passport.config';

const app = express();

app.use(
  cors({
    credentials: true,
    origin: 'http://localhost:3000',
    methods: 'GET,HEAD,PUT,PATCH,POST,DELETE',
  })
);

app.use(compression());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(cookieParser());
app.use(
  session({
    secret: env.SECRET_KEY,
    name: 'database_user',
    resave: false,
    saveUninitialized: false,
    cookie: {
      maxAge: 1000 * 60 * 60 * 24 * 7,
      secure: false,
      domain: 'localhost',
      sameSite: false,
    },
  })
);
app.use(passport.initialize());
app.use(passport.session());

app.use('/api', routes);

createTable();

app.listen(8080, () => {
  console.log('server is running on http://localhost:8080');
});
