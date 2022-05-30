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

// delete user
async function deleteUser(req, res) {
  if (req.body.userId === req.params.id || req.body.isAdmin) {
    try {
      await User.findByIdAndDelete(req.params.id);
      res.status(200).json('account has been deleted');
    } catch (err) {
      return res.status(500).json(err);
    }
  } else {
    return res.status(403).json('You can only delete your account');
  }
};

async function getUser(req, res) {
  try {
    const user = await User.findById(req.params.id);
    // remove password and updateAt from data
    const {password, updatedAt, ...other} =user._doc;
    res.status(200).json(other);
  } catch (err) {
    res.status(500).json(err);
  }
}

async function followUser(req, res) {
  if (req.body.userId !== req.params.id) {
    try {
      const user =await User.findById(req.params.id);
      const currentUser = await User.findById(req.body.userId);
      if (!user.followers.includes(req.body.userId)) {
        await user.updateOne({
          $push: {
            followers: req.body.user,
          },
        },
        );
        await currentUser.updateOne(
            {
              $push: {
                followings: req.params.id,
              },
            },
        );
        res.status(200).json('user has been followed');
      } else {
        res.stautus(403).json('you already followed this user');
      }
    } catch (err) {
      res.status(500).json(err);
    }
  } else {
    res.status+(403).json('you cannot follow yourself');
  }
}

async function unfollowUser(req, res) {
  if (req.body.userId !== req.params.id) {
    try {
      const user = await User.findById(req.params.id);
      const currentUser = await User.findById(req.body.userId);
      if (user.followers.includes(req.body, userId)) {
        await user.updateOne(
            {
              $pull: {
                followers: req.body.userId,
              },
            },
        );
        await currentUser.updateOne(
            {
              $pull: {
                followings: req.params.id,
              },
            },
        );
        res.status(200).json('user has been unfollowed');
      } else {
        res.status(403).json('you do not follow this user');
      }
    } catch (err) {
      res.status(500).json(err);
    }
  } else {
    res.status(403).json('you cannot unfollow yourself');
  }
}

module.exports = {
  updateUser,
  deleteUser,
  getUser,
  followUser,
  unfollowUser,
};
