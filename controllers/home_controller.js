const Post = require('../models/post');
const User = require('../models/user');
const Comment = require('../models/comment');

module.exports.home = async function (req, res) {
  try {
    let posts = await Post.find({})
      .sort(' -createdAt')
      .populate('user', 'name,email')
      .populate({
        path: 'comments',
        populate: { path: 'user', select: 'name , email' },
        populate: { path: 'likes' },
      })
      .populate('likes');

    let users = await User.find({});

    return res.render('home', {
      title: 'SocialMate | Home',
      posts: posts,
      all_users: users,
    });
  } catch (err) {
    console.log('Error', err);
  }
};
