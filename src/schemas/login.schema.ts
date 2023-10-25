import Joi from 'joi'

const username = Joi.string().min(3).max(100);
const password = Joi.string().min(5).max(15);

export const authenticateSchema = Joi.object({
    username: username.required(),
    password: password.required()
})