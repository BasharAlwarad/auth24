import { Router } from 'express';

import {
  getUsers,
  getUserById,
  createUser,
  updateUser,
  deleteUser,
  loginUser,
  logoutUser,
} from '../controllers/usersControllers.js';

import { authenticateUser } from '../middlewares/authMiddlewares.js';

const usersRouter = Router();

usersRouter.post(`/`, createUser);
usersRouter.post(`/login`, loginUser);
usersRouter.use(authenticateUser);
usersRouter.get(`/`, getUsers);
usersRouter.get(`/:id`, getUserById);
usersRouter.put(`/:id`, updateUser);
usersRouter.delete(`/:id`, deleteUser);
usersRouter.post(`/logout`, logoutUser);

export default usersRouter;
