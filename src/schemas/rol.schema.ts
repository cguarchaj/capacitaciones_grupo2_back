import Joi from 'joi'

const id = Joi.number().integer();
const nombre = Joi.string().min(3).max(100);
const usuario = Joi.string().min(3).max(15);
const estado = Joi.number().integer();

export const createSchema = Joi.object({
    nombre: nombre.required(),
    usuario: usuario.required()
})

export const updateSchema = Joi.object({
    id: id.required(),
    nombre: nombre.required(),
    usuario: usuario.required()
})

export const actionSchema = Joi.object({
    id: id.required(),
    estado: estado.required(),
    usuario: usuario.required()
})

export const oneSchema = Joi.object({
    id: id.required(),
    usuario: usuario.required()
})