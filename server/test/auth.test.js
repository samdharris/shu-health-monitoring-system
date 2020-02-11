const app = require('../src/app');
const supertest = require('supertest')(app);
const userSeeder = require('../src/database/seeding/userSeeder');
const database = require('../src/database');
const constants = require('../src/constants');
beforeAll(() => {
  console.log(`ENV: ${process.env.NODE_ENV}`);
  database.start();
});

describe('POST - /login', () => {
  it('should login successfully', async () => {
    console.log(`env: ${process.env.NODE_ENV}`);
    await userSeeder.seedPatient();
    const user = await database.knex('users').first();

    console.log(user);
    const response = await supertest.post('/login').send({
      username: user.username,
      password: process.env.DUMMY_PASSWORD
    });
    expect(response.status).toBe(200);
    expect(response.body).toHaveProperty('accessToken');
  });
});
