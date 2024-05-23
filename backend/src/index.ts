import express from 'express';
import compression from 'compression';
import cors from 'cors';
import session from 'express-session';
import passport from 'passport';
import pgSession from 'connect-pg-simple';
import { createServer } from 'http';
import { Server } from 'socket.io';
import cloudinary from 'cloudinary';

import { pool, databaseConnection } from '@/models/init';
import routes from '@/routes';
import { env } from '@/utils/env';
import '@/config/passport.config';

type Message = {
  message_id: string;
  chatgroup_id: string;
  member_id: string;
  message_time: Date;
  message_text: string;
};

const app = express();

databaseConnection();

app.use(
  cors({
    credentials: true,
    origin: `${env.CLIENT_URL}`,
    methods: 'GET,HEAD,PUT,PATCH,POST,DELETE',
  })
);

const server = createServer(app);
const io = new Server(server, {
  cors: {
    origin: '*',
  },
});

io.on('connection', (socket) => {
  // New user has connected
  console.log('A user connected');
  // User has disconnected
  socket.on('disconnect', () => {
    console.log('A user disconnected');
  });
  // User has sent a message
  socket.on('send_message', (newMessage: Message) => {
    io.emit('receive_message', newMessage);
  });
});

app.set('trust proxy', 1);

app.use(compression());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(
  session({
    secret: env.SECRET_KEY,
    name: 'session',
    store: new (pgSession(session))({
      pool: pool,
      createTableIfMissing: true,
    }),
    resave: false,
    saveUninitialized: false,
    cookie: {
      maxAge: 1000 * 60 * 60 * 24 * 7,
      secure: process.env.NODE_ENV === 'production',
      ...(process.env.NODE_ENV === 'production' && {
        sameSite: 'none',
      }),
    },
  })
);
app.use(passport.initialize());
app.use(passport.session());

cloudinary.v2.config({
  cloud_name: env.CLOUD_NAME,
  api_key: env.CLOUD_API_KEY,
  api_secret: env.CLOUD_API_SECRET,
});

app.use('/api', routes);

server.listen(8080, () => {
  console.log('server is running on http://localhost:8080');
});
