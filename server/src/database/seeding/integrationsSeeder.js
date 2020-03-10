const database = require('../index');
const _ = require('lodash');
const { INTEGRATIONS } = require('../../constants');
database.start();

exports.seedIntegrations = async () => {
  for (let i = 0; i < INTEGRATIONS.length; i++) {
    await database.knex('integrations').insert({
      name: INTEGRATIONS[i]
    });
    console.log('integrations seeded!');
  }
};

exports.seedIntegration = async integration => {
  await database.knex('integrations').insert({
    name: integration
  });
  console.log(`${integration} seeded`);
};

exports.seedUserIntegration = async (integrationId, userId) => {
  await database.knex('user_integrations').insert({
    integration_id: integrationId,
    user_id: userId,
    serial: new Date().getTime().toString()
  });
};

exports.seedIntegrationData = async (userIntegrationId, value) => {
  await database.knex('integrations_data').insert({
    user_integration_id: userIntegrationId,
    value
  });
};
