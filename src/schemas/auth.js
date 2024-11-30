import Joi from "joi";

// Схема для реєстрації користувача
const signupSchema = Joi.object({
  email: Joi.string().email().required().messages({
    "string.empty": "Email is required",
    "string.email": "Please provide a valid email address",
  }),
  password: Joi.string().min(6).required().messages({
    "string.empty": "Password is required",
    "string.min": "Password must be at least 6 characters long",
  }),
  repeatPassword: Joi.any().valid(Joi.ref("password")).required().messages({
    "any.only": "Passwords must match",
    "any.required": "Please confirm your password",
  }),
});

// Схема для логіну користувача
const signinSchema = Joi.object({
  email: Joi.string().email().required(), // Перевірка email
  password: Joi.string().required(), // Пароль не може бути порожнім
});

// Схема для скиду паролю
const sendResetPasswordSchema = Joi.object({
  email: Joi.string().email().required(),
});

const resetPasswordSchema = Joi.object({
  token: Joi.string().required(), // Токен для скиду паролю (отриманий через email)
  password: Joi.string().min(6).required(), // Новий пароль
});

const loginWithGoogleOAuthSchema = Joi.object({
  code: Joi.string().required(),
});

export {
  signupSchema,
  signinSchema,
  resetPasswordSchema,
  loginWithGoogleOAuthSchema,
  sendResetPasswordSchema
};
