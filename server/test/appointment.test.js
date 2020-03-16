const app = require('../src/app');
const supertest = require('supertest')(app);
const userSeeder = require('../src/database/seeding/userSeeder');
const database = require('../src/database');
const faker = require('faker');

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

describe('POST - /api/appointments', () => {
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

  it('should create an appointment', async () => {
    const date = new Date();
    date.setMinutes(15, 0, 0);
    const appointment = {
      appointment_date: date.toISOString(),
      reason: faker.lorem.sentence()
    };

    const response = await supertest
      .post('/api/appointments')
      .set('Authorization', `bearer ${data.token}`)
      .send(appointment);

    expect(response.status).toBe(201);
    expect(response.body).toHaveProperty('appointment');
    expect(response.body.appointment).toEqual(
      expect.objectContaining(appointment)
    );
  });
});
