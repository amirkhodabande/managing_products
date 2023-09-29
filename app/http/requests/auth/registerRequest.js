import Joi from 'joi';

export default Joi.object({
    first_name: Joi.string()
        .min(3)
        .required(),
    last_name: Joi.string()
        .min(3)
        .required(),
    email: Joi.string()
        .min(3)
        // TODO: unique validation
        .required(),
    password: Joi.string()
        .min(6)
        .required(),
});