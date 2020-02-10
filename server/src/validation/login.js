const Joi = require('@hapi/joi');

module.exports = Joi.object({
  username: Joi.string().required(),
  password: Joi.string().required()
});
