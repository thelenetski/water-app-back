import Joi from 'joi';

const userSchema = Joi.object({
  name: Joi.string(),
  gender: Joi.string().valid('men', 'women'),
  email: Joi.string().email(),
  password: Joi.string().min(6), // Пароль повинен бути не менше 6 символів
  sportParticipation: Joi.number().min(0).default(0),
  dailyNorm: Joi.number().positive().default(1500),
  avatarUrl: Joi.string()
    .uri()
});

export { userSchema };