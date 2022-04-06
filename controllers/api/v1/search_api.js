const Users = require('../../../models/user');
const Like = require('../../../models/like');
const Post = require('../../../models/post');
const Comment = require('../../../models/comment');

module.exports.search = async function (req, res) {
  try {
    let users = await Users.find(
      { name: { $regex: req.query.text + '.*' } },
      { name: 1, email: 1 }
    );
    // console.log(users);
    return res.json(200, {
      success: true,
      data: {
        users,
      },
    });
  } catch (error) {
    console.log('Error', err);
    return res.status(500).json({
      message: 'Internal Server Error',
    });
  }
};
