const Post = require('../../../models/post');
const Comment = require('../../../models/comment');

module.exports.index = async function (req, res) {
  let posts = await Post.find({})
    .sort(' -createdAt')
    .populate('user', 'email , name ')
    .populate({
      path: 'comments',
      populate: { path: 'user', select: 'name , email' },
    });
  return res.json(200, {
    success: true,
    message: 'list of posts',

    posts,
  });
};
module.exports.destroy = async function (req, res) {
  try {
    let post = await Post.findById(req.params.id);

    if (post.user == req.user.id) {
      post.remove();
      await Comment.deleteMany({ post: req.params.id });
      return res.json(200, {
        success: true,
        message: 'post and associate comment deleted',
      });
    } else {
      return res.json(401, {
        fail: true,
        message: 'You can not delete the post',
      });
    }
  } catch (err) {
    console.log('Eroor', err);
    return res.json(500, {
      fail: true,
      message: 'Internal server error',
    });
  }
};

module.exports.create = async function (req, res) {
  try {
    let post = await Post.create({
      content: req.body.content,
      user: req.user._id,
    });
    await post.populate('user', 'email , name');
    return res.json(200, {
      success: true,
      message: 'post created succesfully',
      data: {
        post,
      },
    });
  } catch (err) {
    console.log('Eroor', err);
    return res.json(500, {
      fail: true,
      message: 'Internal server error',
    });
  }
};
