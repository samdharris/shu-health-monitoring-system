const integrationsRepository = require('../database/repositories/integrationsRepository');
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
