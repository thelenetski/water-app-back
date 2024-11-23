import { Router } from 'express';
import authRouter from './auth/auth.js';
import { editUserController } from '../controllers/users.js';
import { upload } from '../middlewares/multers.js';
import { currenUserController } from '../controllers/auth.js';
import { ctrlWrapper } from '../utils/ctrlWrapper.js';
import { authenticate } from '../middlewares/authenticate.js';
import {userSchema} from "../schemas/users.js";
const router = new Router();
import {validateBody} from "../middlewares/validateBody.js";

router.use('/auth.js', authRouter);
router.use(authenticate);
router.get('/current', ctrlWrapper(currenUserController));
router.patch(
  '/',
  upload.single('avatar'),
  validateBody(userSchema),
  ctrlWrapper(editUserController),
);

export default router;
