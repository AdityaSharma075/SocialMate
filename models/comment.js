const mongose = require('mongoose');

const commentSchema = new mongose.Schema(
  {
    content: {
      type: String,
      required: true,
    },
    user: {
      type: mongose.Schema.Types.ObjectId,
      ref: 'User',
    },
    post: {
      type: mongose.Schema.Types.ObjectId,
      ref: 'Post',
    },
    likes: [
      {
        type: mongose.Schema.Types.ObjectId,
        ref: 'Like',
      },
    ],
  },
  {
    timestamps: true,
  }
);
const Comment = mongose.model('Comment', commentSchema);
module.exports = Comment;
