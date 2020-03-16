const app = require('../src/app');
const supertest = require('supertest')(app);
const userSeeder = require('../src/database/seeding/userSeeder');
const database = require('../src/database');
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
      email: user.email_address,
      password: process.env.DUMMY_PASSWORD
    };

    const response = await supertest.post('/login').send(body);
    expect(response.status).toBe(200);
    expect(response.body).toHaveProperty('accessToken');
  });
});

describe('POST - /verify', () => {
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
  it('should return a valid user given a valid token', async done => {
    const response = await supertest
      .post('/verify')
      .set(`Authorization`, `bearer ${data.token}`);
    expect(response.status).toBe(200);
    expect(response.body.user).toMatchObject(data.user);
    done();
  });

  it('should return a 401 if no token is provided', async done => {
    const response = await supertest
      .post('/verify')
      .set(`Authorization`, `bearer `);
    expect(response.status).toBe(401);
    done();
  });

  it('should return a 401 if the token is invalid', async done => {
    const response = await supertest
      .post('/verify')
      .set(`Authorization`, `bearer sadashdasijdhi123123`);
    expect(response.status).toBe(401);
    done();
  });
});
