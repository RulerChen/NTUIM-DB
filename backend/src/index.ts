import express from 'express';
import compression from 'compression';
import cors from 'cors';
import session from 'express-session';
import passport from 'passport';
import MongoStore from 'connect-mongo';

import { createTable } from '@/models/init';
import routes from '@/routes';
import { env } from '@/utils/env';
import '@/config/passport.config';

import { createServer } from 'http';
import { Server } from 'socket.io';

type Message = {
  message_id: string;
  chatgroup_id: string;
  member_id: string;
  message_time: Date;
  message_text: string;
};

const app = express();

app.use(
  cors({
    credentials: true,
    origin: 'http://localhost:3000',
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
    name: 'database_user',
    store: MongoStore.create({
      mongoUrl: process.env.MONGO_URI,
      collectionName: 'sessions',
    }),
    resave: false,
    saveUninitialized: false,
    cookie: {
      path: '/',
      maxAge: 1000 * 60 * 60 * 24 * 7,
      secure: false,
      domain: 'localhost',
    },
  })
);
app.use(passport.initialize());
app.use(passport.session());

app.use('/api', routes);

createTable();

server.listen(8080, () => {
  console.log('server is running on http://localhost:8080');
});
