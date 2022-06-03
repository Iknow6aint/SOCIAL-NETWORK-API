/* eslint-disable linebreak-style */
/* eslint-disable require-jsdoc */
const bcrypt = require('bcrypt');
const User = require('../models/user.model');
const {generateAccessToken} = require('../helpers/jwt.js');

async function login({username, password}) {
  const user = await User.findOne({username});

  // synchronously compare user entered password with hashed password
  if (user && bcrypt.compareSync(password, user.password)) {
    const token = generateAccessToken(username);

    // call toJSON method applied during model instantiation
    return {...user.toJSON(), token};
  }
}

async function register(params) {
  // instantiate a user modal and save to mongoDB
  const user = new User(params);
  await user.save();
}

async function getById(id) {
  const user = await User.findById(id);
  // call toJSON method applied during model instantiation
  return user.toJSON();
}

module.exports = {
  login,
  register,
  getById,
};
