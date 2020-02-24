const loginValidation = require('../validation/login');
const authenticatorService = require('../services/authenticatorService');
const httpCodes = require('http-status-codes');
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
