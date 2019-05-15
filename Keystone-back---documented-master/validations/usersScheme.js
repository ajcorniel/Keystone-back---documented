import Joi from 'joi';

/**
 * Singup schema, must be a valid email.
 * @param {string} firstname
 * @param {string} lastname
 * @param {string} email
 * @param {string} password
 */
export const createUser = Joi.object().keys({
    firstname: Joi.string().required(),
    lastname: Joi.string().required(),
    email: Joi.string().email().required(),
    password: Joi.number().required()
});

/**
 * Makes it possible to select an user by its email.
 * @param {string} email
 */
export const userByEmail = Joi.object().keys({
    email: Joi.string().email().required()
});

/**
 * Makes it possible to select an user by its id.
 * @param {integer} id
 */
export const userById = Joi.object().keys({
    id: Joi.number().required()
});