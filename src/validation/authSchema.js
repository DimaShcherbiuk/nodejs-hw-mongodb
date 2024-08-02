import Joi from 'joi';

export const registerSchema = Joi.object({
  name: Joi.string().min(3).max(20).required().messages({
    'any.required': 'Should be a required',
    'string.min': 'Name should be at least {#limit}',
    'string.max': 'Name should be at most {#limit}',
  }),
  email: Joi.string().email().required().messages({
    'string.email': 'Email is not valid',
  }),
  password: Joi.string().required(),
});

export const loginSchema = Joi.object({
  email: Joi.string().email().required(),
  password: Joi.string().required(),
});
