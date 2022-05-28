/* eslint-disable new-cap */
/* eslint-disable linebreak-style */
const express = require('express');
const {updateUser} = require('../controllers/user.controller');

const userRoute = express.Router();

userRoute.use('/:id', updateUser);

module.exports = userRoute;
