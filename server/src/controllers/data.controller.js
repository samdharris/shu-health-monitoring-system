const dataValidator = require('../validation/dataValidator');
const integrationsService = require('../services/integrationsService');
const httpCodes = require('http-status-codes');
const jwt = require('jsonwebtoken');
exports.updateData = async (req, res) => {
  try {
    const validatedData = await dataValidator.validateData(req.body);
    const userId = jwt.decode(req.header('Authorization').split(' ')[1]);
    const response = await integrationsService.updateIntegrationData(
      userId,
      req.params.integrationId,
      validatedData
    );
    res.json(response);
  } catch (error) {
    console.error(error);
    res.status(httpCodes.BAD_REQUEST).send();
  }
};
