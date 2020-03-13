const Joi = require('@hapi/joi');

const schema = Joi.object({
  value: Joi.number()
    .positive()
    .required()
});

exports.validateData = async data => await schema.validateAsync(data);
