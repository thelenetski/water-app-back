import { Router } from "express";
import {
  getGoogleOAuthUrlController,
  loginWithGoogleController,
  logoutController,
  refreshUserController, resetPwdController, sendResetPwdController,
  signInController,
  signUpController,
} from "../../controllers/auth.js";
import { validateBody } from "../../middlewares/validateBody.js";
import { ctrlWrapper } from "../../utils/ctrlWrapper.js";
import {
  loginWithGoogleOAuthSchema, resetPasswordSchema, sendResetPasswordSchema,
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

router.post(
    "/confirm-oauth",
    validateBody(loginWithGoogleOAuthSchema),
    ctrlWrapper(loginWithGoogleController),
);

router.post("/send-reset-pwd", validateBody(sendResetPasswordSchema), ctrlWrapper(sendResetPwdController));

router.post("/reset-pwd",validateBody(resetPasswordSchema), ctrlWrapper(resetPwdController));

router.use(authenticate);

router.post("/logout", ctrlWrapper(logoutController));


export default router;
