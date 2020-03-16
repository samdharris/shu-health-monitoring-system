const Joi = require('@hapi/joi');

/**
 * Login Validation
 */
module.exports = Joi.object({
  /**
   * An email address must be a string and is a required field
   */
  email: Joi.string()
    .email()
    .required(),
  /**
   * A Password must be a string and is a required field
   */
  password: Joi.string().required()
});
