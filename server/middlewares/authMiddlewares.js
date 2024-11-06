import jwt from 'jsonwebtoken';
import { CustomError } from '../utils/errorHandler.js';
import Post from '../models/postsModel.js';

export const auth = (req, res, next) => {
  const token = req.cookies.token;

  if (!token) {
    return next(new CustomError('Unauthorized access', 401));
  }

  try {
    const decoded = jwt.verify(token, process.env.JWT_SECRET);
    req.user = decoded;
    next();
  } catch (error) {
    next(new CustomError('Invalid or expired token', 401));
  }
};

export const owner = async (req, res, next) => {
  try {
    const postId = req.params.id;
    const userId = req.user.id;
    const post = await Post.findById(postId);

    if (!post) {
      return next(new CustomError('Post not found', 404));
    }

    // Check if the user owns the post
    if (post.user.toString() !== userId) {
      return next(
        new CustomError('Unauthorized access: You do not own this post', 403)
      );
    }

    next();
  } catch (error) {
    next(new CustomError(error.message || 'Authorization failed', 500));
  }
};

export const admin = (req, res, next) => {
  if (req.user && req.user.role === 'admin') {
    return next();
  }
  next(new CustomError('Access denied. Admins only.', 403));
};
