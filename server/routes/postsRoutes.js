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

postsRouter.route('/').get(getPosts).post(createPost);
postsRouter.get('/user', getPostsByUser);

postsRouter.use(owner);
postsRouter.route('/:id').get(getPostById).patch(updatePost).delete(deletePost);

export default postsRouter;
