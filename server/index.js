import express, { json } from 'express';
import cors from 'cors';
import cookieParser from 'cookie-parser';

import { errorHandler } from './utils/errorHandler.js';

import validateProvider from './middlewares/validateProvider.js';
import validateMode from './middlewares/validateMode.js';

import usersRouter from './routes/usersRoutes.js';
import postsRouter from './routes/postsRoutes.js';
import reviewsRouter from './routes/reviewsRoutes.js';
import chatRouter from './routes/chatRouter.js';
import imageRouter from './routes/imageRouter.js';

import './db/mongoDB.js';

import { PORT, CLIENT_URL } from './config/config.js';

const app = express();
app.use(
  json(),
  cors({ origin: CLIENT_URL, credentials: true }),

  cookieParser()
);

app.get('/', (req, res) => {
  res.json({ message: 'Server is running!' });
});

app.use(`/api/v1/users`, usersRouter);
app.use(`/api/v1/posts`, postsRouter);
app.use(`/api/v1/reviews`, reviewsRouter);
app.use('/api/v1/chat/completions', validateProvider, validateMode, chatRouter);
app.use(
  '/api/v1/images/generations',
  validateProvider,
  validateMode,
  imageRouter
);

app.get('*', (req, res) => {
  res.status(404).json({ message: 'page not found!' });
});

app.use(errorHandler);
app.listen(PORT || 10000, () => {
  console.log(`Server is running on port ${PORT}`);
});
