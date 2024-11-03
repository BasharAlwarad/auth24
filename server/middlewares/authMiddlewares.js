export const authenticateUser = (req, res, next) => {
  if (req.session.userId) {
    next();
  } else {
    next(new CustomError('Unauthorized access', 401));
  }
};
