import express, { json } from 'express';
import { config } from 'dotenv';
import cors from 'cors';
import { errorHandler } from './utils/errorHandler.js';

import usersRouter from './routes/usersRoutes.js';

import './db/mongoDB.js';

const app = express();
config();
const PORT = process.env.PORT || 8080;
app.use(json(), cors());

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
