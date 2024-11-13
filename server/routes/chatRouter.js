import { Router } from 'express';
import { createChat } from '../controllers/chat.js';

const chatRouter = Router();

chatRouter.post('/:postId', createChat);

export default chatRouter;
