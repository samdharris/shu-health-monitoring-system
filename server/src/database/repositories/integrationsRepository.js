const databaseService = require('../../services/databaseService');

/**
 * Updates the given set of integration data
 *
 * @param {Number} userIntegrationId
 * @param {Object} data
 *
 * @returns {Promise<Object>}
 */
exports.updateData = async (userIntegrationId, data) => {
  return await databaseService.updateData(
    'integrations_data',
    'id',
    userIntegrationId,
    data
  );
};

/**
 * Creates a new reading
 *
 * @param {Number} integrationId
 * @param {Number} value
 *
 * @returns {Promise<Object>}
 */
exports.addData = async (integrationId, value) =>
  await databaseService.addData('integrations_data', {
    user_integration_id: integrationId,
    value
  });

/**
 * Gets all integrations for a given user
 *
 * @param {Number} userId
 * @returns {Promise<Array<Object>>}
 */
exports.getUserIntegrations = async userId => {
  return await databaseService.getData('user_integrations', builder => {
    return builder
      .select(
        'integrations.*',
        'user_integrations.serial',
        'user_integrations.id as integrationId'
      )
      .where('user_integrations.user_id', userId)
      .innerJoin('integrations', function() {
        this.on('integrations.id', '=', 'user_integrations.integration_id');
      });
  });
};

/**
 * Returns all data for the given integration
 *
 * @param {Number} userIntegrationId
 * @returns {Promise<Array<Object>>}
 */
exports.getDataForIntegration = async userIntegrationId => {
  return await databaseService.getData('integrations_data', builder => {
    return builder
      .select('*')
      .where('user_integration_id', userIntegrationId)
      .orderBy('created_at', 'asc');
  });
};
