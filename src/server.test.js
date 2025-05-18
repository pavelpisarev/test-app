const request = require('supertest');
const { app, server } = require('./server');

afterAll((done) => {
  server.close(done);
});

test('GET /health returns OK', async () => {
  const response = await request(app).get('/health');
  expect(response.status).toBe(200);
  expect(response.body.status).toBe('OK');
});
