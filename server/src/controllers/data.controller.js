const dataValidator = require('../validation/dataValidator');
const integrationsService = require('../services/integrationsService');
const httpCodes = require('http-status-codes');
const jwt = require('jsonwebtoken');
exports.updateData = async (req, res) => {
  try {
    const validatedData = await dataValidator.validateData(req.body);
    const split = req.header('Authorization').split(' ');
    const token = split[split.length - 1];
    const { userId } = jwt.decode(token);
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

exports.addData = async (req, res) => {
  try {
    const response = await integrationsService.addIntegrationData(
      req.params.integrationId,
      req.body.value
    );
    res.status(httpCodes.CREATED).json(response);
  } catch (error) {
    console.error(error);
    res.status(httpCodes.BAD_REQUEST).send();
  }
};

exports.viewData = async (req, res) => {
  try {
    const response = await integrationsService.getIntegrationsForUser(
      req.params.userId
    );
    res.json(response);
  } catch (error) {
    console.error(error);
    res.status(httpCodes.INTERNAL_SERVER_ERROR).send();
  }
};
