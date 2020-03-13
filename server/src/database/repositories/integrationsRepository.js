const databaseService = require('../../services/databaseService');
exports.updateData = async (userId, integrationId, data) => {
  const userIntegration = await databaseService.getIntegrationForUser(
    userId,
    integrationId
  );
  return await databaseService.updateData(
    'integrations_data',
    'user_integration_id',
    userIntegration.id,
    data
  );
};
