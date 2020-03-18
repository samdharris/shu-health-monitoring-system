const loginValidation = require('../validation/login');
const authenticatorService = require('../services/authenticatorService');
const httpCodes = require('http-status-codes');

/**
 * POST - /login
 *
 * Peforms a login for a given set of credentials
 *
 * @param {Object} req
 * @param {Object} res
 */
exports.login = async (req, res) => {
  try {
    // validate
    const validatedData = await loginValidation.validateAsync(req.body);
    // authenticate
    const response = await authenticatorService.authenticate(validatedData);
    // send
    res.json(response);
  } catch (error) {
    res.status(httpCodes.BAD_REQUEST).json({
      message: error.message
    });
  }
};

/**
 * POST - /verify
 *
 * Verifies the given token in the Authorization header
 *
 * @param {Object} req
 * @param {Object} res
 */
exports.verify = async (req, res) => {
  try {
    const response = await authenticatorService.authenticateWithToken(
      req.header('Authorization')
    );
    res.json(response);
  } catch (error) {
    res.status(httpCodes.UNAUTHORIZED).send();
  }
};
