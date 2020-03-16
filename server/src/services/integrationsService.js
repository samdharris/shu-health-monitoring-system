const integrationsRepository = require('../database/repositories/integrationsRepository');

exports.updateIntegrationData = async (integrationId, data) =>
  await integrationsRepository.updateData(integrationId, data);

exports.addIntegrationData = async (integrationId, value) =>
  await integrationsRepository.addData(integrationId, value);

exports.getIntegrationsForUser = async userId => {
  const data = await integrationsRepository.getUserIntegrations(userId);
  const integrations = [];

  for (let i = 0; i < data.length; i++) {
    const d = data[i];
    const integrationData = await integrationsRepository.getDataForIntegration(
      d.integrationId
    );
    const res = {
      ...d,
      data: integrationData
    };

    integrations.push(res);
  }

  return {
    integrations
  };
};
