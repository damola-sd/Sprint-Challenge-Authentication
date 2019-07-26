const routes = require('./routes');
const request = require('supertest');
const User = require('../database/helpers/user-model');

describe('routes', () => {

    it('[GET] /register ALSO WORKS', () => {
        return request(routes)
          .post('/api/register', (req, res) => {
              let user = { username: "Gareth", password: "Bale"};
              User.add(user)
          })
          .then(res => {
            expect(res.body).toBeInstanceOf(Array);
            expect(200);
          });
      });

      it('[GET] /login ALSO WORKS', () => {
        return request(routes)
          .post('/api/register', (req, res) => {
              let user = { username: "Gareth", password: "Bale"};
              User.findBy(user.username)
          })
          .then(res => {
            expect(res.body).toBeInstanceOf(Array);
            expect(200);
          });
      });
})