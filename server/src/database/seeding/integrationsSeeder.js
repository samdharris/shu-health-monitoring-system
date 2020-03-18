const database = require('../index');
const _ = require('lodash');
const { INTEGRATIONS } = require('../../constants');
database.start();

/**
 * Seeds all integrations
 */
exports.seedIntegrations = async () => {
  for (let i = 0; i < INTEGRATIONS.length; i++) {
    await database.knex('integrations').insert({
      name: INTEGRATIONS[i]
    });
    console.log('integrations seeded!');
  }
};

/**
 * Seeds the given integration
 *
 * @param {String} integration
 */
exports.seedIntegration = async integration => {
  await database.knex('integrations').insert({
    name: integration
  });
  console.log(`${integration} seeded`);
};

/**
 * Seeds a user integration (linking a user to an integration)
 *
 * @param {Number} integrationId
 * @param {Number} userId
 *
 * @returns {Promise<Object>}
 */
exports.seedUserIntegration = async (integrationId, userId) => {
  const serial = new Date().getTime().toString();
  await database.knex('user_integrations').insert({
    integration_id: integrationId,
    user_id: userId,
    serial
  });

  return await database
    .knex('user_integrations')
    .where('serial', serial)
    .first();
};

/**
 * Seeds some dummy integration data
 *
 * @param {Number} userIntegrationId
 * @param {Number} value
 */
exports.seedIntegrationData = async (userIntegrationId, value) => {
  await database.knex('integrations_data').insert({
    user_integration_id: userIntegrationId,
    value
  });
};
