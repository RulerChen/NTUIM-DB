import express from 'express';
import compression from 'compression';
import cors from 'cors';

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

app.listen(8080, () => {
  console.log('server is running on http://localhost:8080');
});
