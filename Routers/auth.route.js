/* eslint-disable new-cap */
const express = require('express');

const authrouter = express.Router();

const {login, register} = require('../controllers/auth.controller');

authrouter.post('/register', register);

authrouter.post('/login', login);

module.exports = authrouter;
