const integrationsRepository = require('../database/repositories/integrationsRepository');

/**
 * Passes the given integration data off to the IntegrationRepository to be updated.
 *
 * @param {Number} integrationId
 * @param {Object} data
 * @returns Promise<any> The updated reading
 */
exports.updateIntegrationData = async (integrationId, data) =>
  await integrationsRepository.updateData(integrationId, data);

/**
 * Passes the given value off to the IntegrationRepository to have it added as a reading for the given integration
 *
 * @param {Number} integrationId
 * @param {Number} value
 * @returns {Object} The newly added reading
 */
exports.addIntegrationData = async (integrationId, value) =>
  await integrationsRepository.addData(integrationId, value);

/**
 * Gets all integrations along with all recorded data for the given user
 *
 * @param {Number} userId
 * @returns {Array<Object>}
 */
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
