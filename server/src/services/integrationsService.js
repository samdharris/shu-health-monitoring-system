const integrationsRepository = require('../database/repositories/integrationsRepository');

exports.updateIntegrationData = async (userId, integrationId, data) =>
  await integrationsRepository.updateData(userId, integrationId, data);

exports.addIntegrationData = async (integrationId, value) =>
  await integrationsRepository.addData(integrationId, value);

exports.getIntegrationsForUser = async userId => {
  const data = await integrationsRepository.getUserIntegrations(userId);
  return {
    integrations: data
  };
};