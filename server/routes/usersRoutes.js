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

usersRouter.post(`/login`, loginUser);

usersRouter.get(`/`, authenticateUser, getUsers);
usersRouter.post(`/`, createUser);
usersRouter.get(`/:id`, authenticateUser, getUserById);
usersRouter.put(`/:id`, authenticateUser, updateUser);
usersRouter.delete(`/:id`, authenticateUser, deleteUser);
usersRouter.post(`/logout`, logoutUser);

export default usersRouter;
