const User = require('../models/user');
const passport = require('passport');
const fs = require('fs');
const path = require('path');

module.exports.profile = async function (req, res) {
  try {
    let user = await User.findById(req.params.id);
    let populated_user = await User.findById(req.user).populate('friends');
    return res.render('user_profile', {
      title: 'User | Profile',
      profile_user: user,
      populated_user,
    });
  } catch (error) {
    console.log('Error', error);
    return;
  }
};
module.exports.update = async function (req, res) {
  // if (req.user.id == req.params.id) {
  //   User.findByIdAndUpdate(req.params.id, req.body, function (err, user) {
  //     return res.redirect('back');
  //   });
  // } else {
  //   return res.status(401).send('Unautharized');
  // }
  if (req.user.id == req.params.id) {
    let user = await User.findById(req.params.id);

    User.uploadedAvatar(req, res, function (err) {
      if (err) {
        console.log('***** Multer Error ******');
      }

      user.name = req.body.name;
      user.email = req.body.email;
      if (req.file) {
        if (user.avatar) {
          if (fs.existsSync(path.join(__dirname, '..', user.avatar))) {
            fs.unlinkSync(path.join(__dirname, '..', user.avatar));
          }
        }
        user.avatar = User.avatarPath + '/' + req.file.filename;
      }
      user.save();
      return res.redirect('back');
    });
  } else {
    return res.status(401).send('Unautharized');
  }
};
module.exports.signUp = function (req, res) {
  if (req.isAuthenticated()) {
    return res.redirect('/user/profile');
  }
  return res.render('user_sign_up', {
    title: 'User | SignUp',
  });
};
module.exports.signIn = function (req, res) {
  if (req.isAuthenticated()) {
    return res.redirect('/user/profile');
  }
  return res.render('user_sign_in', {
    title: 'User | SignIn',
  });
};
module.exports.create = function (req, res) {
  if (req.body.password != req.body.confirm_password) {
    return res.redirect('back');
  }
  User.findOne({ email: req.body.email }, function (err, user) {
    if (err) {
      console.log('Eroor in finding in the DataBase');
    }

    if (!user) {
      User.create(req.body, function (err) {
        if (err) {
          console.log('Eroor in Creting Data in DataBase');
        }

        return res.redirect('/user/sign-in');
      });
    } else {
      return res.redirect('back');
    }
  });
};
// sign in and create a session for the user
module.exports.createSession = function (req, res) {
  return res.redirect('/');
};

module.exports.destroySession = function (req, res) {
  req.logout();

  return res.redirect('/');
};
