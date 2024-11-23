import { Router } from 'express';
import authRouter from './auth/auth.js';
import { editUserController } from '../controllers/users.js';
import { upload } from '../middlewares/multers.js';
import { currenUserController } from '../controllers/auth.js';
import { ctrlWrapper } from '../utils/ctrlWrapper.js';
import { authenticate } from '../middlewares/authenticate.js';
import { updateUserSchema } from '../validation/user.js';
const router = new Router();

router.use('/auth', authRouter);
router.use(authenticate);
router.get('/current', ctrlWrapper(currenUserController));
router.patch(
  '/',
  upload.single('avatar'),
  validateBody(updateUserSchema),
  ctrlWrapper(editUserController),
);
router.patch('/editUser', editUserController);

export default router;
