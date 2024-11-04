import { CustomError } from '../utils/errorHandler.js';

export const auth = (req, res, next) => {
  //   if (req.path === '/logout') {
  //     return next();
  //   }

  if (req.session.user) {
    return next();
  }
  next(new CustomError('Unauthorized access', 401));
};
