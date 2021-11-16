const mongooose = require('mongoose');
const User = require('../models/user');
const postSchema = new mongooose.Schema(
  {
    content: {
      type: String,
      required: true,
    },
    user: {
      type: mongooose.Schema.Types.ObjectId,
      ref: 'User',
    },
    comments: [
      {
        type: mongooose.Schema.ObjectId,
        ref: 'Comment',
      },
    ],
  },
  {
    timestamps: true,
  }
);

const Post = mongooose.model('Post', postSchema);
module.exports = Post;
