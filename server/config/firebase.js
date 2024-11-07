import admin from 'firebase-admin';

import {
  FIREBASE_SERVICE_ACCOUNT_FILE_NAME,
  FIREBASE_SERVICE_BUCKET_NAME,
} from './config.js';

admin.initializeApp({
  credential: admin.credential.cert(FIREBASE_SERVICE_ACCOUNT_FILE_NAME),
  storageBucket: FIREBASE_SERVICE_BUCKET_NAME,
});

export const bucket = admin.storage().bucket();
