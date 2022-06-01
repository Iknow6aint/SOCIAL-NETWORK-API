/* eslint-disable linebreak-style */
/* eslint-disable require-jsdoc */
const Post = require('../models/post.model');

const User = require('../models/user.model');

async function createPost(req, res) {
  const newPost = new Post(req.body);
  try {
    const savedPost = await newPost.save();
    res.status(200).json(savedPost);
  } catch (err) {
    res.status(500).json(err);
  }
}

async function updatePost(req, res) {
  try {
    const post = await Post.findById(req.params.id);
    if (post.userId === req.body.userId) {
      await post.updateOne({$set: req.body});
      res.status(200).json('the post has been updated');
    } else {
      res.status(403).json('you can update only your post');
    }
  } catch (err) {
    res.status(500).json(err);
  }
}

async function deletePost(req, res) {
  try {
    const post = await Post.findById(req.params.id);
    if (post.userId === req.body.userId) {
      await post.deleteOne();
      res.status(200).json('the post has been deleted');
    } else {
      res.status(403).json('you can delete only your post');
    }
  } catch (err) {
    res.status(500).json(err);
  }
}

// eslint-disable-next-line require-jsdoc
async function postReaction(req, res) {
  try {
    const post = await Post.findById(req.params.id);
    if (!post.likes.includes(req.body.userId)) {
      await post.updateOne({$push: {likes: req.body.userId}});
      res.status(200).json('The post has been liked');
    } else {
      await post.updateOne({$pull: {likes: req.body.userId}});
      res.status(200).json('The post has been disliked');
    }
  } catch (err) {
    res.status(500).json(err);
  }
}

async function getPost(req, res) {
  try {
    const post = await Post.findById(req.params.id);
    res.status(200).json(post);
  } catch (err) {
    res.status(500).json(err);
  }
}


module.exports= {
  createPost,
  updatePost,
  deletePost,
  postReaction,
  getPost,
};
