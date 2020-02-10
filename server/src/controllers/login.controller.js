const loginValidation = require('../validation/login');
const authenticatorService = require('../services/authenticatorService');

exports.login = async (req, res) => {
  // validate
  const validatedData = await loginValidation.validateAsync(req.body);
  // authenticate
  const token = jwt.sign(validatedData.username, process.env.JWT_SECRET);
  // send response
  const response = authenticatorService.authenticate(validatedData);
  res.json(response);
};
