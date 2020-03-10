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

  it('should be able to manually update a reading', async () => {
    await integrationsSeeder.seedIntegration(INTEGRATIONS[0]);
    await integrationsSeeder.seedUserIntegration(1, data.user.id);
    await integrationsSeeder.seedIntegrationData(1, data.user.id, 4);
    const updatedValue = 5.4;
    const response = await supertest
      .put('/api/integrations/1/data')
      .set('Authorization', `bearer ${data.token}`)
      .send({
        value: updatedValue
      });

    expect(response.status).toBe(200);
    expect(response.body.value).toBe(updatedValue);
  });
});

describe('GET - /api/integrations', () => {
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

  beforeEach(() => {
    return database.knex('user_integrations').truncate();
  });

  it('should return all integrations for a given user', async () => {
    INTEGRATIONS.forEach(
      async integration => await integrationsSeeder.seedIntegration(integration)
    );
    await integrationsSeeder.seedUserIntegration(1, data.user.id);
    await integrationsSeeder.seedUserIntegration(2, data.user.id);

    const response = await supertest
      .get('/api/integrations')
      .set(`Authorization`, `bearer ${data.token}`);

    expect(response.status).toBe(200);
    expect(response.body.integrations).toHaveLength(2);
  });
});
