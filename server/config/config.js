import { config } from 'dotenv';
config();

const PORT = process.env.PORT || 8080;
const MONGO_URI = process.env.MONGODB_URI;
const SESSION_SECRET = process.env.SESSION_SECRET;
const JWT_SECRET = process.env.JWT_SECRET;
const JWT_EXPIRES_IN = process.env.JWT_EXPIRES_IN;
const CLIENT_URL = process.env.CLIENT_URL;
const FIREBASE_SERVICE_ACCOUNT_FILE_NAME =
  process.env.FIREBASE_SERVICE_ACCOUNT_FILE_NAME;
const FIREBASE_SERVICE_BUCKET_NAME = process.env.FIREBASE_SERVICE_BUCKET_NAME;

export {
  PORT,
  MONGO_URI,
  SESSION_SECRET,
  JWT_SECRET,
  JWT_EXPIRES_IN,
  CLIENT_URL,
  FIREBASE_SERVICE_ACCOUNT_FILE_NAME,
  FIREBASE_SERVICE_BUCKET_NAME,
};
