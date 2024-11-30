import { Router } from 'express';
import {
  addWaterController,
  deleteWaterController,
  editWaterController,
  getWaterController,
  getWaterPerMonthController,
} from '../controllers/water.js';
import { ctrlWrapper } from '../utils/ctrlWrapper.js';
import {editWaterSchema, waterSchema} from "../schemas/water.js";
import {validateBody} from "../middlewares/validateBody.js";
import {authenticate} from "../middlewares/authenticate.js";
const router = new Router();

router.use(authenticate);

router.post('/', validateBody(waterSchema), ctrlWrapper(addWaterController));

router.patch(
  '/:id',
  validateBody(editWaterSchema),
  ctrlWrapper(editWaterController),
);

router.delete('/:id', ctrlWrapper(deleteWaterController));

router.get('/today', ctrlWrapper(getWaterController));

router.get('/month', ctrlWrapper(getWaterPerMonthController));

export default router;
