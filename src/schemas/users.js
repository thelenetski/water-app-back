import Joi from "joi";

const userSchema = Joi.object({
  name: Joi.string(),
  gender: Joi.string().valid("men", "women").default("women"),
  email: Joi.string().email(),
  password: Joi.string().min(6),
  sportParticipation: Joi.number().min(0).default(0),
  dailyNorm: Joi.number().positive().default(1500),
  weight: Joi.number().min(0).default(0),
  avatarUrl: Joi.string().uri(),
});

export { userSchema };
