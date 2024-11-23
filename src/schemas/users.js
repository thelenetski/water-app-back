import Joi from 'joi';

const userSchema = Joi.object({
  email: Joi.string().email().required(),
  password: Joi.string().min(6).required(), // Пароль повинен бути не менше 6 символів
  name: Joi.string().default(''),
  avatarUrl: Joi.string()
    .uri()
    .default('https://cloudinary.com/my-avatars/def.jpeg'),
  gender: Joi.string().valid('men', 'women').default('women'),
  weight: Joi.number().positive().default(0), // Вага в кілограмах
  activeTime: Joi.number().positive().default(0), // Активність у хвилинах
  dailyNorm: Joi.number().positive().default(1500),
});

export { userSchema };