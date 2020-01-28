const app = require('../src/app');
const supertest = require('supertest');

describe('GET - /foo', () => {
  it('should return bar', async () => {
    const response = await supertest(app).get('/foo');
    expect(response.body.message).toBe('bar');
  });
});
