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

exports.getUserIntegrations = async userId => {
  return await databaseService.getData('user_integrations', builder => {
    return builder
      .select('integrations.*')
      .where('user_integrations.user_id', userId)
      .innerJoin('integrations', function() {
        this.on('integrations.id', '=', 'user_integrations.integration_id');
      });
  });
};
