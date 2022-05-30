/* eslint-disable space-before-blocks */
/* eslint-disable require-jsdoc */
const bcrypt = require('bcrypt');
const User = require('../models/user.model');

async function register(req, res) {
  try {
    // generate password
    const salt = await bcrypt.genSalt(10);
    const hashedPassword = await bcrypt.hash(req.body.password, salt);
    const emailLowerCase = await req.body.email.toLowerCase();

    // crrate new user
    const newUser = new User({
      username: req.body.username,
      email: emailLowerCase,
      password: hashedPassword,
    });
    // save user
    const user = await newUser.save();
    res.status(200).json(user);
  } catch (err) {
    res.status(500).json(err);
  }
}

async function login(req, res){
  try {
    // get login details
    const user = await User.findOne({
      email: req.body.email.toLowerCase(),
    });

    if (!user){
      res.status(404).json('user not found');
    }

    // check password
    const validPassword = await bcrypt.compare(
        req.body.password,
        user.password,
    );
    if (!validPassword){
      res.status(400).json('wrong password');
    }
    res.status(200).json(user);
  } catch (err) {
    res.status(500).json(err);
  }
}

module.exports ={
  register,
  login,
};
