import Joi from 'joi';

export const updateUserSchema = Joi.object({
  name: Joi.string().optional(),
  email: Joi.string().email().optional(),
  password: Joi.string().min(6).optional(),
  weight: Joi.number().optional(),
  sportParticipation: Joi.number().integer().optional(),
  gender: Joi.string().valid('male', 'female').optional(),
  dailyNorm: Joi.number().integer(),
  avatar: Joi.string().uri().allow(''),
});
