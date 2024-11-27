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
import {authenticate} from "../../middlewares/authenticate.js";

const router = new Router();

router.post(
  '/signup',
  validateBody(signupSchema),
  ctrlWrapper(signUpController),
);

router.post('/signin', validateBody(signinSchema), signInController);

router.use(authenticate);
router.post('/logout', ctrlWrapper(logoutController));

router.post('/refresh', ctrlWrapper(refreshUserController));

export default router;
