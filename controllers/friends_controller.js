const Users = require('../models/user');
const Friendships = require('../models/friendships');

module.exports.addFriend = async function (req, res) {
  try {
    let existingFriendship = await Friendships.findOne({
      from_user: req.user,
      to_user: req.query.id,
    });

    let fromUser = await Users.findById(req.user);
    let toUser = await Users.findById(req.query.id);

    let deleted = false;

    if (existingFriendship) {
      toUser.friends.pull(existingFriendship._id);
      fromUser.friends.pull(existingFriendship._id);
      toUser.save();
      fromUser.save();
      existingFriendship.remove();
      deleted = true;
      removeFriend = true;
    } else {
      let friendship = await Friendships.create({
        to_user: req.query.id,
        from_user: req.user._id,
      });

      toUser.friends.push(friendship);
      fromUser.friends.push(friendship);
      toUser.save();
      fromUser.save();
    }

    if (req.xhr) {
      return res.status(200).json({
        deleted: deleted,
        message: 'req Successful',
      });
    }

    //   console.log(populated_user);
    return res.redirect('back');
  } catch (error) {
    console.log(error);
    return;
  }
};
