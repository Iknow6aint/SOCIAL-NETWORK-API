/* eslint-disable linebreak-style */
const mongoose = require( 'mongoose');


const PostSchema = new mongoose.Schema(
    {
      tittle: {
        type: String,
      },
      userId: {
        type: String,
        required: true,
      },
      caption: {
        type: String,
        max: 500,
      },
      img: {
        type: String,
      },
      likes: {
        type: Array,
        default: [],
      },
      createdAt: {
        type: Date,
        default: new Date(),
      },
      comments: {
        type: [String],
        default: [],
      },
    },
    {timestamps: true},

);

module.exports = mongoose.model('Post', PostSchema);
