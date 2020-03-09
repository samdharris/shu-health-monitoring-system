const databaseService = require('../../services/databaseService');
exports.updateData = async (integrationId, data) => {
  await databaseService.updateData(
    'integration_data',
    'integration_id',
    integrationId,
    data
  );
};
