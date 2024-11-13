import { Router } from 'express';
import {
  getPosts,
  getPostById,
  createPost,
  updatePost,
  deletePost,
  getPostsByUser,
} from '../controllers/postsControllers.js';
import { auth, admin, owner } from '../middlewares/authMiddlewares.js';

const postsRouter = Router();

postsRouter.use(auth);

postsRouter.get(`/`, getPosts);
postsRouter.post(`/`, createPost);
postsRouter.get('/user', getPostsByUser);
postsRouter.get('/:postId', getPostById);
postsRouter.put(`/:postId`, owner, updatePost);
postsRouter.delete(`/:postId`, owner, deletePost);

export default postsRouter;
