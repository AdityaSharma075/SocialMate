const Users = require('../../../models/user');
const Friendships = require('../../../models/friendships');

module.exports.addFriend = async function (req, res) {
  try {
    // console.log('Rquest ', req.);
    let existingFriendship = await Friendships.findOne({
      from_user: req.user,
      to_user: req.query.user_id,
    });

    let fromUser = await Users.findById(req.user);
    let toUser = await Users.findById(req.query.user_id);

    // let deleted = false;

    if (existingFriendship) {
      return res.json(200, {
        message: `You are already Friend with${toUser.name}`,
        success: true,
      });
    } else {
      let friendship = await Friendships.create({
        to_user: req.query.user_id,
        from_user: req.user._id,
      });

      //   friendship.populate('user', '_id , email , name');
      //   await friendship.populate('to_user', '_id , email , name');

      toUser.friends.push(friendship);
      fromUser.friends.push(friendship);
      toUser.save();
      fromUser.save();

      return res.json(200, {
        message: `Now you are Friend with${toUser.name}`,
        success: true,
        data: {
          friendship: {
            from_user: {
              _id: fromUser._id,
              email: fromUser.email,
              name: fromUser.name,
            },
            to_user: {
              _id: toUser._id,
              email: toUser.email,
              name: toUser.name,
            },
          },
        },
      });
    }
  } catch (error) {
    console.log(error);
    return res.json(500, {
      message: 'Internal Server Error',
    });
  }
};
module.exports.fetchFriend = async function (req, res) {
  try {
    let user = await Users.findById(req.user._id).populate({
      path: 'friends',
      populate: { path: 'to_user', select: 'name , email' },
    });

    return res.status(200).json({
      message: `List of friends for user id ${user._id} `,
      success: true,
      data: {
        friends: user.friends,
      },
    });
  } catch (error) {
    console.log(error);
    return res.status(500).json({
      message: 'Internal Server Error',
    });
  }
};
module.exports.removeFriend = async function (req, res) {
  try {
    let existingFriendship = await Friendships.findOne({
      from_user: req.user,
      to_user: req.query.user_id,
    });
    let fromUser = await Users.findById(req.user);
    let toUser = await Users.findById(req.query.user_id);
    if (existingFriendship) {
      toUser.friends.pull(existingFriendship._id);
      fromUser.friends.pull(existingFriendship._id);
      toUser.save();
      fromUser.save();
      existingFriendship.remove();
      return res.status(200).json({
        message: 'Friendship Removed',
        success: true,
      });
    } else {
      return res.status(422).json({
        message: 'You are Not Friend',
      });
    }
  } catch (error) {
    console.log(error);
    return res.status(200).json({
      message: 'Internal Server Error',
    });
  }
};
