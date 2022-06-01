/* eslint-disable new-cap */
/* eslint-disable linebreak-style */
const express = require('express');
const {
  updateUser,
  deleteUser,
  getUser,
  followUser,
  unfollowUser,
} = require('../controllers/user.controller');

const userRoute = express.Router();

userRoute.put('/:id', updateUser);
userRoute.delete('/:id', deleteUser);
userRoute.get('/:id', getUser);
userRoute.put('/:id/follow', followUser);
userRoute.put('/:id/unfollow', unfollowUser);


module.exports = userRoute;
