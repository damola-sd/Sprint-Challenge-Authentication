const routes = require('./routes');
const request = require('supertest');
const User = require('../database/helpers/user-model');


const testUser = {
  username: "admin",
  password: "admin"
};

const token = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJzdWIiOjMsInVzZXJuYW1lIjoiR2FyZXRoIiwiaWF0IjoxNTY0MTQzMDMxLCJleHAiOjE1NjQyMjk0MzF9.NBUc9dw255HYbmSugWw_SqgZhXEJRXYQnmzoB_7cPrA';


describe('routes', () => {

  it('[GET] /register ALSO WORKS', () => {
    return request(routes)
      .post('/api/register')
      .send(testUser)
      .expect(201)
      .expect("Content-Type", /json/)
      .then(res => {
        expect(Object.keys(res.body).length).toBeGreaterThan(0);
        expect(typeof res.body).toBe("object");
      });
  });

  it('[GET] /Jokes ', () => {
    return request(routes)
      .post('/api/jokes')
      .set("Authorization", token)
      .expect(200)
      .expect("Content-Type", /json/)
      .then(res => {
        expect(res.body.length).toBeGreaterThan(0);
        expect(Array.isArray(res.body)).toBe(true);
      });
  })
});