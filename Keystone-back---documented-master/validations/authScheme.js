const Joi = require('joi');
/**
 * Login schema, must match with the provide login params.
 * @param {string} email
 * @param {string} password
 */
export const loginScheme = Joi.object().keys({
    email: Joi.string().email().required().label('Email'),
    password: Joi.string().required().label('Password')
});