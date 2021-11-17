const Post = require('../models/post');
const User = require('../models/user');
const Comment = require('../models/comment');

module.exports.home = async function (req, res) {
  try {
    let posts = await Post.find({})
      .sort(' -createdAt')
      .populate('user', 'name,email')
      .populate({ path: 'comments', populate: ('user', 'name,email') });

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
