import {Router} from 'express';
import {
    addWaterController,
    deleteWaterController,
    editWaterController,
     getWaterController
} from "../controllers/water.js";

const router = new Router();

router.post('/', addWaterController);

router.put('/', editWaterController);

router.delete('/', deleteWaterController);

router.get('/', getWaterController);
export default router;