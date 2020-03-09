const databaseService = require('../../services/databaseService');
exports.updateData = async (userId, integrationId, data) => {
  await databaseService.updateData(
    userId,
    'integration_data',
    'integration_id',
    integrationId,
    data
  );
};
