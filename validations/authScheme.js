const Joi = require('joi');

export const loginScheme = Joi.object().keys({
    email: Joi.string().email().required().label('Email'),
    password: Joi.string().required().label('Password')
});