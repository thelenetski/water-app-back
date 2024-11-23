import { Router } from 'express';
import {
  logoutController,
  refreshUserController,
  signInController,
  signUpController,
} from '../../controllers/auth.js';
import { validateBody } from '../../middlewares/validateBody.js';
import { ctrlWrapper } from '../../utils/ctrlWrapper.js';
import {signinSchema, signupSchema} from "../../schemas/auth.js";

const router = new Router();

router.post(
  '/signup',
  validateBody(signupSchema),
  ctrlWrapper(signUpController),
);

router.post('/signin', validateBody(signinSchema), signInController);

router.post('logout', ctrlWrapper(logoutController));

router.post('refresh', ctrlWrapper(refreshUserController));

export default router;
