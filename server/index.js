import express, { json } from 'express';
import { config } from 'dotenv';
import cors from 'cors';
import cookieParser from 'cookie-parser';

import { errorHandler } from './utils/errorHandler.js';
import usersRouter from './routes/usersRoutes.js';
import postsRouter from './routes/postsRoutes.js';
import './db/mongoDB.js';

config();
const PORT = process.env.PORT || 8080;

const app = express();
app.use(
  json(),
  cors({ origin: process.env.CLIENT_URL, credentials: true }),
  cookieParser()
);

app.get('/', (req, res) => {
  res.json({ message: 'Server is running!' });
});

app.use(`/api/v1/users`, usersRouter);
app.use(`/api/v1/posts`, postsRouter);

app.get('*', (req, res) => {
  res.status(404).json({ message: 'page not found!' });
});

app.use(errorHandler);
app.listen(PORT, () => {
  console.log(`Server is running on http://localhost:${PORT}`);
});
