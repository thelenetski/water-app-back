import Joi from 'joi';

const userSchema = Joi.object({
  name: Joi.string().default(''),
  gender: Joi.string().valid('men', 'women').default('women'),
  email: Joi.string().email().required(),
  password: Joi.string().min(6).required(), // Пароль повинен бути не менше 6 символів
  sportParticipation: Joi.number().min(0).default(0),
  dailyNorm: Joi.number().positive().default(1500),
  avatarUrl: Joi.string()
    .uri()
    .default('https://cloudinary.com/my-avatars/def.jpeg'),
  activeTime: Joi.number().positive().default(0), // Активність у хвилинах
  
});

export { userSchema };