const Post = require('../models/post');
const Comment = require('../models/comment');

module.exports.createPost = async function (req, res) {
  try {
    let post = await Post.create({
      content: req.body.content,
      user: req.user._id,
    });

    if (req.xhr) {
      // if we want to populate just the name of the user (we'll not want to send the password in the API), this is how we do it!
      post = await post.populate('user', 'email,name');

      return res.status(200).json({
        data: {
          post: post,
        },
        message: 'Post created!',
      });
    }
    req.flash('success', 'Post Created!');
    return res.redirect('back');
  } catch (err) {
    console.log('Eroor', err);
    return;
  }
};
module.exports.destroy = async function (req, res) {
  try {
    let post = await Post.findById(req.params.id);

    if (post.user == req.user.id) {
      await Like.deleteMany({ likeable: post, onModel: 'Post' });
      await Like.deleteMany({ _id: { $in: post.comments } });
      post.remove();
      await Comment.deleteMany({ post: req.params.id });

      if (req.xhr) {
        return res.status(200).json({
          data: {
            post_id: req.params.id,
          },
          message: 'post deleted',
        });
      }
      req.flash('success', 'Delete post and its comments!!');
      return res.redirect('back');
    } else {
      req.flash('Sorry!! But you are not authenticated to delete this post');
      return res.redirect('back');
    }
  } catch (err) {
    console.log('Eroor', err);
    return;
  }
};
