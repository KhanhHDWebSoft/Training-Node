import Joi from 'joi';

const create = Joi.object({
    name: Joi.string().required,
    totalVoucher: Joi.number().required,
    isRelease: Joi.boolean(),
});

const update = Joi.object({
    name: Joi.string(),
    totalVoucher: Joi.number(),
    isRelease: Joi.boolean(),
});

export default { create, update };
