import { Router } from 'express';
import {
  logoutController,
  refreshUserController,
  signInController,
  signUpController,
} from '../../controllers/auth.js';
import { validateBody } from '../../middlewares/validateBody.js';
import { ctrlWrapper } from '../../utils/ctrlWrapper.js';
import { createUserSchema } from '../../validation/auth.js';

const router = new Router();

router.post(
  '/signup',
  validateBody(createUserSchema),
  ctrlWrapper(signUpController),
);

router.post('/signin', validateBody(createUserSchema), signInController);

router.post('logout', ctrlWrapper(logoutController));

router.post('refresh', ctrlWrapper(refreshUserController));

export default router;
