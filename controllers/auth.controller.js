/* eslint-disable max-len */
/* eslint-disable space-before-blocks */
/* eslint-disable require-jsdoc */
const bcrypt = require('bcrypt');
const userServices = require('../services/user.services');


async function register(req, res, next) {
  const {password} =req.body;
  req.body.password =bcrypt.hashSync(password, salt);

  userServices.register(req.body).then(
      res.status(201).json({sucess: true, data: req.body}),
  ).catch((err)=> next(err));
}

async function login(req, res, next){
  const {username, password} = req.body;
  userServices.login({username, password}).then((user)=>{
      user? res.json(user) : res.json({error: 'Username or password is not correct'});
  }).catch((err)=>next(err));
}

module.exports ={
  register,
  login,
};
