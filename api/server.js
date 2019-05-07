const express = require('express');
const helmet = require('helmet');
const cors = require('cors');
const session = require('express-session');//--------bring in library

const authRouter = require('../auth/auth-router.js');
const usersRouter = require('../users/users-router.js');

const server = express();

// configure session
const sessionConfig = {
  name: 'monster', // by default would be sid
  secret: 'keep it secret, keep it safe! -gandalf', // could use a process.env variable to hide the secret.
  cookie: {
    httpOnly: true, // prevent access from javascript code.
    maxAge: 1000 * 60 * 60, // in milliseconds (this is 1 hour)
    secure: false, //true means only send the cookie over http(S)
  },
  resave: false, // resave session even if it didn't change
  saveUninitialized: true, // create new session automatically, make sure to comply with laws
}

server.use(session(sessionConfig)); // -----------------Use session
server.use(helmet());
server.use(express.json());
server.use(cors());

server.use('/api/auth', authRouter);
server.use('/api/users', usersRouter);

server.get('/', (req, res) => {
  const username = req.session.username || 'person';
  res.send(`Hello ${username}.`);
});

module.exports = server;
