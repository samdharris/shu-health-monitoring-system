const app = require('../src/app');
const supertest = require('supertest')(app);

describe('POST - /login', () => {
  it('should login successfully', async () => {
    const user = {
      username: 'janet.smith',
      password: process.env.DUMMY_PASSWORD
    };

    const response = await supertest.post('/login').send(user);
    expect(response.status).toBe(200);
    expect(response.body).toHaveProperty('accessToken');
  });
});
