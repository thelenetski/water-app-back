import { Router } from 'express';
import {
  addWaterController,
  deleteWaterController,
  editWaterController,
  getWaterController,
  getWaterPerMonthController,
} from '../controllers/water.js';
import { ctrlWrapper } from '../utils/ctrlWrapper.js';

const router = new Router();

router.post('/', validateBody(waterSchema), ctrlWrapper(addWaterController));

router.patch(
  '/',
  validateBody(updateWaterSchema),
  ctrlWrapper(editWaterController),
);

router.delete('/', ctrlWrapper(deleteWaterController));

// router.get('/', ctrlWrapper(getWaterController));
router.get('/today', ctrlWrapper(getWaterController));
router.get('/month', ctrlWrapper(getWaterPerMonthController));

export default router;
