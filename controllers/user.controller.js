/* eslint-disable require-jsdoc */

/* eslint-disable linebreak-style */
const User = require('../models/user.model');
const bycrpt = require('bcrypt');

async function updateUser(req, res) {
  // check to see if user ID matches  or samin
  if (req.body.userId === req.params.id || req.body.isAdmin) {
    if (req.body.password) {
      try {
        const salt = await bycrpt.genSalt(10);
        req.body.password = await bycrpt.hash(req.body.password, salt);
      } catch (err) {
        return res.status(500).json(err);
      }
    }
    try {
      const user = await User.findByIdAndUpdate(req.params.id, {
        $set: req.body,
      });
      res.status(200).json('Account has been updated');
    } catch (err) {
      return res.status(500).json(err);
    }
  } else {
    return res.status(403).json('You can update only your account');
  }
};


module.exports = {
  updateUser,
};
