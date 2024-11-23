import {Router} from 'express';
import {
    currenUserController,
    logoutController,
    refreshUserController,
    signInController,
    signUpController
} from "../../controllers/auth.js";

const router = new Router();

router.post('/signup', signUpController);

router.post('/signin', signInController);

router.post('logout', logoutController);

router.post('refresh', refreshUserController);

router.get('/current', currenUserController);

export default router;