import express, { json } from 'express';
import session from 'express-session';
import MongoStore from 'connect-mongo'; // Optional: For session storage in MongoDB
import { config } from 'dotenv';
import cors from 'cors';
import { errorHandler } from './utils/errorHandler.js';
import usersRouter from './routes/usersRoutes.js';
import './db/mongoDB.js';

config();
const PORT = process.env.PORT || 8080;

const app = express();
app.use(json(), cors());

app.use(
  session({
    secret: process.env.SESSION_SECRET || 'your_session_secret', // Use an environment variable
    resave: false,
    saveUninitialized: false,
    store: MongoStore.create({ mongoUrl: process.env.MONGODB_URI }), // Optional: Store sessions in MongoDB
    cookie: {
      maxAge: 1000 * 60 * 60, // 1 hour
      httpOnly: true, // Helps prevent XSS attacks
      secure: process.env.NODE_ENV === 'production', // Use HTTPS in production
    },
  })
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
