const app = require('../src/app');
const supertest = require('supertest')(app);
const userSeeder = require('../src/database/seeding/userSeeder');
const addressSeeder = require('../src/database/seeding/addressSeeder');
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

describe(`GET - /api/users/1`, () => {
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

  it('should return the user successfully', async () => {
    await addressSeeder.seedAddress(1);
    const user = await database.knex('users').first();
    const address = await database
      .knex('addresses')
      .where('id', user.address_id)
      .first();
    const expected = {
      user,
      address
    };
    const response = await supertest
      .get(`/api/users/1`)
      .set('Authorization', `bearer ${data.token}`);
    expect(response.status).toBe(200);
    expect(response.body).toHaveProperty('user');
    expect(response.body).toHaveProperty('address');
    expect(response.body).toMatchObject(expected);
  });
});
