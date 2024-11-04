import express, { json } from 'express';
import { config } from 'dotenv';
import cors from 'cors';
import { errorHandler } from './utils/errorHandler.js';
import usersRouter from './routes/usersRoutes.js';
import { authSession } from './utils/session.js';
import './db/mongoDB.js';

config();
const PORT = process.env.PORT || 8080;

const app = express();
app.use(
  json(),
  cors({ origin: 'http://localhost:5173', credentials: true }),
  authSession
);

app.get('/', (req, res) => {
  res.json({ message: 'Server is running!' });
});

app.use(`/api/v1/users`, usersRouter);

app.get('*', (req, res) => {
  res.status(404).json({ message: 'page not found!' });
});

app.use(errorHandler);
app.listen(PORT, () => {
  console.log(`Server is running on http://localhost:${PORT}`);
});
