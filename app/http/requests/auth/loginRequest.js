import Joi from 'joi';

export default Joi.object({
    email: Joi.string()
        .min(3)
        .required(),
    password: Joi.string()
        .min(6)
        .required(),
});