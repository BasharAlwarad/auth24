import { Router } from 'express';

import {
  getUsers,
  getUserById,
  createUser,
  updateUser,
  deleteUser,
  loginUser,
  logoutUser,
  checkSession,
} from '../controllers/usersControllers.js';

import { auth, admin } from '../middlewares/authMiddlewares.js';

const usersRouter = Router();

usersRouter.post(`/`, createUser);
usersRouter.post(`/login`, loginUser);
usersRouter.post(`/logout`, logoutUser);
usersRouter.get(`/session`, auth, checkSession);
usersRouter.get(`/`, auth, getUsers);
usersRouter.get(`/:id`, auth, getUserById);
usersRouter.put(`/:id`, auth, updateUser);
usersRouter.delete(`/:id`, auth, deleteUser);

export default usersRouter;
