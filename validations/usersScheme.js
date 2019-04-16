import Joi from 'joi';

export const createUser = Joi.object().keys({
    firstname: Joi.string().required(),
    lastname: Joi.string().required(),
    email: Joi.string().email().required(),
    password: Joi.number().required()
});

export const userByEmail = Joi.object().keys({
    email: Joi.string().email().required()
});

export const userById = Joi.object().keys({
    id: Joi.number().required()
});