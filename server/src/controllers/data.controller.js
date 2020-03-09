const dataValidator = require('../validation/dataValidator');
const integrationsService = require('../services/integrationsService');
const httpCodes = require('http-status-codes');

exports.updateData = async (req, res) => {
  try {
    const validatedData = await dataValidator.validateData(req.body);
    const response = await integrationsService.updateIntegrationData(
      req.params.integrationId,
      validatedData
    );
    res.json(response);
  } catch (error) {
    console.error(error);
    res.status(httpCodes.BAD_REQUEST).send();
  }
};
