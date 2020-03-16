const Joi = require('@hapi/joi');

/**
 * Data Validator
 */
const schema = Joi.object({
  /**
   * The provided value must be a number as well as positive. It is a required field
   */
  value: Joi.number()
    .positive()
    .required()
});

exports.validateData = async data => await schema.validateAsync(data);
