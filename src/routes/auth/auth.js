import { Router } from "express";
import {
  getGoogleOAuthUrlController,
  loginWithGoogleController,
  logoutController,
  refreshUserController,
  signInController,
  signUpController,
} from "../../controllers/auth.js";
import { validateBody } from "../../middlewares/validateBody.js";
import { ctrlWrapper } from "../../utils/ctrlWrapper.js";
import {
  loginWithGoogleOAuthSchema,
  signinSchema,
  signupSchema,
} from "../../schemas/auth.js";
import { authenticate } from "../../middlewares/authenticate.js";

const router = new Router();

router.post(
  "/signup",
  validateBody(signupSchema),
  ctrlWrapper(signUpController),
);

router.post("/signin", validateBody(signinSchema), signInController);

router.post("/refresh", ctrlWrapper(refreshUserController));

router.get("/get-oauth-url", ctrlWrapper(getGoogleOAuthUrlController));

router.use(authenticate);

router.post("/logout", ctrlWrapper(logoutController));


router.post(
  "/confirm-oauth",
  validateBody(loginWithGoogleOAuthSchema),
  ctrlWrapper(loginWithGoogleController),
);

export default router;
