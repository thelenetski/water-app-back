import { Router } from 'express';
import { editUserController } from '../controllers/users.js';
import { upload } from '../middlewares/multers.js';
import { currentUserController } from '../controllers/users.js';
import { ctrlWrapper } from '../utils/ctrlWrapper.js';
import { authenticate } from '../middlewares/authenticate.js';
import {userSchema} from "../schemas/users.js";
const router = new Router();
import {validateBody} from "../middlewares/validateBody.js";

router.use(authenticate);
router.get('/current', ctrlWrapper(currentUserController));
router.patch(
  '/',
  upload.single('avatarUrl'),
  validateBody(userSchema),
  ctrlWrapper(editUserController),
);

export default router;
