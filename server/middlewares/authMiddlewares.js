import { CustomError } from '../utils/errorHandler.js';

export const auth = (req, res, next) => {
  if (req.session.userId) {
    return next();
  }
  next(new CustomError('Unauthorized access', 401));
};

export const admin = (req, res, next) => {
  if (req.session.user && req.session.user.role === 'admin') {
    return next();
  }
  next(new CustomError('Access denied. Admins only.', 403));
};
