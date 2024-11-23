import {Router} from 'express';
import authRouter from './auth/auth.js';
import {editUserController} from "../controllers/users.js";
const router = new Router();

router.use('/auth', authRouter);

router.put('editUser', editUserController);

export default router;