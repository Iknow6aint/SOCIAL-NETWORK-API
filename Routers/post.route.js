/* eslint-disable new-cap */

const express = require('express');


const postRouter = express.Router();

const {createPost,
  updatePost,
  deletePost,
  postReaction,
  getPost,
  commentPost,
} = require('../controllers/post.controller');


postRouter.post('/post', createPost);
postRouter.put('/:id', updatePost);
postRouter.delete('/:id', deletePost);
postRouter.put('/:id/like', postReaction);
postRouter.get('/:id', getPost);
postRouter.post('/id/commmentpost', commentPost);

module.exports = postRouter;
