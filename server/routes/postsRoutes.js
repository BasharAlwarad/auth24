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
postsRouter.get('/:id', getPostById);
postsRouter.put(`/:id`, owner, updatePost);
postsRouter.delete(`/:id`, owner, deletePost);

export default postsRouter;
