const integrationsRepository = require('../database/repositories/integrationsRepository');

exports.updateIntegrationData = async (userId, integrationId, data) => {
  await integrationsRepository.updateData(userId, integrationId, data);
};
