const app = require('../src/app');
const supertest = require('supertest')(app);
const userSeeder = require('../src/database/seeding/userSeeder');
const integrationsSeeder = require('../src/database/seeding/integrationsSeeder');
const database = require('../src/database');
const {
  INTEGRATIONS
} = require('../src/constants');

const path = require('path');

/**
 * Runs before any test block is executed. Used to connect to the database and run migrations.
 * @see https://jestjs.io/docs/en/api#beforeallfn-timeout
 */
beforeAll(() => {
  database.start();
  /**
   * Run migrations programatically. Works around an issue where they don't run on CI.
   */
  return database.knex.migrate.latest({
    directory: path.join(__dirname, '../src/database/migrations')
  });
});

/**
 * Test block tests updating a reading
 */
describe('PUT - /api/integrations/1/data', () => {
  let data = {};
  /**
   * Runs before any test in this test block is run. Used to seed a user and to get authentication.
   * @see https://jestjs.io/docs/en/api#beforeallfn-timeout
   */
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
      .then(({
        body
      }) => {
        data.token = body.accessToken;
        data.user = body.user;
      });
  });

  it('should be able to manually update a reading', async () => {
    // Arrange
    await integrationsSeeder.seedIntegration(INTEGRATIONS[0]);
    await integrationsSeeder.seedUserIntegration(1, data.user.id);
    await integrationsSeeder.seedIntegrationData(1, data.user.id, 4);
    const updatedValue = 5.4;

    // Act
    const response = await supertest
      .put('/api/integrations/1/data')
      .set('Authorization', `bearer ${data.token}`)
      .send({
        value: updatedValue
      });

    // Assert
    expect(response.status).toBe(200);
    expect(response.body.value).toBe(updatedValue);
  });
});

/**
 * Test block tests getting all integrations for a given user
 */
describe('GET - /api/1/integrations', () => {
  let data = {};
  /**
   * Runs before any test in this test block is run. Used to seed a user and to get authentication.
   * @see https://jestjs.io/docs/en/api#beforeallfn-timeout
   */
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
      .then(({
        body
      }) => {
        data.token = body.accessToken;
        data.user = body.user;
      });
  });

  /**
   * Runs before each test in this test block. Used to truncate all user integrations.
   * @see https://jestjs.io/docs/en/api#beforeeachfn-timeout
   */
  beforeEach(() => {
    return database.knex('user_integrations').truncate();
  });

  it('should return all integrations for a given user', async () => {
    // Arrange
    INTEGRATIONS.forEach(
      async integration => await integrationsSeeder.seedIntegration(integration)
    );
    await integrationsSeeder.seedUserIntegration(1, data.user.id);
    await integrationsSeeder.seedUserIntegration(2, data.user.id);

    // Act
    const response = await supertest
      .get(`/api/users/1/integrations`)
      .set(`Authorization`, `bearer ${data.token}`);

    // Assert
    expect(response.status).toBe(200);
    expect(response.body.integrations).toHaveLength(2);
  });
});

/**
 * Test block to test creating a reading
 */
describe('POST - /api/integrations/1/data', () => {
  let data = {};
  /**
   * Runs before any test in this test block is run. Used to seed a user and to get authentication.
   * @see https://jestjs.io/docs/en/api#beforeallfn-timeout
   */
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
      .then(({
        body
      }) => {
        data.token = body.accessToken;
        data.user = body.user;
      });
  });

  /**
   * Runs before each test in this test block. Used to truncate all user integrations.
   * @see https://jestjs.io/docs/en/api#beforeeachfn-timeout
   */
  beforeEach(() => {
    return database.knex('user_integrations').truncate();
  });

  it('should create a reading in the database', async () => {
    // Seed the test db
    // Arrange
    await integrationsSeeder.seedIntegration(INTEGRATIONS[0]);
    const userIntegration = await integrationsSeeder.seedUserIntegration(
      1,
      data.user.id
    );

    // Act
    const reading = 6.0;
    const response = await supertest
      .post(`/api/integrations/${userIntegration.id}/data`)
      .set(`Authorization`, `bearer ${data.token}`)
      .send({
        value: reading
      });

    // Assert
    expect(response.status).toBe(201);
    expect(response.body).toHaveProperty('value');
    expect(response.body.value).toBe(reading);
  });
});