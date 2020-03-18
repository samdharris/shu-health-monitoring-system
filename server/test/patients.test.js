const app = require('../src/app');
const supertest = require('supertest')(app);
const userSeeder = require('../src/database/seeding/userSeeder');
const database = require('../src/database');
const {
  ACCOUNT_TYPES
} = require('../src/constants');

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

/**
 * Test block tests the ability to get a single patient
 */
describe(`GET - /api/patients/1`, () => {
  let data = {};
  /**
   * Runs before any test in this test block is run. Used to seed a user and to get authentication.
   * @see https://jestjs.io/docs/en/api#beforeallfn-timeout
   */
  beforeAll(() => {
    // Login the user
    return (
      userSeeder
      //.seedPatient()
      .seedDoctor(1)
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
      })
    );
  });

  it('should return a user successfully', async () => {
    // Arrange
    await userSeeder.seedDoctor(1);
    const doc = await database
      .knex('users')
      .where('account_type', ACCOUNT_TYPES.ACCOUNT_DOCTOR)
      .first();
    await userSeeder.seedPatient(1, doc.id);
    const patient = await database
      .knex('users')
      .where('account_type', ACCOUNT_TYPES.ACCOUNT_PATIENT)
      .first();

    // Act
    const response = await supertest
      .get(`/api/patients/${doc.id}`)
      .set('Authorization', `bearer ${data.token}`);

    // Assert
    expect(response.status).toBe(200);
    expect(response.body).toHaveProperty('Patients');
    expect(response.body.Patients[0]).toMatchObject(patient);
  });

  it('should return 403 if user attempts to access patients but is not doctor', async () => {
    // Arrange
    const patient = await database
      .knex('users')
      .where('account_type', ACCOUNT_TYPES.ACCOUNT_PATIENT)
      .first();

    const loginBody = {
      email: patient.email_address,
      password: process.env.DUMMY_PASSWORD
    };

    const {
      body
    } = await supertest.post('/login').send(loginBody);

    // Act
    const response = await supertest
      .get(`/api/patients/${patient.id}`)
      .set('Authorization', `bearer ${body.accessToken}`);

    // Assert
    expect(response.status).toBe(403);
  })
});