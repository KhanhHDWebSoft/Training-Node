import Joi from 'joi';

const create = Joi.object({
    code: Joi.string().required,
    eventId: Joi.string().required,
});

const update = Joi.object({
    code: Joi.string().required,
    eventId: Joi.string().required,
});

export default { create, update };
