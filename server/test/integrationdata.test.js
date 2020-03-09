const app = require('../src/app');
const supertest = require('supertest')(app);
const userSeeder = require('../src/database/seeding/userSeeder');
const integrationsSeeder = require('../src/database/seeding/integrationsSeeder');
const database = require('../src/database');
const { INTEGRATIONS } = require('../src/constants');

const path = require('path');

beforeAll(() => {
  database.start();
  /**
   * Run migrations programatically. Works around an issue where they don't run on CI.
   */
  return database.knex.migrate.latest({
    directory: path.join(__dirname, '../src/database/migrations')
  });
});

describe('POST - /api/integrations/1/data', () => {
  let data = {};
  beforeAll(() => {
    // Login the user
    return userSeeder
      .seedPatient()
      .then(() => {
        return database.knex('users').first();
      })
      .then(user => {
        const body = {
          email: user.email_address,
          password: process.env.DUMMY_PASSWORD
        };
        return supertest.post('/login').send(body);
      })
      .then(({ body }) => {
        data.token = body.accessToken;
        data.user = body.user;
      });
  });

  it('should be able to manually insert a reading', async () => {
    await integrationsSeeder.seedIntegration(INTEGRATIONS[0]);
    await integrationsSeeder.seedUserIntegration(1, data.user.id);
    await integrationsSeeder.seedIntegrationData(1, data.user.id, 5.4);
    const response = await supertest
      .put('/api/integrations/1/data')
      .set('Authorization', `bearer ${data.token}`)
      .send({
        value: 5.4
      });

    expect(response.status).toBe(201);
    expect(response.body.integrationData.value).toBe(5.4);
  });
});
