import { Router } from 'express';

import {
  createPost,
  getPosts,
  getPostById,
  updatePost,
  deletePost,
  getPostsByUser,
} from '../controllers/postsControllers.js';

import { auth, owner } from '../middlewares/authMiddlewares.js';

const postsRouter = Router();

postsRouter.get(`/`, auth, getPosts);
postsRouter.get(`/user`, auth, getPostsByUser);
postsRouter.post(`/`, auth, createPost);
postsRouter.get(`/:id`, auth, getPostById);
postsRouter.put(`/:id`, auth, owner, updatePost);
postsRouter.delete(`/:id`, auth, owner, deletePost);

export default postsRouter;
