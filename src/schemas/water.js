import Joi from 'joi';

const waterSchema = Joi.object({
  amount: Joi.number().positive().required(), // Кількість води в мілілітрах
  userId: Joi.string().required(), // ID користувача
  date: Joi.date().iso().required(), // Формат ISO, наприклад: YYYY-MM-DDThh:mm:ss
  curDailyNorm: Joi.number().positive().default(0), // Поточна кількість випитої води
});

export { waterSchema };