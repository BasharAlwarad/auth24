import { Router } from 'express';

import {
  getUsers,
  getUserById,
  createUser,
  updateUser,
  deleteUser,
} from '../controllers/usersControllers.js';
const usersRouter = Router();

usersRouter.route(`/`).get(getUsers).post(createUser);
usersRouter.route(`/:id`).get(getUserById).put(updateUser).delete(deleteUser);

export default usersRouter;
