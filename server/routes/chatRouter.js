import { Router } from 'express';
import { createChat } from '../controllers/chat.js';
import { auth, owner } from '../middlewares/authMiddlewares.js';

const chatRouter = Router();

chatRouter.post('/:postId', auth, owner, createChat);

export default chatRouter;
