const integrationsRepository = require('../database/repositories/integrationsRepository');
/**
 * GET - /api/userintegrations/:id
 *
 * Gets all integration data for the given integration
 *
 * @param {Object} req
 * @param {Object} res
 */
exports.getIntegrationData = async (req, res) => {
  try {
    const response = await integrationsRepository.getDataForIntegration(
      req.params.userIntegrationId
    );

    res.json({
      integrationData: response
    });
  } catch (error) {}
};
