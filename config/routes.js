const axios = require('axios');
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const User = require('../database/helpers/user-model');

const { authenticate } = require('../auth/authenticate');

const jwtKey =
  process.env.JWT_SECRET ||
  'add a .env file to root of project with the JWT_SECRET variable';

module.exports = server => {
  server.post('/api/register', register);
  server.post('/api/login', login);
  server.get('/api/jokes', authenticate, getJokes);
};

function register(req, res) {
  // implement user registration
  let user = req.body;
  const hash = bcrypt.hashSync(user.password, 10);
  user.password = hash;

  User.add(user)
    .then(user => {
      res.status(201).json(user);
    })
    .catch(error => {
      res.status(500).json(error);
    });
}

function login(req, res) {
  let { username, password } = req.body;

  User.findBy({ username })
    .first()
    .then(user => {
      if (user && bcrypt.compareSync(password, user.password )) {
        const token = generateToken(user);
        
        res.status(200).json({
          message: `Welcome ${user.username}!`,
          token
        });
      } else {
        res.status(401).json({ message: 'Invalid Credentials' });
      }
    })
    .catch(error => {
      res.status(500).json(error);
    });
};

function getJokes(req, res) {
  const requestOptions = {
    headers: { accept: 'application/json' },
  };

  axios
    .get('https://icanhazdadjoke.com/search', requestOptions)
    .then(response => {
      res.status(200).json(response.data.results);
    })
    .catch(err => {
      res.status(500).json({ message: 'Error Fetching Jokes', error: err });
    });
}

function generateToken(user) {
  const payload = {
    sub: user.id,
    username: user.username  
  }

  const options = {
    expiresIn: '1d'
  }

  return jwt.sign(payload, jwtKey, options);
}
