const app = require('../src/index');
const supertest = require('supertest')(app);

describe('GET - /foo', () => {
    it('should return bar', async () => {
        const response = await supertest.get('/foo');
        expect(response.body.message).toBe('bar');
    })
})