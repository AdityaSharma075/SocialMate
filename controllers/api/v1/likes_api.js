const Users = require('../../../models/user');
const Like = require('../../../models/like');
const Post = require('../../../models/post');
const Comment = require('../../../models/comment');

module.exports.like = async function (req, res) {
  let likeable;
  let deleted = false;
  try {
    if (req.query.likeable_type == 'Post') {
      likeable = await Post.findById(req.query.likeable_id).populate('likes');
    } else {
      likeable = await Comment.findById(req.query.likeable_id).populate(
        'likes'
      );
    }
    let exist = await Like.findOne({
      user: req.user._id,
      likeable: req.query.likeable_id,
      onModel: req.query.likeable_type,
    });

    if (exist) {
      likeable.likes.pull(exist._id);
      likeable.save();
      exist.remove();
      deleted = true;
    } else {
      console.log('req ', req);
      let newLike = await Like.create({
        user: req.user._id,
        onModel: req.query.likeable_type,
        likeable: req.query.likeable_id,
      });
      likeable.likes.push(newLike._id);
      likeable.save();
    }
    return res.json('200', {
      message: 'Request Succesfull',
      success: true,
      data: {
        deleted: deleted,
      },
    });
  } catch (error) {
    console.log(error);
    return res.status(500).json({
      message: 'Internal Server Error',
    });
  }
};

module.exports.list = async function (req, res) {
  let likeable;

  try {
    if (req.query.likeable_type == 'Post') {
      likeable = await Post.findById(req.query.likeable_id).populate('likes');
    } else {
      likeable = await Comment.findById(req.query.likeable_id).populate(
        'likes'
      );
    }
    return res.json(200, {
      message: `List of likes on ${req.query.likeable_id} :: Post`,
      success: true,
      data: likeable.likes,
    });
  } catch (error) {
    console.log(error);
    return res.status(500).json({
      message: 'Internal Server Error',
    });
  }
};
