import { CustomError } from '../utils/errorHandler.js';
import jwt from 'jsonwebtoken';

export const auth = (req, res, next) => {
  const token = req.cookies.token;
  if (!token) {
    return next(new CustomError('Unauthorized access', 401));
  }
  try {
    const decoded = jwt.verify(token, process.env.JWT_SECRET);
    console.log(decoded);
    req.user = decoded; // Attach decoded user data to request
    next();
  } catch (error) {
    next(new CustomError('Invalid or expired token', 401));
  }
};

export const admin = (req, res, next) => {
  if (req.session.user && req.session.user.role === 'admin') {
    return next();
  }
  next(new CustomError('Access denied. Admins only.', 403));
};
