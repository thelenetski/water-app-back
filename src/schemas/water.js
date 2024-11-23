import Joi from 'joi';

const waterSchema = Joi.object({
  amount: Joi.number().positive().required(), // Кількість води в мілілітрах
  date: Joi.date().iso().required(), // Формат ISO, наприклад: YYYY-MM-DDThh:mm:ss
});

const editWaterSchema = Joi.object({
  amount: Joi.number().positive(),
  date: Joi.date().iso()
});
export { waterSchema, editWaterSchema};