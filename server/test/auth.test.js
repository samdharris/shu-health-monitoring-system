const app = require('../src/app');
const supertest = require('supertest')(app);
const userSeeder = require('../src/database/seeding/userSeeder');
const database = require('../src/database');
const constants = require('../src/constants');
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

describe('POST - /login', () => {
  it('should login successfully', async () => {
    await userSeeder.seedPatient();
    const user = await database.knex('users').first();

    const body = {
      username: user.email_address,
      password: process.env.DUMMY_PASSWORD
    };

    const response = await supertest.post('/login').send(body);
    expect(response.status).toBe(200);
    expect(response.body).toHaveProperty('accessToken');
  });
});
