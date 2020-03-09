const integrationsRepository = require('../database/repositories/integrationsRepository');

exports.updateIntegrationData = async (integrationId, data) => {
  await integrationsRepository.updateData(integrationId, data);
};
