const Users = require('../../../models/user');
const Like = require('../../../models/like');
const Post = require('../../../models/post');
const Comment = require('../../../models/comment');

module.exports.createComment = async function (req, res) {
  try {
    // console.log('i am here');
    let post = await Post.findById(req.body.post_id);
    if (post) {
      //   console.log('i am here');
      let comment = await Comment.create({
        content: req.body.content,
        user: req.user._id,
        post: req.body.post_id,
      });
      post.comments.push(comment);
      post.save();
      comment = await comment.populate('user', 'name , email');

      return res.status(200).json({
        success: true,
        data: {
          comment: comment,
        },
        message: 'Comment created!',
      });
    }
  } catch (error) {
    console.log('Error', err);
    return res.status(500).json({
      message: 'Internal Server Error',
    });
  }
};

module.exports.list = async function (req, res) {
  try {
    let post = await Post.findById(req.query.post_id).populate({
      path: 'comments',
      populate: { path: 'user', select: 'name , email' },
    });
    return res.status(200).json({
      message: 'List of comments on post_id 5e518d8bcf801b96af039bbe',
      success: true,
      data: {
        comments: post.comments,
      },
    });
  } catch (error) {
    console.log('Error', err);
    return res.status(500).json({
      message: 'Internal Server Error',
    });
  }
};

module.exports.destroy = async function (req, res) {
  try {
    // console.log('i am here');
    let comment = await Comment.findById(req.query.comment_id);

    if (comment.user == req.user.id) {
      //   console.log('i am here');
      let postId = comment.post;
      Like.deleteMany({ likeable: comment._id, onModel: 'Comment' });
      comment.remove();
      await Post.findByIdAndUpdate(postId, {
        $pull: { comments: req.query.comment_id },
      });
      return res.status(200).json({
        message: 'Comment deleted succesfully',
      });
    }
  } catch (error) {
    console.log('Error', err);
    return res.status(500).json({
      message: 'Internal Server Error',
    });
  }
};
