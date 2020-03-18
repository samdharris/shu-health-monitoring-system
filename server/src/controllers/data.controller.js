const dataValidator = require('../validation/dataValidator');
const integrationsService = require('../services/integrationsService');
const httpCodes = require('http-status-codes');

/**
 * PUT - /api/integrations/:integrationId/data
 *
 * Updates the given integration reading with the provided value
 *
 * @param {Object} req
 * @param {Object} res
 */
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

/**
 * POST - /api/integrations/:integrationId/data
 *
 * Adds a given reading to the database
 *
 * @param {Object} req
 * @param {Object} res
 */
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

/**
 * GET - /api/integrations/:userId
 *
 * Gets all integrations for a given user
 *
 * @param {Object} req
 * @param {Object} res
 */
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
