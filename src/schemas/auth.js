import Joi from 'joi';

// Схема для реєстрації користувача
const signupSchema = Joi.object({
    name: Joi.string().min(3).max(30).required(), // Додано мінімальну та максимальну довжину для name
    email: Joi.string().email().required(), // Перевірка, чи є email
    password: Joi.string().min(6).required(), // Мінімальна довжина паролю
    repeatPassword: Joi.any().valid(Joi.ref('password')).required().options({
        messages: {
            any: 'Passwords must match',
        }
    })
});

// Схема для логіну користувача
const signinSchema = Joi.object({
    email: Joi.string().email().required(), // Перевірка email
    password: Joi.string().required(), // Пароль не може бути порожнім
});

// Схема для скиду паролю
const resetPasswordSchema = Joi.object({
    token: Joi.string().required(), // Токен для скиду паролю (отриманий через email)
    password: Joi.string().min(6).required(), // Новий пароль
});

export {signupSchema, signinSchema, resetPasswordSchema};